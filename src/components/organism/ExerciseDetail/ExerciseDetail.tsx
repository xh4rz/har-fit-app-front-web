'use client';

import {
	ExerciseActionsDropdown,
	ExerciseInfo,
	ExerciseInstructions,
	Tabs
} from '@/components/molecules';
import { VideoPlayer } from '@/components/atoms';
import { Card } from '@/components/ui/card';
import { Exercise } from '@/infrastructure/interfaces';

interface ExerciseDetailProps {
	exercise: Exercise;
	onEdit: () => void;
	onDelete: () => void;
}

export const ExerciseDetail = ({
	exercise,
	onEdit,
	onDelete
}: ExerciseDetailProps) => {
	const tabs = [
		{
			value: 'howto',
			label: 'How to',
			content: <ExerciseInstructions exercise={exercise} />
		},
		{
			value: 'history',
			label: 'History',
			content: (
				<div className="flex flex-col p-8 justify-center items-center">
					<span className="text-foreground font-bold">
						No exercise history found
					</span>
					<span className="text-xs text-muted-foreground">
						This exercise hasn&apos;t been logged yet
					</span>
				</div>
			)
		}
	];

	return (
		<div className="flex flex-col gap-4">
			<Card className="h-full sm:min-h-96 sm:h-96 rounded-lg p-4">
				<div>
					<ExerciseActionsDropdown onEdit={onEdit} onDelete={onDelete} />
				</div>
				<div className="flex flex-col sm:flex-row h-full gap-4">
					<div className="flex-1 flex justify-center items-center">
						<ExerciseInfo exercise={exercise} />
					</div>

					<div className="flex-1 flex justify-center items-center">
						<div className="rounded-lg overflow-hidden">
							<VideoPlayer url={exercise.video} />
						</div>
					</div>
				</div>
			</Card>
			<Card className="rounded-lg p-4">
				<Tabs tabs={tabs} defaultValue="howto" />
			</Card>
		</div>
	);
};
