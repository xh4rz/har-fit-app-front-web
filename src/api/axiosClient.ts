import axios, { AxiosRequestConfig } from 'axios';
import { parseAxiosError } from '@/utils';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { authRefreshToken } from '@/modules/auth/services/auth';
import { clearAuthCookies } from '@/modules/auth/services/clearAuthCookies';

const baseConfig: AxiosRequestConfig = {
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
		'x-client-type': 'web'
	},
	withCredentials: true
};

export const axiosAuthClient = axios.create(baseConfig);

const axiosClient = axios.create(baseConfig);

axiosAuthClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		return Promise.reject(parseAxiosError(error));
	}
);

let refreshingToken: Promise<boolean> | null = null;

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				refreshingToken = refreshingToken ?? authRefreshToken();

				await refreshingToken;

				refreshingToken = null;

				return axiosClient(originalRequest);
			} catch (error) {
				refreshingToken = null;

				useAuthStore.getState().logout();

				clearAuthCookies();

				return Promise.reject(parseAxiosError(error));
			}
		}

		return Promise.reject(parseAxiosError(error));
	}
);

export default axiosClient;
