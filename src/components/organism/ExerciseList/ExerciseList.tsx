import { ExerciseItem } from '@/components/molecules';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseListProps = {
	dataExercises: Exercise[] | undefined;
	onSelectExercise: (id: string) => void;
	mode?: 'view' | 'select';
};

export const ExerciseList = ({
	dataExercises,
	onSelectExercise,
	mode = 'view'
}: ExerciseListProps) => {
	const toggleExercise = useRoutineStore((state) => state.toggleExercise);
	const selectedExercises = useRoutineStore((state) => state.selectedExercises);

	const isExerciseSelected = (id: string) =>
		selectedExercises.some((e) => e.id === id);

	const handleClickExercise = (exercise: Exercise) => {
		if (mode === 'select') {
			toggleExercise({
				id: exercise.id,
				title: exercise.title,
				video: exercise.video,
				primaryMuscleName: exercise.primaryMuscle.name
			});
		} else {
			onSelectExercise(exercise.id);
		}
	};

	if (dataExercises?.length === 0) {
		return (
			<p className="text-muted-foreground w-full text-center">
				No exercise found. Try another search.
			</p>
		);
	}

	return (
		<div className="scrollbar-custom">
			{dataExercises?.map((exercise) => (
				<div className="mr-2" key={exercise.id}>
					<ExerciseItem
						exercise={exercise}
						onSelectExercise={() => handleClickExercise(exercise)}
						isSelected={
							mode === 'select' ? isExerciseSelected(exercise.id) : false
						}
						mode={mode}
					/>
				</div>
			))}
		</div>
	);
};
