import { UseFormSetError } from 'react-hook-form';
import { ApiError } from '@/infrastructure/interfaces';

export const setFormError = (
	setError: UseFormSetError<any>,
	error: unknown,
	field: string = 'root'
) => {
	const errorObj = error as ApiError;

	const message = Array.isArray(errorObj.message)
		? errorObj.message.join('\n\n')
		: errorObj.message;

	setError(field, {
		type: 'custom',
		message
	});
};
