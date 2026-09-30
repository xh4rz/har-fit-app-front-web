'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	RoutineFormInput,
	RoutineFormOutput,
	workoutFormSchema
} from '@/modules/routine/validation/routineFormSchema';
import { useWorkoutStore } from '@/modules/workout/store/useWorkoutStore';
import {
	ExerciseRoutineItem,
	FormInput,
	FormTextarea
} from '@/components/molecules';
import { Button, buttonVariants } from '@/components/ui/button';
import { DeleteAlertDialog } from '../DeleteAlertDialog';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
	ArrowLeftIcon,
	FloppyDiskIcon,
	TrashIcon
} from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { ApiError, RoutineResponse } from '@/infrastructure/interfaces';
import { useTimer } from '@/hooks';
import { postWorkout } from '@/modules/workout/services';

interface WorkoutFormProps {
	mode: 'create' | 'edit';
	routine: RoutineResponse;
}

export const WorkoutForm = ({ mode, routine }: WorkoutFormProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [showModalDeleteWorkout, setShowModalDeleteWorkout] = useState(false);
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
		onSuccess: async () => {
			// await queryClient.invalidateQueries({
			// 	queryKey: ['routines']
			// });
			// const routineId = routine?.id;
			// if (routineId) {
			// 	await queryClient.invalidateQueries({
			// 		queryKey: ['routine', routine.id]
			// 	});
			// }

			finishWorkout();
			router.replace('/routine');
			if (mode === 'create') {
				toast.success('Workout successfully created.');
			} else {
				toast.success('Workout successfully updated.');
			}
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

			<div className="flex flex-row gap-4">
				<div className="flex w-26 flex-col gap-1">
					<span className="text-xs text-muted-foreground">Duration</span>
					<span className="text-sm text-secondary tabular-nums">
						{formattedTime}
					</span>
				</div>
				<div className="flex w-20 flex-col gap-1">
					<span className="text-xs text-muted-foreground">Volume</span>
					<span className="text-sm text-secondary">{workoutVolume} kg</span>
				</div>
				<div className="flex w-24 flex-col gap-1 justify-center">
					<span className="text-xs text-muted-foreground">Sets</span>
					<span className="text-xs text-secondary">{workoutSets}</span>
				</div>
			</div>

			{errors.root && (
				<span className="text-destructive">{errors.root.message}</span>
			)}

			<Separator />

			{/* <span className="text-primary">{routine?.title}</span> */}

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
		</div>
	);
};
