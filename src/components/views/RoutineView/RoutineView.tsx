'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRoutineById, getRoutines } from '@/modules/routine/services';
import { Card } from '@/components/ui/card';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemMedia,
	ItemTitle
} from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { RoutineItem } from '@/components/molecules';
import {
	BarbellIcon,
	CaretRightIcon,
	FilePlusIcon
} from '@phosphor-icons/react';
import { DeleteAlertDialog } from '@/components/organism';

export const RoutineView = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const [selectedRoutineId, setSelectedRoutineId] = useState<string>('');

	const [selectedRoutineTitle, setSelectedRoutineTitle] = useState<string>('');

	const [showModalDeleteRoutine, setShowModalDeleteRoutine] = useState(false);

	const { data: dataRoutines, isPending: isPendingRoutines } = useQuery({
		queryKey: ['routines'],
		queryFn: () => getRoutines()
	});

	const handleEditRoutine = (id: string) => {
		router.push(`/routine/edit/${id}`);
	};

	const handleDeleteRoutine = (id: string, title: string) => {
		setSelectedRoutineId(id);
		setSelectedRoutineTitle(title);
		setShowModalDeleteRoutine(true);
	};

	const { mutate: deleteExercise, isPending: isPendingDeleteRoutine } =
		useMutation({
			mutationFn: () => deleteRoutineById(selectedRoutineId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ['routines']
				});
				setShowModalDeleteRoutine(false);
			}
		});

	if (isPendingRoutines) {
		return (
			<div className="flex flex-col gap-4 items-center">
				<div className="w-full max-w-5xl space-y-4">
					<div className="flex flex-col lg:flex-row gap-4">
						<Card className="lg:flex-2 min-h-96 rounded-lg p-4">
							<Skeleton className="h-full w-full" />
						</Card>
						<Card className="lg:flex-1 h-20 rounded-lg p-4">
							<Skeleton className="h-full w-full" />
						</Card>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col lg:flex-row gap-4">
			<Card
				className="lg:flex-2 min-h-96 rounded-lg p-4 flex flex-col justify-center 
					items-center text-center gap-2"
			>
				{dataRoutines ? (
					<div className="w-full space-y-4">
						<div className="flex items-center justify-between text-muted-foreground">
							<h3 className="text-sm font-bold">My Routines</h3>
							<span className="text-sm ">{dataRoutines?.length}</span>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch">
							{dataRoutines.map((routine) => (
								<RoutineItem
									key={routine.id}
									routine={routine}
									onEdit={() => handleEditRoutine(routine.id)}
									onDelete={() =>
										handleDeleteRoutine(routine.id, routine.title)
									}
								/>
							))}
						</div>
					</div>
				) : (
					<>
						<BarbellIcon size={48} className="text-muted-foreground mb-4" />
						<h5 className="text-lg font-medium">Get started</h5>
						<span className="text-muted-foreground">
							Start by creating a routine!
						</span>
					</>
				)}
			</Card>
			<Card className="lg:flex-1 h-20 rounded-lg p-4 flex justify-center items-center text-center gap-2">
				<Item size="sm" asChild>
					<Link href={`/routine/create`}>
						<ItemMedia className="text-secondary">
							<FilePlusIcon className="size-6" />
						</ItemMedia>
						<ItemContent>
							<ItemTitle className="text-secondary">New Routine</ItemTitle>
						</ItemContent>
						<ItemActions className="text-secondary">
							<CaretRightIcon className="size-6" />
						</ItemActions>
					</Link>
				</Item>
			</Card>

			<DeleteAlertDialog
				title={`Delete '${selectedRoutineTitle}' Routine`}
				description="Are you sure you want to delete this routine?"
				open={showModalDeleteRoutine}
				loading={isPendingDeleteRoutine}
				onOpenChange={setShowModalDeleteRoutine}
				onDelete={deleteExercise}
			/>
		</div>
	);
};
