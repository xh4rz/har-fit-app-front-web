'use client';

import { Control, FieldErrors } from 'react-hook-form';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';
import { RoutineExercise } from '@/modules/routine/types/exerciseRoutine';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle
} from '@/components/ui/item';
import { ExerciseRoutineInputSets } from '../ExerciseRoutineInputSets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCloudinaryThumbnail } from '@/utils';

type ExerciseItemProps = {
	exercise: RoutineExercise;
	index: number;
	control: Control<RoutineFormInput>;
	errors: FieldErrors<RoutineFormInput>;
};

export const ExerciseRoutineItem = ({
	exercise,
	index,
	control,
	errors
}: ExerciseItemProps) => {
	const thumbnail = getCloudinaryThumbnail(exercise.video);

	return (
		<div className=" w-full gap-2">
			<Item>
				<ItemMedia>
					<Avatar className="size-14">
						<AvatarImage src={thumbnail} alt="image url" />
						<AvatarFallback>EX</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent className="gap-0">
					<ItemTitle className="text-xs">{exercise.title}</ItemTitle>
					<ItemDescription className="text-xs text-foreground/50">
						{exercise.primaryMuscleName}
					</ItemDescription>
				</ItemContent>
			</Item>
			<ExerciseRoutineInputSets
				control={control}
				exerciseIndex={index}
				error={errors.exercises}
			/>
		</div>
	);
};
