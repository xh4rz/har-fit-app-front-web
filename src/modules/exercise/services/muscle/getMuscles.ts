import axiosClient from '@/api/axiosClient';
import { Muscle } from '@/infrastructure/interfaces';

export const getMuscles = async () => {
	try {
		const { data } = await axiosClient.get<Muscle[]>('/muscles');

		return data;
	} catch {
		throw new Error('error get exercises');
	}
};
