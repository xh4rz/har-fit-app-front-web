'use client';

import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor
} from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';

type BaseSelectItem = {
	id: number;
	name: string;
	imageUrl: string;
};

type FormMultipleSelectProps<
	T extends BaseSelectItem,
	F extends FieldValues
> = {
	name: FieldPath<F>;
	control: Control<F>;
	label: string;
	placeholder: string;
	loading: boolean;
	required?: boolean;
	disabled?: boolean;
	data?: T[];
};

export const FormMultipleCombobox = <
	T extends BaseSelectItem,
	F extends FieldValues
>({
	name,
	control,
	label,
	placeholder,
	loading,
	required,
	disabled,
	data
}: FormMultipleSelectProps<T, F>) => {
	const anchor = useComboboxAnchor();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const selectedValues =
					data
						?.filter((item) => field.value?.includes(item.id))
						.map((item) => item.name) || [];

				const fieldEmpty = field.value?.length === 0;

				const handleValueChange = (values: string[]) => {
					const ids =
						data
							?.filter((item) => values.includes(item.name))
							.map((item) => item.id) || [];
					field.onChange(ids);
				};

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel>
							{label}
							{required && <span className="text-secondary">*</span>}
						</FieldLabel>

						<Combobox
							disabled={loading || disabled}
							multiple
							autoHighlight
							items={data?.map((i) => i.name) || []}
							value={selectedValues}
							onValueChange={handleValueChange}
						>
							<ComboboxChips ref={anchor} className="w-full">
								{loading ? (
									<div className="w-full flex items-center justify-center">
										<Spinner />
									</div>
								) : (
									<ComboboxValue>
										{(values) => (
											<>
												{values.map((value: string) => (
													<ComboboxChip key={value}>{value}</ComboboxChip>
												))}
												<ComboboxChipsInput
													ref={field.ref}
													aria-invalid={fieldState.invalid}
													placeholder={fieldEmpty ? placeholder : ''}
												/>
											</>
										)}
									</ComboboxValue>
								)}
							</ComboboxChips>

							<ComboboxContent anchor={anchor}>
								<ComboboxEmpty>No items found.</ComboboxEmpty>

								<ComboboxList>
									{(item) => (
										<ComboboxItem key={item} value={item}>
											{item}
										</ComboboxItem>
									)}
								</ComboboxList>
							</ComboboxContent>
						</Combobox>

						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				);
			}}
		/>
	);
};
