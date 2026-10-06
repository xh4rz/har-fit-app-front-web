'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getWorkoutById } from '@/modules/workout/services';
import { WorkoutForm } from '@/components/organism';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const WorkoutEditView = () => {
	const { id } = useParams<{ id: string }>();

	const {
		data: dataWorkout,
		isPending: isPendingWorkout,
		isError: isErrorWorkout
	} = useQuery({
		queryKey: ['workout', id],
		queryFn: () => getWorkoutById(id)
	});

	if (isPendingWorkout) {
		return (
			<Card className="rounded-lg p-4 h-[calc(100vh-3rem)] flex justify-center items-center text-center">
				<Skeleton className="h-full w-full" />
			</Card>
		);
	}

	if (isErrorWorkout) {
		return (
			<Card className="rounded-lg p-4 h-[calc(100vh-3rem)] flex justify-center items-center text-center">
				<span>An error occurred while loading the workout.</span>
			</Card>
		);
	}

	return <WorkoutForm mode="edit" routine={dataWorkout} />;
};
