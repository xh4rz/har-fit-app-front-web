import axiosClient from '@/api/axiosClient';

export const deleteRoutineById = async (id: string) => {
	try {
		const { data } = await axiosClient.delete(`/routines/${id}`);

		return data;
	} catch (error) {
		throw error;
	}
};
