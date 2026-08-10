import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const VALID_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp'
];

const imageSchema = z
	.instanceof(File)
	.optional()
	.refine((file) => !file || VALID_IMAGE_TYPES.includes(file.type), {
		message: 'Invalid image format'
	})
	.refine((file) => !file || file.size <= MAX_FILE_SIZE, {
		message: 'Image must be smaller than 2MB'
	});

export const profileFormSchema = z.object({
	file: imageSchema,
	username: z
		.string()
		.min(1, 'Username is required')
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username can have a maximum of 20 characters')
		.regex(
			/^[a-zA-Z][a-zA-Z0-9_]*$/,
			'Username must begin with a letter and may contain numbers or underscores (_)'
		),
	fullname: z
		.string()
		.min(1, 'Full Name is required')
		.min(10, 'Full Name must be at least 10 characters')
		.max(50, 'Full Name can have a maximum of 50 characters')
		.regex(/^[A-Za-z\s]+$/, 'Full Name must contain only letters'),
	email: z
		.string()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address' }),
	description: z
		.string()
		.max(300, 'Description can have a maximum of 300 characters')
		.optional(),
	// gender: z.enum(Gender).optional(),
	gender: z.number().int().min(1).max(3),
	birthDate: z.date().optional()
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
