import { Separator } from '@/components/ui/separator';
import { Exercise } from '@/infrastructure/interfaces';

type ExerciseInfoProps = {
	exercise: Exercise;
};

export const ExerciseInstructions = ({ exercise }: ExerciseInfoProps) => {
	return (
		<div className="flex flex-col gap-2">
			{exercise.instruction.map((item, index) => (
				<div key={index} className="flex flex-col gap-4 justify-center">
					<div className="flex flex-row gap-4">
						<span className="font-semibold">{index + 1}.</span>
						<span className="flex-1">{item}</span>
					</div>
					<Separator />
				</div>
			))}
		</div>
	);
};
