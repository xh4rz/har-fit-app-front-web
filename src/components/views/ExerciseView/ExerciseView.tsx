'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getExercises } from '@/modules/exercise/services/exercise';
import { getMuscles } from '@/modules/exercise/services/muscle';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { Card } from '@/components/ui/card';
import { BarbellIcon, PlusIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FormSelect } from '@/components/molecules';
import { Separator } from '@/components/ui/separator';

export const ExerciseView = () => {
	const router = useRouter();

	// const isSelecting = useRoutineStore((state) => state.isSelecting);

	const { data: dataExercises, isPending: isPendingExercises } = useQuery({
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

	const handlePressExercise = (id: string, title: string) => {
		// router.push({
		// 	pathname: '/exercise/[id]',
		// 	params: { id, title }
		// });
	};

	return (
		<div className="flex flex-col md:flex-row gap-4 ">
			<div className="flex flex-col gap-4 w-full">
				{/* <h2 className="text-2xl font-medium">Exercise</h2> */}
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
			</div>

			<Card className="w-full max-w-full md:max-w-80  rounded-lg p-4 h-[calc(100vh-3rem)]">
				{isPendingExercises ? (
					<Skeleton className="h-full" />
				) : (
					<div className="flex flex-col gap-4 h-full">
						<div className="flex justify-between">
							<h5 className="text-lg font-medium">Library</h5>
							<Button
								variant="ghost"
								className="text-secondary"
								iconLeft={<PlusIcon />}
							>
								Add Exercise
							</Button>
						</div>
						<div>
							<FormSelect
								placeHolder="Select Muscle"
								data={dataMuscles}
								loading={isPendingMuscles}
							/>
						</div>
						<div>
							<FormSelect
								placeHolder="Select Equipment"
								data={dataEquipments}
								loading={isPendingEquipments}
							/>
						</div>
						<div>
							<Separator />
						</div>
						<div className="overflow-y-auto scrollbar-thin scrollbar-thumb-primary hover:scrollbar-thumb-secondary scrollbar-track-transparent">
							{dataExercises?.map((i) => (
								<div key={i.id} className="border m-2 p-2">
									<h3>{i.title}</h3>
									<h3>{i.primaryMuscle.name}</h3>
								</div>
							))}
						</div>
					</div>
				)}
			</Card>
		</div>

		// <View>
		// 	<View className="flex-row gap-2 p-4">
		// 		<View className="flex-1">
		// 			<Button
		// 				title={findEquipment?.name ?? ''}
		// 				loading={isPendingEquipments}
		// 				variant="secondary"
		// 				onPress={() => setShowModalEquipment(true)}
		// 			/>
		// 		</View>
		// 		<View className="flex-1">
		// 			<Button
		// 				title={findMuscle?.name ?? ''}
		// 				loading={isPendingMuscles}
		// 				variant="secondary"
		// 				onPress={() => setShowModalMuscle(true)}
		// 			/>
		// 		</View>
		// 	</View>

		// 	<ExerciseList
		// 		data={dataExercises}
		// 		onPress={handlePressExercise}
		// 		selectable={isSelecting}
		// 	/>

		// 	<BottomSheetSelectList
		// 		title="Equipments"
		// 		data={dataEquipments}
		// 		show={showModalEquipment}
		// 		setShow={setShowModalEquipment}
		// 		selectedIds={equipmentId ? [equipmentId] : []}
		// 		onChange={(ids) => setEquipmentId(ids[0])}
		// 		imageScale={0.6}
		// 	/>

		// 	<BottomSheetSelectList
		// 		title="Muscles"
		// 		data={dataMuscles}
		// 		show={showModalMuscle}
		// 		setShow={setShowModalMuscle}
		// 		selectedIds={muscleId ? [muscleId] : []}
		// 		onChange={(ids) => setMuscleId(ids[0])}
		// 		imageScale={1.2}
		// 	/>
		// </View>
	);
};
