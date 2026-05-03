'use client';

import {
	useFieldArray,
	Control,
	Controller,
	FieldErrors
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, XIcon } from '@phosphor-icons/react';
import { ExerciseFormData } from '@/modules/exercise/validation/exerciseFormSchema';

interface ExerciseInstructionsProps {
	control: Control<ExerciseFormData>;
	error: FieldErrors<ExerciseFormData>['instruction'];
}

export const ExerciseInputInstructions = ({
	control,
	error
}: ExerciseInstructionsProps) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'instruction'
	});

	const errorsMessage = error?.message || error?.root?.message;

	return (
		<div className="flex flex-col gap-4 max-h-[30vh] scrollbar-custom pr-2">
			<div className="flex flex-row justify-between gap-2">
				<span>
					Instructions <span className="text-secondary">*</span>
				</span>
				<Button
					type="button"
					size="sm"
					iconLeft={<PlusIcon className="text-primary" />}
					className="py-0.5 px-2 bg-transparent text-primary border-primary"
					onClick={() => append({ text: '' })}
				>
					Add instruction
				</Button>
			</div>

			{fields.map((field, index) => {
				const errorMessage = error?.[index]?.text?.message;
				return (
					<div key={field.id} className="flex flex-col gap-2 mb-1">
						<div className="flex flex-row gap-2 items-center w-full">
							<span className="font-semibold w-6 text-center">
								{index + 1}.
							</span>
							<Controller
								control={control}
								name={`instruction.${index}.text`}
								render={({ field: { onChange, value, ref }, fieldState }) => (
									<Textarea
										aria-invalid={fieldState.invalid}
										ref={(r) => {
											ref(r);
										}}
										value={value}
										onChange={onChange}
										placeholder="Write instruction..."
										className="resize-none min-h-0 "
									/>
								)}
							/>

							<Button
								variant="destructive"
								size="icon-xs"
								onClick={() => remove(index)}
							>
								<XIcon />
							</Button>
						</div>
						{errorMessage && (
							<span className="text-destructive text-xs ml-2">
								{errorMessage}
							</span>
						)}
					</div>
				);
			})}
			{errorsMessage && (
				<span className="text-destructive mt-2">{errorsMessage}</span>
			)}
		</div>
	);
};
