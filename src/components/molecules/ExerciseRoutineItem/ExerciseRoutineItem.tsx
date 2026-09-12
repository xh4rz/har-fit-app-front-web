'use client';

import { Control, FieldErrors } from 'react-hook-form';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';
import { RoutineExercise } from '@/types';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle
} from '@/components/ui/item';
import { ExerciseRoutineSets } from '../ExerciseRoutineSets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCloudinaryThumbnail, getInitials } from '@/utils';

type ExerciseItemProps = {
	exercise: RoutineExercise;
	index: number;
	control: Control<RoutineFormInput>;
	errors: FieldErrors<RoutineFormInput>;
	isWorkout?: boolean;
};

export const ExerciseRoutineItem = ({
	exercise,
	index,
	control,
	errors,
	isWorkout = false
}: ExerciseItemProps) => {
	const thumbnail = getCloudinaryThumbnail(exercise.video);

	return (
		<div className=" w-full gap-2">
			<Item>
				<ItemMedia>
					<Avatar className="size-14">
						<AvatarImage src={thumbnail} alt="image url" />
						<AvatarFallback>{getInitials(exercise.title ?? '')}</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent className="gap-0">
					<ItemTitle className="text-xs">{exercise.title}</ItemTitle>
					<ItemDescription className="text-xs text-foreground/50">
						{exercise.primaryMuscleName}
					</ItemDescription>
				</ItemContent>
			</Item>
			<ExerciseRoutineSets
				control={control}
				exerciseIndex={index}
				error={errors.exercises}
				isWorkout={isWorkout}
			/>
		</div>
	);
};
