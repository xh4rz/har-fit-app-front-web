'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoutineById } from '@/modules/routine/services';
import { RoutineForm } from '@/components/organism';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const RoutineEditView = () => {
	const { id } = useParams<{ id: string }>();

	const {
		data: dataRoutine,
		isPending: isPendingRoutine,
		isError: isErrorRoutine
	} = useQuery({
		queryKey: ['routine', id],
		queryFn: () => getRoutineById(id)
	});

	if (isPendingRoutine) {
		return (
			<Card className="rounded-lg p-4 h-[calc(100vh-3rem)] flex justify-center items-center text-center">
				<Skeleton className="h-full w-full" />
			</Card>
		);
	}

	if (isErrorRoutine) {
		return (
			<Card className="rounded-lg p-4 h-[calc(100vh-3rem)] flex justify-center items-center text-center">
				<span>An error occurred while loading the routines.</span>
			</Card>
		);
	}

	return <RoutineForm mode="edit" routine={dataRoutine} />;
};
