'use client';

import { Control, FieldErrors } from 'react-hook-form';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';
import { ExerciseSummaryItem } from '../ExerciseSummaryItem';
import { ExerciseRoutineSets } from '../ExerciseRoutineSets';
import { RoutineExercise } from '@/types';

interface ExerciseItemProps {
	exercise: RoutineExercise;
	index: number;
	control: Control<RoutineFormInput>;
	errors: FieldErrors<RoutineFormInput>;
	isWorkout?: boolean;
	onRemove?: () => void;
}

export const ExerciseRoutineItem = ({
	exercise,
	index,
	control,
	errors,
	isWorkout = false,
	onRemove
}: ExerciseItemProps) => {
	return (
		<div className="w-full">
			<ExerciseSummaryItem
				exerciseId={exercise.id}
				title={exercise.title ?? ''}
				video={exercise.video}
				description={exercise.primaryMuscleName}
				onRemove={!isWorkout ? onRemove : undefined}
				className="mb-2"
			/>
			<ExerciseRoutineSets
				control={control}
				exerciseIndex={index}
				error={errors.exercises}
				isWorkout={isWorkout}
			/>
		</div>
	);
};
