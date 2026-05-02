'use client';

import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type FormSelectProps<T extends BaseSelectItem, F extends FieldValues> = {
	name: FieldPath<F>;
	control: Control<F>;
	label: string;
	placeholder: string;
	required?: boolean;
	data?: T[];
	loading: boolean;
} & Omit<
	React.ComponentProps<typeof Select>,
	'value' | 'defaultValue' | 'onValueChange'
>;
export const FormSelect = <T extends BaseSelectItem, F extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	required,
	data,
	loading,
	...selectProps
}: FormSelectProps<T, F>) => {
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
					<Select
						{...selectProps}
						value={field.value === 0 ? '' : String(field.value)}
						onValueChange={(value) => field.onChange(value ? Number(value) : 0)}
						disabled={loading || selectProps.disabled}
					>
						<SelectTrigger
							disabled={selectProps.disabled}
							className="w-full"
							aria-invalid={fieldState.invalid}
							ref={field.ref}
						>
							{loading ? (
								<div className="w-full flex items-center justify-center">
									<Spinner />
								</div>
							) : (
								<SelectValue placeholder={placeholder} />
							)}
						</SelectTrigger>

						<SelectContent position="popper" className="rounded-sm">
							<SelectGroup className="h-58 overflow-y-auto scrollbar-thin scrollbar-thumb-primary hover:scrollbar-thumb-secondary scrollbar-track-transparent">
								{!loading && !data && (
									<div className="py-4 text-sm text-muted-foreground  flex justify-center items-center h-full ">
										No options available
									</div>
								)}
								{data?.map((i) => (
									<SelectItem key={i.id} value={i.id.toString()}>
										{i.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					{fieldState.error && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};
