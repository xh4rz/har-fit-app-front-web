import axiosClient from '@/api/axiosClient';
import { Exercise, ExerciseRequest } from '@/infrastructure/interfaces';

export const getExercises = async ({
	primaryMuscleId,
	equipmentId
}: ExerciseRequest) => {
	try {
		const { data } = await axiosClient.get<Exercise[]>('/exercises', {
			params: { primaryMuscleId, equipmentId }
		});

		return data;
	} catch {
		throw new Error('error get exercises');
	}
};
