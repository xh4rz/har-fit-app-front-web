import axiosClient from '@/api/axiosClient';

import { Exercise } from '@/infrastructure/interfaces';

export const getExercises = async () => {
	try {
		const { data } = await axiosClient.get<Exercise[]>('/exercises');

		return data;
	} catch {
		throw new Error('error get exercises');
	}
};
