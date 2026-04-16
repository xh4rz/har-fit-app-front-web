'use client';

import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type FormInputProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
} & React.ComponentProps<typeof Input>;

export const FormInput = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	...inputProps
}: FormInputProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>
						{label}
						{required && <span className="text-secondary">*</span>}
					</FieldLabel>
					<Input {...field} {...inputProps} aria-invalid={fieldState.invalid} />
					{fieldState.error && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};
