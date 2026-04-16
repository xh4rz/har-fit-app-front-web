import { AxiosError, isAxiosError } from 'axios';
import { ApiError } from '@/infrastructure/interfaces';

export const parseAxiosError = (error: unknown): ApiError => {
	if (isAxiosError<ApiError>(error)) {
		const axiosError: AxiosError<ApiError> = error;

		if (axiosError.response?.data) {
			console.error('API error response:', axiosError.response.data);
			return axiosError.response.data;
		}

		const networkCodes = [
			'ERR_NETWORK',
			'ECONNREFUSED',
			'ENOTFOUND',
			'ETIMEDOUT',
			'ECONNRESET'
		];

		if (axiosError.code && networkCodes.includes(axiosError.code)) {
			return {
				message: ['Network error. Check your connection'],
				error: 'Network Error',
				statusCode: 0
			};
		}
	}

	const unknownError: ApiError = {
		message: ['Unknown error'],
		error: 'Unknown Error',
		statusCode: 500
	};

	console.error('Unknown error:', unknownError);
	return unknownError;
};
