import axiosClient from '@/api/axiosClient';
import { Auth } from '@/infrastructure/interfaces';

export const authLogin = async (email: string, password: string) => {
	email = email.toLowerCase();

	try {
		const { data } = await axiosClient.post<Auth>('/auth/login', {
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const authRegister = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const { data } = await axiosClient.post<Auth>('/auth/register', {
			fullName: name,
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};
