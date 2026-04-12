import axiosClient from '@/api/axiosClient';

export const deleteExerciseById = async (id: string) => {
	try {
		const { data } = await axiosClient.delete(`/exercises/${id}`);

		return data;
	} catch {
		throw new Error(`error delete exercise by ${id}`);
	}
};
