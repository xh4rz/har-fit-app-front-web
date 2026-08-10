'use client';

import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

type FormTextareaProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
	maxLength?: number;
} & React.ComponentProps<typeof Textarea>;

export const FormTextarea = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	maxLength = 300,
	...textareaProps
}: FormTextareaProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const characterCount = field.value?.length ?? 0;

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel>
							{label}
							{required && <span className="text-secondary">*</span>}
						</FieldLabel>

						<Textarea
							{...field}
							{...textareaProps}
							maxLength={maxLength}
							aria-invalid={fieldState.invalid}
						/>

						{fieldState.error && <FieldError errors={[fieldState.error]} />}

						<span className="text-muted-foreground text-xs">
							{characterCount}/{maxLength}
						</span>
					</Field>
				);
			}}
		/>
	);
};
