import { z } from 'zod';

export const exerciseFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Exercise name is required' })
		.min(6, { message: 'Exercise name must be at least 6 characters' }),

	equipmentId: z.number().min(1, {
		message: 'Equipment is required'
	}),

	primaryMuscleId: z.number().min(1, {
		message: 'Primary muscle is required'
	}),

	secondaryMuscleIds: z.array(z.number()).optional(),

	// instruction: z
	// 	.array(
	// 		z.string().min(1, {
	// 			message: 'Add at least one instruction to the exercise'
	// 		})
	// 	)
	// 	.min(1, { message: 'At least one instruction is required' }),

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
		.object({
			uri: z.string(),
			fileName: z.string(),
			mimeType: z.string(),
			width: z.number(),
			height: z.number(),
			fileSize: z.number().optional()
		})
		.refine((file) => !!file.uri, {
			message: 'Video is required'
		})
		.refine((file) => file.mimeType.startsWith('video/'), {
			message: 'File must be a video'
		})
		.refine((file) => (file.fileSize ?? 0) <= 2 * 1024 * 1024, {
			message: 'Video must be smaller than 2MB'
		})
});

export type ExerciseFormData = z.infer<typeof exerciseFormSchema>;
