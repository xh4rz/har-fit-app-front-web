import Link from 'next/link';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle
} from '@/components/ui/item';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckIcon, PlusIcon } from '@phosphor-icons/react/ssr';
import { getCloudinaryThumbnail, getInitials } from '@/utils';
import { cn } from '@/lib/utils';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseItemProps = {
	exercise: Exercise;
	onSelectExercise: () => void;
	isSelected?: boolean;
	mode?: 'view' | 'select';
};

export const ExerciseItem = ({
	exercise,
	onSelectExercise,
	isSelected = false,
	mode = 'view'
}: ExerciseItemProps) => {
	const thumbnail = getCloudinaryThumbnail(exercise.video);

	const Content = (
		<>
			<ItemMedia>
				<Avatar className="size-12">
					<AvatarImage src={thumbnail} alt="image url" />
					<AvatarFallback>{getInitials(exercise.title)}</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent className="gap-0">
				<ItemTitle className="text-xs">{exercise.title}</ItemTitle>
				<ItemDescription className="text-xs text-foreground/50">
					{exercise.primaryMuscle.name}
				</ItemDescription>
			</ItemContent>

			{mode === 'select' && (
				<Button variant="secondary" size="icon-sm">
					{isSelected ? <CheckIcon /> : <PlusIcon />}
				</Button>
			)}
		</>
	);

	if (mode === 'view') {
		return (
			<Item className="p-2" asChild>
				<Link href={`/exercise/${exercise.id}`}>{Content}</Link>
			</Item>
		);
	}

	return (
		<Item
			onClick={onSelectExercise}
			className={cn(
				'p-2 cursor-pointer transition hover:bg-muted',
				isSelected && 'bg-primary/10 border border-primary hover:bg-primary/20'
			)}
		>
			{Content}
		</Item>
	);
};
