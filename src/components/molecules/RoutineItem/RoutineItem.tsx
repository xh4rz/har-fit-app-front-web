'use client';

import { DotsThreeIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RoutineItemProps {
	routine: {
		id: string;
		title: string;
		exercises: {
			title: string;
		}[];
	};
	onOpenOptions: (id: string) => void;
}

export const RoutineItem = ({ routine, onOpenOptions }: RoutineItemProps) => {
	return (
		<Card className="rounded-lg bg-accent p-4 h-36">
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-foreground truncate">
						{routine.title}
					</h3>
					<Button
						onClick={() => onOpenOptions(routine.id)}
						size="icon-xs"
						variant="outline"
					>
						<DotsThreeIcon className="size-6 text-primary" />
					</Button>
				</div>
				<p className="text-sm text-muted-foreground text-start mb-4 line-clamp-2">
					{routine.exercises.map((e) => e.title).join(', ')}
				</p>
				<Button variant="secondary" size="sm" className="mt-auto">
					Start Routine
				</Button>
			</div>
		</Card>
	);
};
