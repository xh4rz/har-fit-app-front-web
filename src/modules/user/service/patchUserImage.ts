import axiosClient from '@/api/axiosClient';
import { User } from '@/infrastructure/interfaces';

export const patchUserImage = async (formData: FormData) => {
	try {
		const { data } = await axiosClient.patch<User>(
			'users/profile-image',
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
