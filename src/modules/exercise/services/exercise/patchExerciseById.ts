import axiosClient from '@/api/axiosClient';
import { Exercise } from '@/infrastructure/interfaces';

export const patchExerciseById = async (id: string, formData: FormData) => {
	try {
		const { data } = await axiosClient.patch<Exercise[]>(
			`/exercises/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);

		return data;
	} catch (error) {
		throw error;
	}
};
