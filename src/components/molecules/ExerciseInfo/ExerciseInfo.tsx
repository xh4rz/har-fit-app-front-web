import { Exercise } from '@/infrastructure/interfaces';

type ExerciseInfoProps = {
	exercise: Exercise;
};

export const ExerciseInfo = ({ exercise }: ExerciseInfoProps) => {
	return (
		<div className="flex flex-col justify-start items-start">
			<span className="text-xl font-bold mb-2">{exercise.title}</span>
			<span className="text-sm mb-1">
				Primary:{' '}
				<span className="text-white/60">{exercise.primaryMuscle.name}</span>
			</span>
			{exercise.secondaryMuscles?.length !== 0 && (
				<span className="text-sm">
					Secondary:{' '}
					<span className="text-white/60">
						{' '}
						{exercise.secondaryMuscles?.map((e) => e.name).join(', ')}
					</span>
				</span>
			)}
		</div>
	);
};
