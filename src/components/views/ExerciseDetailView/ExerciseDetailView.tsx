'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
// import {
// 	BottomSheetExerciseOptions,
// 	DeleteExerciseModal,
// 	ExerciseDetail
// } from '@/components/organisms';
import {
	// deleteExerciseById,
	getExerciseById
} from '@/modules/exercise/services/exercise';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ExerciseDetail } from '@/components/organism';

export const ExerciseDetailView = () => {
	const { id } = useParams<{ id: string }>();

	// const router = useRouter();

	// const navigation = useNavigation();

	// const queryClient = useQueryClient();

	// const [showModalOptions, setShowModalOptions] = useState(false);

	// const [showModalDeleteExercise, setShowModalDeleteExercise] = useState(false);

	const {
		data: dataExercise,
		isPending: isPendingExercise,
		isError: isErrorExercise
	} = useQuery({
		queryKey: ['exercise', id],
		queryFn: () => getExerciseById(id)
	});

	// const handleEditExercise = () => {
	// router.push({
	// 	pathname: '/exercise/edit/[id]',
	// 	params: { id }
	// });
	// };

	// const handleDeleteExercise = () => {
	// 	setShowModalDeleteExercise(true);
	// };

	// const { mutate: deleteExercise, isPending: loadingDelete } = useMutation({
	// 	mutationFn: () => deleteExerciseById(id),
	// 	onSuccess: async () => {
	// 		await queryClient.invalidateQueries({
	// 			queryKey: ['exercises']
	// 		});
	// 		router.back();
	// 	}
	// });

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

	return <ExerciseDetail exercise={dataExercise} />;
};

{
	/* <BottomSheetExerciseOptions
				show={showModalOptions}
				setShow={setShowModalOptions}
				onEditExercise={handleEditExercise}
				onDeleteExercise={handleDeleteExercise}
			/>

			<DeleteExerciseModal
				exerciseTitle={exercise.title}
				visible={showModalDeleteExercise}
				setVisible={setShowModalDeleteExercise}
				onDelete={deleteExercise}
				loading={loadingDelete}
			/>  */
}
