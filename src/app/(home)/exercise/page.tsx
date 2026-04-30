'use client';

import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarbellIcon } from '@phosphor-icons/react';

export default function ExercisePage() {
	const { isPending: isPendingExercises } = useQuery({
		queryKey: ['exercises'],
		queryFn: () => {},
		enabled: false
	});

	return (
		<Card className="min-h-96 h-96 rounded-lg p-4 flex justify-center items-center text-center gap-2">
			{isPendingExercises ? (
				<Skeleton className="h-full w-full" />
			) : (
				<>
					<BarbellIcon size={48} className="text-muted-foreground mb-4" />
					<h5 className="text-lg font-medium">Select Exercise</h5>
					<span className="text-muted-foreground">
						Click on an exercise to see statistics about it.
					</span>
				</>
			)}
		</Card>
	);
}
