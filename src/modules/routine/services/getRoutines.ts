import axiosClient from '@/api/axiosClient';
import { RoutineResponse } from '@/infrastructure/interfaces';

export const getRoutines = async () => {
	try {
		const { data } = await axiosClient.get<RoutineResponse[]>('/routines');

		return data;
	} catch (error) {
		throw error;
	}
};
