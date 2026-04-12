import axiosClient from '@/api/axiosClient';
import { Exercise } from '@/infrastructure/interfaces';

export const getExerciseById = async (id: string) => {
	try {
		const { data } = await axiosClient.get<Exercise>(`/exercises/${id}`);

		return data;
	} catch {
		throw new Error(`error get exercise by ${id}`);
	}
};
