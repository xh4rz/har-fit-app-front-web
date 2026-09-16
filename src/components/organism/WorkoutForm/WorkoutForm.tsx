'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
	RoutineFormInput,
	RoutineFormOutput,
	routineFormSchema
} from '@/modules/routine/validation/routineFormSchema';

import { ExerciseRoutineItem, FormInput } from '@/components/molecules';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ApiError, RoutineResponse } from '@/infrastructure/interfaces';
import { ArrowLeftIcon, FloppyDiskIcon } from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { useWorkoutStore } from '@/modules/workout/store/useWorkoutStore';
import { useTimer } from '@/hooks';
import { Separator } from '@/components/ui/separator';

interface RoutineFormProps {
	routine?: RoutineResponse;
}

export const WorkoutForm = ({ routine }: RoutineFormProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const workout = useWorkoutStore((state) => state.workout);
	const startedAt = useWorkoutStore((state) => state.startedAt);
	const setWorkout = useWorkoutStore((state) => state.setWorkout);
	const startWorkout = useWorkoutStore((state) => state.startWorkout);
	const finishWorkout = useWorkoutStore((state) => state.finishWorkout);

	const timer = useTimer(startedAt);

	const {
		control,
		handleSubmit,
		getValues,
		setError,
		clearErrors,
		reset,
		formState: { isDirty, errors }
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

		setWorkout(initialWorkout);
		reset(initialWorkout);
		startWorkout();
	}, [routine]);

	useEffect(() => {
		if (isDirty) {
			setWorkout(formValues as RoutineFormInput);
		}
	}, [formValues]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 items-center">
				<Link
					href="/routine"
					className={buttonVariants({ variant: 'outline', size: 'icon-lg' })}
				>
					<ArrowLeftIcon />
				</Link>

				<h2 className="text-2xl font-semibold flex-1">Workout</h2>

				{/* <Button onClick={() => finishWorkout()}>Limpiar</Button> */}
				<Button
					size="lg"
					loading={loading}
					variant="secondary"
					iconLeft={<FloppyDiskIcon />}
					onClick={handleSubmit(onSaveWorkout)}
				>
					Finish Workout
				</Button>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-sm">Duration</span>
				<span className="text-sm text-secondary flex-1 ">{timer}</span>
			</div>

			<Separator />

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
