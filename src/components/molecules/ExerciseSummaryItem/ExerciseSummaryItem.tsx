'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle
} from '@/components/ui/item';
import { TrashIcon } from '@phosphor-icons/react';
import { getCloudinaryThumbnail, getInitials } from '@/utils';
import { cn } from '@/lib/utils';

interface ExerciseSummaryItemProps {
	exerciseId: string;
	title: string;
	video: string;
	description: ReactNode;
	onRemove?: () => void;
	className?: string;
}

export const ExerciseSummaryItem = ({
	exerciseId,
	title,
	video,
	description,
	onRemove,
	className
}: ExerciseSummaryItemProps) => {
	const thumbnail = getCloudinaryThumbnail(video);

	return (
		<Item className={cn('p-0', className)}>
			<Avatar className="size-12">
				<AvatarImage src={thumbnail} alt={title} />
				<AvatarFallback>{getInitials(title)}</AvatarFallback>
			</Avatar>
			<ItemContent className="flex-row justify-between">
				<div className="min-w-0">
					<Link href={`/exercise/${exerciseId}`} className="w-fit" passHref>
						<ItemTitle className="text-xs hover:text-secondary">
							{title}
						</ItemTitle>
					</Link>
					<ItemDescription className="text-xs text-foreground/50">
						{description}
					</ItemDescription>
				</div>
				{onRemove && (
					<Button variant="destructive" size="icon-sm" onClick={onRemove}>
						<TrashIcon />
					</Button>
				)}
			</ItemContent>
		</Item>
	);
};
