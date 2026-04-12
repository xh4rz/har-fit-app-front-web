import axiosClient from '@/api/axiosClient';
import { Exercise } from '@/infrastructure/interfaces';

export const postExercise = async (formData: FormData) => {
	try {
		const { data } = await axiosClient.post<Exercise[]>(
			'/exercises',
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
