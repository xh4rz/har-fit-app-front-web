'use client';

import { Control, FieldErrors } from 'react-hook-form';
import Link from 'next/link';
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
import { TrashIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

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
				<ItemContent className="flex flex-row justify-between">
					<div>
						<Link href={`/exercise/${exercise.id}`} className="w-fit" passHref>
							<ItemTitle className="text-xs hover:text-secondary">
								{exercise.title}
							</ItemTitle>
						</Link>
						<ItemDescription className="text-xs text-foreground/50">
							{exercise.primaryMuscleName}
						</ItemDescription>
					</div>
					{!isWorkout && (
						<Button variant="destructive" size="icon-sm" onClick={onRemove}>
							<TrashIcon />
						</Button>
					)}
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
