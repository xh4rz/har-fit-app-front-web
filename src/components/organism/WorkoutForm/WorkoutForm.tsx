'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTimer } from '@/hooks';
import {
	RoutineFormInput,
	RoutineFormOutput,
	workoutFormSchema
} from '@/modules/routine/validation/routineFormSchema';
import { useWorkoutStore } from '@/modules/workout/store/useWorkoutStore';
import { postWorkout } from '@/modules/workout/services';
import { SuccessConfetti } from '@/components/atoms';
import {
	ExerciseRoutineItem,
	FormInput,
	FormTextarea,
	WorkoutStats
} from '@/components/molecules';
import { AlertDialog } from '@/components/organism';
import { Button, buttonVariants } from '@/components/ui/button';
import { DeleteAlertDialog } from '../DeleteAlertDialog';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { formatDuration, setFormError } from '@/utils';
import {
	ArrowLeftIcon,
	FloppyDiskIcon,
	TrashIcon
} from '@phosphor-icons/react';
import {
	ApiError,
	RoutineResponse,
	WorkoutResponse
} from '@/infrastructure/interfaces';

interface WorkoutFormProps {
	mode: 'create' | 'edit';
	routine: RoutineResponse;
}

export const WorkoutForm = ({ mode, routine }: WorkoutFormProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [showModalDeleteWorkout, setShowModalDeleteWorkout] = useState(false);
	const [showModalSuccessWorkout, setShowModalSuccessWorkout] = useState(false);
	const [savedWorkout, setSavedWorkout] = useState<WorkoutResponse | null>(
		null
	);
	const workout = useWorkoutStore((state) => state.workout);
	const startedAt = useWorkoutStore((state) => state.startedAt);
	const setWorkout = useWorkoutStore((state) => state.setWorkout);
	const startWorkout = useWorkoutStore((state) => state.startWorkout);
	const finishWorkout = useWorkoutStore((state) => state.finishWorkout);
	const { formattedTime, elapsedSeconds } = useTimer(startedAt);
	const routineId = routine.id;

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		reset,
		formState: { isDirty, errors }
	} = useForm<RoutineFormInput, FieldValues, RoutineFormOutput>({
		resolver: zodResolver(workoutFormSchema),
		mode: 'onSubmit',
		defaultValues: {
			title: '',
			description: '',
			exercises: []
		}
	});

	const formExercises = useWatch({
		control,
		name: 'exercises'
	});

	const { fields } = useFieldArray({
		control,
		name: 'exercises'
	});

	const workoutVolume = (formExercises ?? []).reduce(
		(total, exercise) =>
			total +
			(exercise.sets ?? []).reduce(
				(exerciseTotal, set) =>
					set.completed
						? exerciseTotal + Number(set.kg) * Number(set.reps)
						: exerciseTotal,
				0
			),
		0
	);

	const workoutSets = formExercises?.reduce(
		(total, exercise) =>
			total + (exercise.sets ?? []).filter((set) => set.completed).length,
		0
	);

	const onSaveWorkout = (data: RoutineFormOutput) => {
		if (workoutSets === 0) {
			setError('root', {
				message: 'Check at least one set.'
			});
			return;
		}
		clearErrors('root');
		saveWorkout(data);
	};

	const onDeleteWorkout = () => {
		finishWorkout();
		toast.error('Workout successfully removed.');
		router.replace('/routine');
	};

	const { mutate: saveWorkout, isPending: loading } = useMutation({
		mutationFn: async (data: RoutineFormOutput) => {
			const dataWorkout = {
				...data,
				duration: elapsedSeconds,
				createdAt: new Date()
			};
			if (mode === 'create') {
				return postWorkout(dataWorkout);
			}
			// const routineId = routine?.id;
			// if (routineId) {
			// 	return patchRoutineById(routineId, data);
			// }
		},
		onSuccess: async (workout) => {
			// await queryClient.invalidateQueries({
			// 	queryKey: ['routines']
			// });
			// const routineId = routine?.id;
			// if (routineId) {
			// 	await queryClient.invalidateQueries({
			// 		queryKey: ['routine', routine.id]
			// 	});
			// }
			if (!workout) return;
			await queryClient.invalidateQueries({ queryKey: ['workouts'] });
			finishWorkout();
			setSavedWorkout(workout);
			setShowModalSuccessWorkout(true);
		},
		onError: (error: ApiError) => {
			const errorObj = error;
			setFormError(setError, errorObj);
		}
	});

	useEffect(() => {
		if (!routine) return;

		if (workout) {
			reset(workout);
			return;
		}

		const initialWorkout: RoutineFormInput = {
			title: routine.title,
			exercises: routine.exercises.map((ex) => ({
				exerciseId: ex.exerciseId,
				restTimer: ex.restTimer,
				sets: ex.sets.map((set) => ({
					...set,
					completed: set.completed ?? false
				}))
			}))
		};

		setWorkout(routineId, initialWorkout);
		reset(initialWorkout);
		startWorkout();
	}, [routine]);

	useEffect(() => {
		if (!isDirty) return;

		setWorkout(routineId, {
			...workout,
			exercises: formExercises ?? []
		} as RoutineFormInput);
	}, [formExercises]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Link
					href="/routine"
					className={buttonVariants({ variant: 'outline', size: 'icon-lg' })}
				>
					<ArrowLeftIcon />
				</Link>

				<h2 className="text-2xl font-semibold">Workout</h2>

				<div className="ml-auto flex items-center gap-2">
					<Button
						size="icon-lg"
						variant="destructive"
						onClick={() => setShowModalDeleteWorkout(true)}
					>
						<TrashIcon />
					</Button>

					<Button
						size="lg"
						loading={loading}
						variant="secondary"
						iconRight={<FloppyDiskIcon />}
						onClick={handleSubmit(onSaveWorkout)}
					>
						Save Workout
					</Button>
				</div>
			</div>

			<WorkoutStats
				duration={formattedTime}
				volume={workoutVolume}
				sets={workoutSets}
			/>

			{errors.root && (
				<span className="text-destructive">{errors.root.message}</span>
			)}

			<Separator />

			<FormInput
				required
				disabled={loading}
				control={control}
				name="title"
				label="Title Workout"
				placeholder="Enter Title Workout"
				type="text"
				autoComplete="off"
			/>

			<FormTextarea
				disabled={loading}
				control={control}
				name="description"
				label="Description"
				placeholder="How did your workout go? Leave some notes here..."
				className="resize-none min-h-20"
			/>

			{fields.map((field, index) => {
				const exercise = routine?.exercises.find(
					(ex) => ex.exerciseId === field.exerciseId
				);

				if (!exercise) return null;

				return (
					<Card
						key={field.id}
						className="rounded-lg p-4 flex justify-center items-center text-center gap-2"
					>
						<ExerciseRoutineItem
							exercise={{
								...exercise,
								id: exercise.exerciseId
							}}
							index={index}
							control={control}
							errors={errors}
							isWorkout={true}
						/>
					</Card>
				);
			})}

			<DeleteAlertDialog
				title={`Discard '${routine.title}' Workout`}
				description="Are you sure you want to discard this workout?"
				deleteText="Discard"
				open={showModalDeleteWorkout}
				loading={false}
				onOpenChange={setShowModalDeleteWorkout}
				onDelete={onDeleteWorkout}
			/>

			<AlertDialog
				open={showModalSuccessWorkout}
				onOpenChange={setShowModalSuccessWorkout}
				title="Workout saved"
				description="Great work. Here's your workout summary."
				acceptText="Done"
				showCancel={false}
				onAccept={() => router.replace('/profile')}
			>
				{savedWorkout && (
					<div className="space-y-4">
						<div className="flex flex-col gap-1">
							<span className="text-lg tracking-tight">
								{savedWorkout.title}
							</span>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex flex-col gap-1 rounded-xl border border-border p-4">
								<span className="text-xs text-muted-foreground">Duration</span>
								<span className="text-xl font-bold tabular-nums text-primary">
									{formatDuration(savedWorkout.duration)}
								</span>
							</div>

							<div className="flex flex-col gap-1 rounded-xl border border-border p-4">
								<span className="text-xs text-muted-foreground">Volume</span>
								<span className="text-xl font-bold tabular-nums text-primary">
									{savedWorkout.volume} kg
								</span>
							</div>
							<div className="flex flex-col gap-1 rounded-xl border border-border p-4">
								<span className="text-xs text-muted-foreground">Exercises</span>
								<span className="text-xl font-bold tabular-nums text-primary">
									{savedWorkout.exercises.length}
								</span>
							</div>
							<div className="flex flex-col gap-1 rounded-xl border border-border p-4">
								<span className="text-xs text-muted-foreground">Sets</span>
								<span className="text-xl font-bold tabular-nums text-primary">
									{savedWorkout.sets}
								</span>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-xs text-muted-foreground">Exercises</span>
							<ul className="list-inside list-disc space-y-1 text-sm">
								{savedWorkout.exercises.map((exercise, index) => (
									<li key={`${exercise.exerciseId}-${index}`}>
										{exercise.title}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</AlertDialog>

			{showModalSuccessWorkout && savedWorkout && <SuccessConfetti />}
		</div>
	);
};
