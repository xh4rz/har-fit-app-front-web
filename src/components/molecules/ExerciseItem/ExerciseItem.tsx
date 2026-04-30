import Link from 'next/link';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle
} from '@/components/ui/item';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCloudinaryThumbnail } from '@/utils';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseItemProps = {
	exercise: Exercise;
	// isSelected?: boolean;
};

export const ExerciseItem = ({
	exercise
	// isSelected = false
}: ExerciseItemProps) => {
	const thumbnail = getCloudinaryThumbnail(exercise.video);

	return (
		<Item className="p-2" asChild>
			<Link href={`/exercise/${exercise.id}`}>
				<ItemMedia>
					<Avatar className="size-11">
						<AvatarImage src={thumbnail} alt="hola" />
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent className="gap-0">
					<ItemTitle className="text-xs">{exercise.title}</ItemTitle>
					<ItemDescription className="text-xs text-foreground/50">
						{exercise.primaryMuscle.name}
					</ItemDescription>
				</ItemContent>
			</Link>
		</Item>
	);
};
