import { z } from 'zod';

const coerceNumber = <T extends z.ZodNumber>(schema: T) =>
	z.preprocess((value) => {
		if (value === '' || value === null || value === undefined) {
			return undefined;
		}

		return Number(value);
	}, schema);

const repsSchema = coerceNumber(
	z
		.number({
			message: 'Reps is required'
		})
		.int({ message: 'Reps must be an integer' })
		.min(1, { message: 'Reps must be greater than 0' })
);

const kgSchema = coerceNumber(
	z
		.number({
			message: 'KG is required'
		})
		.min(1, { message: 'KG must be greater than 0' })
);

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
							reps: repsSchema,
							kg: kgSchema
						})
					)
					.min(1, { message: 'At least one set is required' })
			})
		)
		.min(1, { message: 'Add at least one exercise' })
});

export type RoutineFormInput = z.input<typeof routineFormSchema>;
export type RoutineFormOutput = z.output<typeof routineFormSchema>;
