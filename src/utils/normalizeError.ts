import { ApiError } from '@/infrastructure/interfaces';

export const normalizeError = (error: unknown): ApiError => {
	if (error instanceof Error) {
		try {
			return JSON.parse(error.message);
		} catch {}
	}

	if (typeof error === 'object' && error !== null) {
		return error as ApiError;
	}

	return {
		message: ['Unknown error'],
		error: 'Unknown Error',
		statusCode: 500
	};
};
