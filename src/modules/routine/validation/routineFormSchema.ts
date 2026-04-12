import { z } from 'zod';

export const routineFormSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, { message: 'Title is required' })
		.min(5, { message: 'Title must be at least 5 characters' }),

	exercises: z
		.array(
			z.object({
				exerciseId: z.string().uuid({
					message: 'Invalid exercise id'
				}),
				sets: z
					.array(
						z.object({
							set: z.number(),
							reps: z
								.number()
								.int({ message: 'Reps must be an integer' })
								.min(1, { message: 'Reps must be greater than 0' }),

							kg: z.number().min(1, { message: 'KG must be greater than 0' })
						})
					)
					.min(1, { message: 'At least one set is required' })
			})
		)
		.min(1, { message: 'Add at least one exercise' })
});

export type RoutineFormData = z.infer<typeof routineFormSchema>;
