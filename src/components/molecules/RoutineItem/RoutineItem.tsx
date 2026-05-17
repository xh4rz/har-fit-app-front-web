'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ActionsDropdown } from '../ActionsDropdown';

interface RoutineItemProps {
	routine: {
		id: string;
		title: string;
		exercises: {
			title: string;
		}[];
	};
	onEdit: () => void;
	onDelete: () => void;
}

export const RoutineItem = ({
	routine,
	onEdit,
	onDelete
}: RoutineItemProps) => {
	return (
		<Card className="rounded-lg bg-accent p-4 h-36">
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-foreground truncate">
						{routine.title}
					</h3>
					<ActionsDropdown onEdit={onEdit} onDelete={onDelete} />
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
