'use client';

import { useId, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExercises } from '@/modules/exercise/services/exercise';
import { getMuscles } from '@/modules/exercise/services/muscle';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DefaultSelect, Dialog, ExerciseItem } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';
import { ExerciseForm } from '@/components/organism';
import { cn } from '@/lib/utils';
import { PlusIcon } from '@phosphor-icons/react';

export const ExerciseView = () => {
	const formId = `form-create-exercise-${useId()}`;

	const [showModalCreateExercise, setShowModalCreateExercise] = useState(false);

	const {
		data: dataExercises,
		isPending: isPendingExercises,
		isError: isErrorExercises
	} = useQuery({
		queryKey: ['exercises'],
		queryFn: getExercises
	});

	const { data: dataMuscles, isPending: isPendingMuscles } = useQuery({
		queryKey: ['muscles'],
		queryFn: getMuscles,
		enabled: !isPendingExercises
	});

	const { data: dataEquipments, isPending: isPendingEquipments } = useQuery({
		queryKey: ['equipments'],
		queryFn: getEquipments,
		enabled: !isPendingExercises
	});

	if (isPendingExercises) {
		return (
			<Card className="rounded-lg p-4 h-[calc(100vh-3rem)]">
				<Skeleton className="h-40 w-full" />
				<div className="flex flex-col gap-2 h-full">
					{Array.from({ length: 12 }).map((_, i) => (
						<Skeleton
							key={i}
							className={cn('h-full w-full', i >= 10 && 'hidden xl:block')}
						/>
					))}
				</div>
			</Card>
		);
	}

	if (isErrorExercises) {
		return (
			<Card className="rounded-lg p-4 h-[calc(100vh-3rem)] flex justify-center items-center text-center">
				<span>An error occurred while loading the exercises.</span>
			</Card>
		);
	}

	return (
		<Card className="rounded-lg p-4 h-[calc(100vh-3rem)]">
			<div className="flex flex-col gap-4 h-full">
				<div className="flex justify-between">
					<h5 className="text-lg font-medium">Library</h5>
					<Button
						variant="ghost"
						className="text-secondary"
						iconLeft={<PlusIcon />}
						onClick={() => setShowModalCreateExercise(true)}
					>
						Add Exercise
					</Button>
				</div>
				<div>
					<DefaultSelect
						placeHolder="Select Muscle"
						data={dataMuscles}
						loading={isPendingMuscles}
					/>
				</div>
				<div>
					<DefaultSelect
						placeHolder="Select Equipment"
						data={dataEquipments}
						loading={isPendingEquipments}
					/>
				</div>
				<div>
					<Separator />
				</div>
				<div className="scrollbar-custom">
					{dataExercises?.map((exercise) => (
						<div className="mr-2" key={exercise.id}>
							<ExerciseItem exercise={exercise} />
						</div>
					))}
				</div>
			</div>
			<Dialog
				open={showModalCreateExercise}
				onOpenChange={setShowModalCreateExercise}
				title="Create Exercise"
				idForm={formId}
			>
				<ExerciseForm mode="create" idForm={formId} />
			</Dialog>
		</Card>
	);
};
