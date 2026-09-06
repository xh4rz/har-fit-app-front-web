'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
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

interface RoutineFormProps {
	mode: 'create' | 'edit';
	routine?: RoutineResponse;
}

export const RoutineForm = ({ mode, routine }: RoutineFormProps) => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const selectedExercises = useRoutineStore((state) => state.selectedExercises);

	const hasSelectedExercises = useRoutineStore(
		(state) => state.hasSelectedExercises
	);

	const clearRoutine = useRoutineStore((state) => state.clearRoutine);

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

	const { fields, replace } = useFieldArray({
		control,
		name: 'exercises'
	});

	const exercisesError =
		errors.exercises?.message || errors.exercises?.root?.message;

	const { mutate: saveRoutine, isPending: loading } = useMutation({
		mutationFn: async (data: RoutineFormOutput) => {
			if (mode === 'create') {
				return postRoutine(data);
			}
			const routineId = routine?.id;
			if (routineId) {
				return patchRoutineById(routineId, data);
			}
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
			if (mode === 'create') {
				toast.success('Routine successfully created.');
			} else {
				toast.success('Routine successfully updated.');
			}
		},
		onError: (error: ApiError) => {
			const errorObj = error;
			setFormError(setError, errorObj);
		}
	});

	const onSaveRoutine = (data: RoutineFormOutput) => {
		saveRoutine(data);
	};

	useEffect(() => {
		if (selectedExercises.length === 0) {
			replace([]);
			clearErrors('exercises');
			return;
		}

		const currentExercises = getValues('exercises');

		const formExercises = selectedExercises.map((exercise) => {
			const existing = currentExercises.find(
				(f) => f.exerciseId === exercise.id
			);

			return {
				exerciseId: exercise.id,
				sets: existing?.sets || []
			};
		});

		replace(formExercises);
	}, [selectedExercises]);

	useEffect(() => {
		if (mode !== 'edit' || !routine) return;

		const routineExercises = routine.exercises.map((ex) => ({
			id: ex.exerciseId,
			title: ex.title,
			video: ex.video,
			primaryMuscleName: ex.primaryMuscleName
		}));

		if (selectedExercises.length === 0) {
			useRoutineStore.getState().setSelectedExercises(routineExercises);
		}
	}, []);

	useEffect(() => {
		if (mode === 'edit' && routine) {
			reset({
				title: routine.title,
				exercises: routine.exercises.map((ex) => ({
					exerciseId: ex.exerciseId,
					sets: ex.sets
				}))
			});
		}
	}, [routine]);

	useEffect(() => {
		return () => {
			clearRoutine();
		};
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 items-center">
				<Link
					href="/routine"
					className={buttonVariants({ variant: 'outline', size: 'icon-lg' })}
				>
					<ArrowLeftIcon />
				</Link>
				<h2 className="text-2xl font-semibold flex-1">
					{mode === 'create' ? 'Create' : 'Edit'} Routine
				</h2>
				<Button
					size="lg"
					loading={loading}
					variant="secondary"
					iconLeft={<FloppyDiskIcon />}
					onClick={handleSubmit(onSaveRoutine)}
				>
					{mode === 'create' ? 'Save' : 'Update'} Routine
				</Button>
			</div>

			<FormInput
				required
				disabled={loading}
				control={control}
				name="title"
				label="Title Routine"
				placeholder="Enter Title routine"
				type="text"
				autoComplete="off"
			/>

			{!hasSelectedExercises() ? (
				<Card className="min-h-96 h-96 rounded-lg p-4 flex justify-center items-center text-center gap-2">
					<>
						<BarbellIcon size={48} className="text-muted-foreground mb-4" />
						<h5 className="text-lg font-medium">No Exercises</h5>
						<span className="text-muted-foreground">
							So far, you haven&rsquo;t added any exercises to this routine.
						</span>
					</>
				</Card>
			) : (
				fields.map((field, index) => {
					const exercise = selectedExercises.find(
						(ex) => ex.id === field.exerciseId
					);

					if (!exercise) return null;

					return (
						<Card
							key={field.id}
							className=" rounded-lg p-4 flex justify-center items-center text-center gap-2"
						>
							<ExerciseRoutineItem
								exercise={exercise}
								index={index}
								control={control}
								errors={errors}
							/>
						</Card>
					);
				})
			)}

			{exercisesError && (
				<span className="text-destructive">{exercisesError}</span>
			)}

			{errors.root && (
				<span className="text-destructive">{errors.root.message}</span>
			)}
		</div>
	);
};
