'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	deleteExerciseById,
	getExerciseById
} from '@/modules/exercise/services/exercise';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
	DeleteAlertDialog,
	ExerciseDetail,
	ExerciseForm
} from '@/components/organism';
import { useState } from 'react';
import { Dialog } from '@/components/molecules';
import { Exercise } from '@/infrastructure/interfaces';
import { toast } from 'sonner';

export const ExerciseDetailView = () => {
	const { id } = useParams<{ id: string }>();

	const router = useRouter();

	const queryClient = useQueryClient();

	const [showModalEditExercise, setShowModalEditExercise] = useState(false);

	const [showModalDeleteExercise, setShowModalDeleteExercise] = useState(false);

	const {
		data: dataExercise,
		isPending: isPendingExercise,
		isError: isErrorExercise
	} = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => getExerciseById(id)
	});

	const handleEditExercise = () => {
		setShowModalEditExercise(true);
	};

	const handleDeleteExercise = () => {
		setShowModalDeleteExercise(true);
	};

	const { mutate: deleteExercise, isPending: isPendingDeleteExercise } =
		useMutation({
			mutationFn: () => deleteExerciseById(id),
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ['exercises'],
					refetchType: 'active'
				});
				router.replace('/exercise');
				toast.error('Exercise successfully removed.');
			}
		});

	const mapExerciseToForm = (exercise: Exercise) => ({
		title: exercise.title,
		equipmentId: exercise.equipment?.id ?? 0,
		primaryMuscleId: exercise.primaryMuscle?.id ?? 0,
		secondaryMuscleIds: exercise.secondaryMuscles?.map((i) => i.id) ?? [],
		instruction: exercise.instruction?.map((text: string) => ({ text })) ?? [],
		file: undefined
	});

	if (isPendingExercise) {
		return (
			<div className="flex flex-col gap-4 h-full">
				<Card className="min-h-96 h-96 rounded-lg p-4 flex justify-center items-center text-center gap-2">
					<Skeleton className="h-full w-full" />
				</Card>
				<Card className="min-h-96 h-96 rounded-lg p-4 flex justify-center items-center text-center gap-2">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={i} className="h-full w-full" />
					))}
				</Card>
			</div>
		);
	}

	if (isErrorExercise || !dataExercise) {
		return (
			<Card className="min-h-96 h-96 rounded-lg p-4 flex justify-center items-center text-center gap-2">
				<span>An error occurred while loading the exercise details.</span>
			</Card>
		);
	}

	return (
		<>
			<ExerciseDetail
				exercise={dataExercise}
				onEdit={handleEditExercise}
				onDelete={handleDeleteExercise}
			/>

			<Dialog
				open={showModalEditExercise}
				onOpenChange={setShowModalEditExercise}
				title="Edit Exercise"
			>
				<ExerciseForm
					mode="edit"
					onOpenChange={setShowModalEditExercise}
					defaultValues={mapExerciseToForm(dataExercise)}
					videoUrl={dataExercise.video}
				/>
			</Dialog>

			<DeleteAlertDialog
				title={`Delete '${dataExercise.title}' Exercise`}
				description="Are you sure you want to delete this exercise?"
				open={showModalDeleteExercise}
				loading={isPendingDeleteExercise}
				onOpenChange={setShowModalDeleteExercise}
				onDelete={deleteExercise}
			/>
		</>
	);
};
