import axiosClient from '@/api/axiosClient';
import { User } from '@/infrastructure/interfaces';

export const deleteUserImage = async () => {
	try {
		const { data } = await axiosClient.delete<User>('users/profile-image');

		return data;
	} catch (error) {
		throw error;
	}
};
