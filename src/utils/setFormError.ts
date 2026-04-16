import { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import { ApiError } from '@/infrastructure/interfaces';

export const setFormError = <T extends FieldValues>(
	setError: UseFormSetError<T>,
	error: ApiError,
	field: Path<T> | 'root' = 'root'
) => {
	const message = Array.isArray(error.message)
		? error.message.join('\n\n')
		: error.message;

	setError(field as Path<T>, {
		type: 'custom',
		message
	});
};
