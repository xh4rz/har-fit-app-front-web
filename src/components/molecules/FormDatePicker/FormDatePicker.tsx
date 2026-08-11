'use client';

import { useState } from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';

type FormDatePickerProps<T extends FieldValues> = {
	name: FieldPath<T>;
	control: Control<T>;
	label: string;
	required?: boolean;
} & React.ComponentProps<typeof Button>;

export const FormDatePicker = <T extends FieldValues>({
	name,
	control,
	label,
	required,
	...buttonProps
}: FormDatePickerProps<T>) => {
	const [open, setOpen] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const date = field.value ? new Date(field.value) : undefined;

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel>
							{label} {required && <span className="text-secondary">*</span>}
						</FieldLabel>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									{...buttonProps}
									variant="outline"
									id="date"
									className="justify-start font-normal"
								>
									{date ? date.toLocaleDateString() : 'Select date'}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto overflow-hidden p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={date}
									defaultMonth={date}
									captionLayout="dropdown"
									onSelect={(date) => {
										field.onChange(date);
										setOpen(false);
									}}
									disabled={(date) => date > new Date()}
								/>
							</PopoverContent>
						</Popover>

						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				);
			}}
		/>
	);
};
