import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const VALID_MIME_TYPES = [
	'video/mp4', // mp4
	'video/quicktime', // mov
	'video/x-msvideo', // avi
	'video/webm', // webm
	'video/x-matroska' // mkv
];

export const exerciseFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Exercise title is required' })
		.min(6, { message: 'Exercise title must be at least 6 characters' }),

	equipmentId: z.number().min(1, {
		message: 'Equipment is required'
	}),

	primaryMuscleId: z.number().min(1, {
		message: 'Primary muscle is required'
	}),

	secondaryMuscleIds: z.array(z.number()).optional(),

	instruction: z
		.array(
			z.object({
				text: z
					.string()
					.min(1, { message: 'Add at least one instruction to the exercise' })
			})
		)
		.min(1, { message: 'At least one instruction is required' }),

	file: z
		.instanceof(File, { message: 'Video is required' })
		.refine((file) => VALID_MIME_TYPES.includes(file.type), {
			message: 'Invalid video format'
		})
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: 'Video must be smaller than 2MB'
		})
});

export type ExerciseFormData = z.infer<typeof exerciseFormSchema>;
