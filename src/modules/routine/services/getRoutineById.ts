import axiosClient from '@/api/axiosClient';
import { RoutineResponse } from '@/infrastructure/interfaces';

export const getRoutineById = async (id: string) => {
	try {
		const { data } = await axiosClient.get<RoutineResponse>(`/routines/${id}`);

		return data;
	} catch (error) {
		throw error;
	}
};
