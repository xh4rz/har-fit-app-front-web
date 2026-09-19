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
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { FormSelect } from '../FormSelect';
import { getRestTimerOptions } from '@/utils';

interface ExerciseRoutineSetsProps {
	control: Control<RoutineFormInput>;
	exerciseIndex: number;
	error: FieldErrors<RoutineFormInput>['exercises'];
	isWorkout?: boolean;
}

type InputValue = number | string;

export const ExerciseRoutineSets = ({
	control,
	exerciseIndex,
	error,
	isWorkout = false
}: ExerciseRoutineSetsProps) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `exercises.${exerciseIndex}.sets`
	});
	const setsError = error?.[exerciseIndex]?.sets;
	const errorsMessage = setsError?.message || setsError?.root?.message;
	const initialized = useRef(false);

	const handleChange = (
		text: string,
		onChange: (value: InputValue) => void,
		allowDecimal: boolean
	) => {
		if (text === '') {
			onChange('');
			return;
		}

		if (text.length > 4) return;

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

	const createSet = (set: number) => ({
		set,
		kg: '',
		reps: '',
		...(isWorkout && { completed: false })
	});

	useEffect(() => {
		if (initialized.current) return;

		if (fields.length === 0) {
			append(createSet(1));
		}

		initialized.current = true;
	}, []);

	return (
		<div>
			<div className="w-full sm:w-50">
				<FormSelect
					control={control}
					name={`exercises.${exerciseIndex}.restTimer`}
					label="Rest Timer"
					placeholder="Off"
					data={getRestTimerOptions}
				/>
			</div>
			<Table className="mb-4 [&_td]:p-1">
				<TableHeader>
					<TableRow className="border-none hover:bg-transparent text-xs">
						<TableHead className="text-center">SET</TableHead>
						<TableHead className="text-center">KG</TableHead>
						<TableHead className="text-center">REPS</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{fields.map((field, index) => {
						const kgError = setsError?.[index]?.kg?.message;
						const repsError = setsError?.[index]?.reps?.message;
						return (
							<Controller
								key={field.id}
								control={control}
								name={`exercises.${exerciseIndex}.sets.${index}.completed`}
								render={({ field: completedField }) => (
									<TableRow
										className={`
										border-none
										odd:bg-foreground/4
										even:bg-foreground/1
										odd:hover:bg-foreground/4
										even:hover:bg-foreground/1
										${isWorkout && completedField.value && 'bg-green-600/30!'}
									`}
									>
										<TableCell className="w-12 text-center font-semibold text-primary/70">
											{index + 1}
										</TableCell>
										<TableCell>
											<div className="flex flex-col items-center gap-1">
												<Controller
													control={control}
													name={`exercises.${exerciseIndex}.sets.${index}.kg`}
													render={({ field: { onChange, value, ref } }) => (
														<Input
															ref={ref}
															value={getDisplayValue(value)}
															onChange={(e) =>
																handleChange(e.target.value, onChange, true)
															}
															className="h-11 w-14 sm:w-24 text-center"
														/>
													)}
												/>

												{kgError && (
													<span className="text-center text-xs text-destructive">
														{kgError}
													</span>
												)}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex flex-col items-center gap-1">
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
															className="h-11 w-14 sm:w-24 text-center"
														/>
													)}
												/>

												{repsError && (
													<span className="text-center text-xs text-destructive">
														{repsError}
													</span>
												)}
											</div>
										</TableCell>
										{isWorkout && (
											<TableCell align="center">
												<Checkbox
													checked={completedField.value === true}
													onCheckedChange={(value) =>
														completedField.onChange(value === true)
													}
													className="data-[state=checked]:bg-green-500! data-[state=checked]:border-green-500
													 data-[state=checked]:text-white size-5"
												/>
											</TableCell>
										)}
										<TableCell align="center">
											<Button
												variant="destructive"
												size="icon-xs"
												onClick={() => remove(index)}
											>
												<XIcon />
											</Button>
										</TableCell>
									</TableRow>
								)}
							/>
						);
					})}
				</TableBody>
			</Table>
			<Button
				variant="outline"
				className="w-full text-primary hover:text-primary mb-2"
				iconLeft={<PlusIcon />}
				onClick={() => append(createSet(fields.length + 1))}
			>
				Add set
			</Button>
			{errorsMessage && (
				<span className="text-destructive">{errorsMessage}</span>
			)}
		</div>
	);
};
