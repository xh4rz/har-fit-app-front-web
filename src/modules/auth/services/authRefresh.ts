import axios from 'axios';
import { Token } from '@/infrastructure/interfaces';

export const authRefreshToken = async (refreshToken: string) => {
	const baseURL = process.env.EXPO_PUBLIC_API_URL;

	const { data } = await axios.post<Token>(`${baseURL}/auth/refresh-token`, {
		refreshToken
	});
	return data;
};
