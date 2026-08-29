import axiosClient from '@/api/axiosClient';
import { User, UserRequest } from '@/infrastructure/interfaces';

export const patchUserById = async (id: string, body: UserRequest) => {
	try {
		const { data } = await axiosClient.patch<User>(`/users/${id}`, body);

		return data;
	} catch (error) {
		throw error;
	}
};
