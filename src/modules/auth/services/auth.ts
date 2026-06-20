import { axiosAuthClient } from '@/api/axiosClient';
import {
	AuthLoginRequest,
	AuthRegisterRequest,
	AuthResponse
} from '@/infrastructure/interfaces';
import { clearAuthCookies } from './clearAuthCookies';

export const authLogin = async ({ email, password }: AuthLoginRequest) => {
	email = email.toLowerCase();

	try {
		const { data } = await axiosAuthClient.post<AuthResponse>('/auth/login', {
			email,
			password
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const authRegister = async ({
	username,
	fullname,
	email,
	password
}: AuthRegisterRequest) => {
	try {
		const { data } = await axiosAuthClient.post<AuthResponse>(
			'/auth/register',
			{
				username,
				fullname,
				email,
				password
			}
		);

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
