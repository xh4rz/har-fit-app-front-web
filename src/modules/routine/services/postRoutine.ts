import axiosClient from '@/api/axiosClient';
import { RoutineRequest, RoutineResponse } from '@/infrastructure/interfaces';

export const postRoutine = async (body: RoutineRequest) => {
	try {
		const { data } = await axiosClient.post<RoutineResponse[]>(
			'/routines',
			body
		);

		return data;
	} catch (error) {
		throw error;
	}
};
