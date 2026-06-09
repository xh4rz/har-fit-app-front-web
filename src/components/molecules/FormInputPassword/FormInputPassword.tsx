'use client';

import { useState } from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput
} from '@/components/ui/input-group';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

type FormInputPasswordProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
} & React.ComponentProps<typeof Input>;

export const FormInputPassword = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	...inputProps
}: FormInputPasswordProps<T>) => {
	const [isVisible, setIsVisible] = useState(false);
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
					<InputGroup>
						<InputGroupInput
							{...field}
							{...inputProps}
							type={isVisible ? 'text' : 'password'}
							aria-invalid={fieldState.invalid}
						/>
						<InputGroupAddon align="inline-end">
							<InputGroupButton
								aria-invalid={fieldState.invalid}
								aria-label="password"
								title="password"
								size="icon-sm"
								onClick={() => setIsVisible((prevState) => !prevState)}
								className="text-primary rounded-l-none border-l-0"
								disabled={inputProps.disabled}
							>
								{isVisible ? <EyeSlashIcon /> : <EyeIcon />}
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
					{fieldState.error && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};
