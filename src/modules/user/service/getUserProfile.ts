import axiosClient from '@/api/axiosClient';
import { User } from '@/infrastructure/interfaces';

export const getUserProfile = async () => {
	try {
		const { data } = await axiosClient.get<User>('/users/profile');

		return data;
	} catch (error) {
		throw error;
	}
};
