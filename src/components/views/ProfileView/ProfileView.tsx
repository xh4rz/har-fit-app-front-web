'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { deleteWorkoutById, getWorkouts } from '@/modules/workout/services';
import { DeleteAlertDialog } from '@/components/organism';
import { toast } from 'sonner';
import {
	ActionsDropdown,
	ExerciseSummaryItem,
	UserAvatar,
	WorkoutStats,
	WorkoutUserInfo
} from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { formatDuration } from '@/utils';
import { BarbellIcon, PencilSimpleIcon } from '@phosphor-icons/react';

export const ProfileView = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const user = useAuthStore((state) => state.user);
	const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');
	const [selectedWorkoutTitle, setSelectedWorkoutTitle] = useState<string>('');
	const [showModalDeleteWorkout, setShowModalDeleteWorkout] = useState(false);

	const {
		data: dataWorkouts,
		isPending: isPendingWorkouts,
		isError: isErrorWorkouts
	} = useQuery({
		queryKey: ['workouts'],
		queryFn: () => getWorkouts(),
		enabled: Boolean(user)
	});

	const { mutate: deleteWorkout, isPending: isPendingDeleteWorkout } =
		useMutation({
			mutationFn: () => deleteWorkoutById(selectedWorkoutId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ['workouts']
				});
				setShowModalDeleteWorkout(false);
				toast.error('Workout successfully removed.');
			}
		});

	const handleEditWorkout = (id: string) => {
		router.push(`/workout/edit/${id}`);
	};

	const handleDeleteWorkout = (id: string, title: string) => {
		setSelectedWorkoutId(id);
		setSelectedWorkoutTitle(title);
		setShowModalDeleteWorkout(true);
	};

	if (!user) {
		return (
			<Card className="p-4 min-h-50 rounded-lg">
				<Skeleton className="flex-1" />
			</Card>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<Card className="p-4 rounded-lg">
				<div className="flex flex-col gap-2">
					<UserAvatar
						src={user.imageUrl}
						name={user.fullname}
						className="w-25 h-25"
					/>
					<div className="flex gap-10 items-center">
						<div>
							<h2 className="text-xl font-bold">{user.username}</h2>
							<span className="text-muted-foreground">{user.fullname}</span>
						</div>
						<div>
							<Button
								variant="secondary"
								iconLeft={<PencilSimpleIcon />}
								onClick={() => router.push('/settings/profile')}
							>
								Edit Profile
							</Button>
						</div>
					</div>
				</div>
			</Card>

			{dataWorkouts && dataWorkouts.length > 0 && (
				<div className="md:w-1/2 flex items-center justify-between text-primary font-bold">
					<h3 className="text-sm">Workouts</h3>
					<span className="text-sm">{dataWorkouts.length}</span>
				</div>
			)}

			{isPendingWorkouts ? (
				<div className="grid grid-cols-1 gap-4 items-stretch">
					{Array.from({ length: 4 }).map((_, index) => (
						<Card key={index} className="md:w-1/2 rounded-lg p-4 ">
							<Skeleton className="h-64" />
						</Card>
					))}
				</div>
			) : isErrorWorkouts ? (
				<Card className="flex min-h-78 flex-col items-center justify-center gap-2 rounded-lg p-4 text-center">
					<BarbellIcon size={48} className="mb-4 text-muted-foreground" />
					<h5 className="text-lg font-medium">
						The workouts could not be loaded.
					</h5>
					<span className="text-muted-foreground">Please try again later.</span>
				</Card>
			) : dataWorkouts?.length ? (
				<div className="grid grid-cols-1 gap-4 items-stretch">
					{dataWorkouts.map((workout) => (
						<Card key={workout.id} className=" md:w-1/2 rounded-lg p-4">
							<div className="flex h-full flex-col gap-4">
								<div className="flex justify-between gap-4">
									<WorkoutUserInfo
										imageUrl={user.imageUrl}
										fullname={user.fullname}
										username={user.username}
										createdAt={workout.createdAt}
									/>
									<ActionsDropdown
										onEdit={() => handleEditWorkout(workout.id)}
										onDelete={() =>
											handleDeleteWorkout(workout.id, workout.title)
										}
									/>
								</div>

								<div>
									<h4 className="font-semibold">{workout.title}</h4>
									<p className="text-muted-foreground line-clamp-3 text-xs">
										{workout.description}
									</p>
								</div>

								<WorkoutStats
									duration={formatDuration(workout.duration)}
									volume={workout.volume}
									sets={workout.sets}
								/>

								<Separator />

								<div className="flex flex-col gap-2">
									{workout.exercises.map((exercise) => {
										const completedSets = exercise.sets.filter(
											(set) => set.completed
										).length;
										return (
											<ExerciseSummaryItem
												key={exercise.exerciseId}
												exerciseId={exercise.exerciseId}
												title={exercise.title ?? ''}
												video={exercise.video}
												description={`${exercise.primaryMuscleName} - ${completedSets} ${
													completedSets === 1 ? 'set' : 'sets'
												}`}
											/>
										);
									})}
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				<Card className="flex min-h-78 flex-col items-center justify-center gap-2 rounded-lg p-4 text-center">
					<BarbellIcon size={48} className="mb-4 text-muted-foreground" />
					<h5 className="text-lg font-medium">Get started</h5>
					<span className="text-muted-foreground">
						Complete a workout to see it here!
					</span>
				</Card>
			)}

			<DeleteAlertDialog
				title={`Delete '${selectedWorkoutTitle}' Workout`}
				description="Are you sure you want to delete this workout?"
				open={showModalDeleteWorkout}
				loading={isPendingDeleteWorkout}
				onOpenChange={setShowModalDeleteWorkout}
				onDelete={deleteWorkout}
			/>
		</div>
	);
};
