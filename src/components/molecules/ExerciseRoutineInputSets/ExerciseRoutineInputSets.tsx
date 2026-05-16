'use client';

import { useEffect, useRef } from 'react';
import {
	useFieldArray,
	Control,
	Controller,
	FieldErrors
} from 'react-hook-form';
import { RoutineFormInput } from '@/modules/routine/validation/routineFormSchema';
import { Button } from '@/components/ui/button';
import { PlusIcon, XIcon } from '@phosphor-icons/react';
import { Input } from '@/components/ui/input';

interface ExerciseRoutineInputSetsProps {
	control: Control<RoutineFormInput>;
	exerciseIndex: number;
	error: FieldErrors<RoutineFormInput>['exercises'];
}

type InputValue = number | string;

export const ExerciseRoutineInputSets = ({
	control,
	exerciseIndex,
	error
}: ExerciseRoutineInputSetsProps) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `exercises.${exerciseIndex}.sets`
	});

	const setsError = error?.[exerciseIndex]?.sets;
	const errorsMessage = setsError?.message || setsError?.root?.message;

	const handleChange = (
		text: string,
		onChange: (value: InputValue) => void,
		allowDecimal: boolean
	) => {
		if (text === '') {
			onChange('');
			return;
		}

		if (!allowDecimal && text.includes('.')) return;

		if (allowDecimal) {
			if (text === '.' || text.endsWith('.')) {
				onChange(text);
				return;
			}

			if ((text.match(/\./g) || []).length > 1) return;
		}

		const numeric = Number(text);

		if (!isNaN(numeric)) {
			onChange(numeric);
		}
	};

	const getDisplayValue = (value: unknown) => {
		if (value === null || value === undefined) return '';
		return String(value);
	};

	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;

		if (fields.length === 0) {
			append({
				set: 1,
				kg: '',
				reps: ''
			});
		}

		initialized.current = true;
	}, []);

	return (
		<div>
			<div className="flex flex-row items-center py-1 text-xs">
				<span className="w-8">SET</span>
				<span className="flex-1">KG</span>
				<span className="flex-1">REPS</span>
				<div className="w-8" />
			</div>

			{fields.map((field, index) => {
				const kgError = setsError?.[index]?.kg?.message;
				const repsError = setsError?.[index]?.reps?.message;

				return (
					<div key={field.id} className="flex flex-col">
						<div className="flex flex-row items-center bg-muted p-1 rounded-lg mb-2 ">
							<span className="w-8 text-primary/70 font-semibold">
								{index + 1}
							</span>

							<div className="flex-1 flex flex-col justify-center items-center gap-1">
								<Controller
									control={control}
									name={`exercises.${exerciseIndex}.sets.${index}.kg`}
									render={({ field: { onChange, value, ref } }) => (
										<Input
											autoFocus
											ref={ref}
											value={getDisplayValue(value)}
											onChange={(e) =>
												handleChange(e.target.value, onChange, true)
											}
											className="text-center w-28 h-11"
										/>
									)}
								/>

								{kgError && (
									<span className="text-destructive text-xs text-center">
										{kgError}
									</span>
								)}
							</div>

							<div className="flex-1 flex flex-col justify-center items-center gap-1">
								<Controller
									control={control}
									name={`exercises.${exerciseIndex}.sets.${index}.reps`}
									render={({ field: { onChange, value, ref } }) => (
										<Input
											ref={ref}
											value={getDisplayValue(value)}
											onChange={(e) =>
												handleChange(e.target.value, onChange, false)
											}
											className="text-center w-28 h-11"
										/>
									)}
								/>

								{repsError && (
									<span className="text-destructive text-xs text-center">
										{repsError}
									</span>
								)}
							</div>

							<div className="mr-1">
								<XIcon
									onClick={() => remove(index)}
									className="text-destructive/70 size-4 hover:cursor-pointer hover:text-destructive"
								/>
							</div>
						</div>
					</div>
				);
			})}

			<Button
				variant="outline"
				className="w-full text-primary hover:text-primary mb-2"
				iconLeft={<PlusIcon />}
				onClick={() => {
					const newIndex = fields.length;
					append({
						set: newIndex + 1,
						kg: '',
						reps: ''
					});
				}}
			>
				Add set
			</Button>

			{errorsMessage && (
				<span className="text-destructive">{errorsMessage}</span>
			)}
		</div>
	);
};
