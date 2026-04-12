import axiosClient from '@/api/axiosClient';
import { RoutineRequest, RoutineResponse } from '@/infrastructure/interfaces';

export const patchRoutineById = async (id: string, body: RoutineRequest) => {
	try {
		const { data } = await axiosClient.patch<RoutineResponse[]>(
			`/routines/${id}`,
			body
		);

		return data;
	} catch (error) {
		throw error;
	}
};
