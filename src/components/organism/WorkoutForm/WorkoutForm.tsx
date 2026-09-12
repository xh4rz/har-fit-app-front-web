'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';
import {
	RoutineFormInput,
	RoutineFormOutput,
	routineFormSchema
} from '@/modules/routine/validation/routineFormSchema';
import { patchRoutineById, postRoutine } from '@/modules/routine/services';
import { ExerciseRoutineItem, FormInput } from '@/components/molecules';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ApiError, RoutineResponse } from '@/infrastructure/interfaces';
import {
	ArrowLeftIcon,
	BarbellIcon,
	FloppyDiskIcon
} from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { useWorkoutStore } from '@/modules/workout/store/useWorkoutStore';

interface RoutineFormProps {
	routine?: RoutineResponse;
}

export const WorkoutForm = ({ routine }: RoutineFormProps) => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const workout = useWorkoutStore((state) => state.workout);
	const setWorkout = useWorkoutStore((state) => state.setWorkout);
	const finishWorkout = useWorkoutStore((state) => state.finishWorkout);

	const {
		control,
		handleSubmit,
		getValues,
		setError,
		clearErrors,
		reset,
		formState: { errors }
	} = useForm<RoutineFormInput, FieldValues, RoutineFormOutput>({
		resolver: zodResolver(routineFormSchema),
		mode: 'onSubmit',
		defaultValues: {
			title: '',
			exercises: []
		}
	});

	const formValues = useWatch({ control });

	const { fields, replace } = useFieldArray({
		control,
		name: 'exercises'
	});

	const exercisesError =
		errors.exercises?.message || errors.exercises?.root?.message;

	const { mutate: saveWorkout, isPending: loading } = useMutation({
		mutationFn: async (data: RoutineFormOutput) => {
			// if (mode === 'create') {
			// 	return postRoutine(data);
			// }
			// const routineId = routine?.id;
			// if (routineId) {
			// 	return patchRoutineById(routineId, data);
			// }
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['routines']
			});
			const routineId = routine?.id;
			if (routineId) {
				await queryClient.invalidateQueries({
					queryKey: ['routine', routine.id]
				});
			}
			router.replace('/routine');
			// if (mode === 'create') {
			// 	toast.success('Routine successfully created.');
			// } else {
			// 	toast.success('Routine successfully updated.');
			// }
		},
		onError: (error: ApiError) => {
			const errorObj = error;
			setFormError(setError, errorObj);
		}
	});

	const onSaveWorkout = (data: RoutineFormOutput) => {
		console.log(data);
		// saveWorkout(data);
	};

	// useEffect(() => {
	// 	if (selectedExercises.length === 0) {
	// 		replace([]);
	// 		clearErrors('exercises');
	// 		return;
	// 	}

	// 	const currentExercises = getValues('exercises');

	// 	const formExercises = selectedExercises.map((exercise) => {
	// 		const existing = currentExercises.find(
	// 			(f) => f.exerciseId === exercise.id
	// 		);

	// 		return {
	// 			exerciseId: exercise.id,
	// 			sets: existing?.sets || []
	// 		};
	// 	});

	// 	replace(formExercises);
	// }, [selectedExercises]);

	// useEffect(() => {
	// 	if (!routine) return;

	// 	const routineExercises = routine.exercises.map((ex) => ({
	// 		id: ex.exerciseId,
	// 		title: ex.title,
	// 		video: ex.video,
	// 		primaryMuscleName: ex.primaryMuscleName
	// 	}));

	// 	if (selectedExercises.length === 0) {
	// 		setSelectedExercises(routineExercises);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (routine) {
	// 		reset({
	// 			title: routine.title,
	// 			exercises: routine.exercises.map((ex) => ({
	// 				exerciseId: ex.exerciseId,
	// 				sets: ex.sets
	// 			}))
	// 		});
	// 	}
	// }, [routine]);

	// useEffect(() => {
	// 	return () => {
	// 		clearRoutine();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	if (!routine) return;

	// 	if (workout) {
	// 		reset(workout);
	// 		return;
	// 	}

	// 	const initialWorkout: RoutineFormInput = {
	// 		title: routine.title,
	// 		exercises: routine.exercises.map((ex) => ({
	// 			exerciseId: ex.exerciseId,
	// 			sets: ex.sets.map((set) => ({
	// 				...set,
	// 				completed: false
	// 			}))
	// 		}))
	// 	};

	// 	setWorkout(initialWorkout);
	// 	reset(initialWorkout);

	// 	const routineExercises = routine.exercises.map((ex) => ({
	// 		id: ex.exerciseId,
	// 		title: ex.title,
	// 		video: ex.video,
	// 		primaryMuscleName: ex.primaryMuscleName
	// 	}));

	// 	setSelectedExercises(routineExercises);
	// }, [routine]);

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
				sets: ex.sets.map((set) => ({
					...set,
					completed: false
				}))
			}))
		};

		setWorkout(initialWorkout);
		reset(initialWorkout);
	}, [routine]);

	useEffect(() => {
		if (!workout) return;

		setWorkout(formValues as RoutineFormInput);
	}, [formValues]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 items-center">
				<Link
					href="/routine"
					className={
						(buttonVariants({ variant: 'outline', size: 'icon-lg' }), 'flex-1')
					}
				>
					<ArrowLeftIcon />
				</Link>
				{/* <h2 className="text-2xl font-semibold flex-1">Log Workout</h2> */}

				{/* <Button onClick={() => finishWorkout()}>Limpiar</Button> */}
				<Button
					size="lg"
					loading={loading}
					variant="secondary"
					iconLeft={<FloppyDiskIcon />}
					onClick={handleSubmit(onSaveWorkout)}
				>
					Finish Routine
				</Button>
			</div>

			<FormInput
				required
				disabled={true}
				control={control}
				name="title"
				label="Title Routine"
				placeholder="Enter Title routine"
				type="text"
				autoComplete="off"
			/>

			{fields.map((field, index) => {
				const exercise = routine?.exercises.find(
					(ex) => ex.exerciseId === field.exerciseId
				);

				if (!exercise) return null;

				return (
					<Card
						key={field.id}
						className=" rounded-lg p-4 flex justify-center items-center text-center gap-2"
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

			{exercisesError && (
				<span className="text-destructive">{exercisesError}</span>
			)}

			{errors.root && (
				<span className="text-destructive">{errors.root.message}</span>
			)}
		</div>
	);
};
