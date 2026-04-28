import { axiosAuthClient } from '@/api/axiosClient';
import { Auth } from '@/infrastructure/interfaces';
import { clearAuthCookies } from './clearAuthCookies';

export const authLogin = async (email: string, password: string) => {
	email = email.toLowerCase();

	try {
		const { data } = await axiosAuthClient.post<Auth>('/auth/login', {
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
		const { data } = await axiosAuthClient.post<Auth>('/auth/register', {
			fullName: name,
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const authLogout = async () => {
	try {
		const { data } = await axiosAuthClient.post('/auth/logout');

		return data;
	} catch {
		clearAuthCookies();
	}
};

export const authRefreshToken = async () => {
	try {
		await axiosAuthClient.post('/auth/refresh-token');

		return true;
	} catch (error) {
		throw error;
	}
};
