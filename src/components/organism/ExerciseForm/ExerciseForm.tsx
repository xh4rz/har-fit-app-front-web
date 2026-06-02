'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ExerciseFormData,
	getExerciseFormSchema
} from '@/modules/exercise/validation/exerciseFormSchema';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { getMuscles } from '@/modules/exercise/services/muscle';
import {
	postExercise,
	patchExerciseById
} from '@/modules/exercise/services/exercise';
import { FieldGroup } from '@/components/ui/field';
import {
	ExerciseInputInstructions,
	FormInput,
	FormMultipleCombobox,
	FormSelect,
	FormVideoUpload
} from '@/components/molecules';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VideoPlayer } from '@/components/atoms';
import {
	BarbellIcon,
	CaretLeftIcon,
	CaretRightIcon,
	CheckIcon,
	FloppyDiskIcon
} from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';

interface ExerciseFormProps {
	mode: 'create' | 'edit';
	onOpenChange: (open: boolean) => void;
	defaultValues?: ExerciseFormData;
	videoUrl?: string;
}

const steps = [
	{ id: 1, title: 'Basic Info' },
	{ id: 2, title: 'Instructions' },
	{ id: 3, title: 'Media' }
];

const stepFields: Record<number, (keyof ExerciseFormData)[]> = {
	0: ['title', 'equipmentId', 'primaryMuscleId', 'secondaryMuscleIds'],
	1: ['instruction'],
	2: ['file']
};

export const ExerciseForm = ({
	mode,
	onOpenChange,
	defaultValues,
	videoUrl
}: ExerciseFormProps) => {
	const { id } = useParams<{ id: string }>();

	const [removedVideo, setRemovedVideo] = useState(false);

	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,

		trigger
	} = useForm<ExerciseFormData>({
		resolver: zodResolver(getExerciseFormSchema(mode)),
		mode: 'onChange',
		defaultValues: defaultValues ?? {
			title: '',
			equipmentId: 0,
			primaryMuscleId: 0,
			secondaryMuscleIds: [],
			instruction: [],
			file: undefined
		}
	});

	const [loading, setLoading] = useState(false);

	const [step, setStep] = useState(0);

	const { data: dataEquipments, isPending: isPendingEquipments } = useQuery({
		queryKey: ['equipments'],
		queryFn: getEquipments,
		initialData: () => queryClient.getQueryData(['equipments'])
	});

	const { data: dataMuscles, isPending: isPendingMuscles } = useQuery({
		queryKey: ['muscles'],
		queryFn: getMuscles,
		initialData: () => queryClient.getQueryData(['muscles'])
	});

	const onSubmitExercise = async (data: ExerciseFormData) => {
		setLoading(true);

		try {
			const formData = new FormData();

			formData.append('title', data.title);
			formData.append('equipmentId', String(data.equipmentId));
			formData.append('primaryMuscleId', String(data.primaryMuscleId));

			if (data.secondaryMuscleIds) {
				formData.append(
					'secondaryMuscleIds',
					JSON.stringify(data.secondaryMuscleIds)
				);
			}

			const instructions = data.instruction.map((i) => i.text);
			formData.append('instruction', JSON.stringify(instructions));

			if (data.file) {
				formData.append('file', data.file);
			}

			if (mode === 'create') {
				await postExercise(formData);
				await queryClient.invalidateQueries({
					queryKey: ['exercises']
				});
			} else {
				await patchExerciseById(id, formData);
				await queryClient.invalidateQueries({
					queryKey: ['exercise', id]
				});
				await queryClient.invalidateQueries({
					queryKey: ['exercises']
				});
			}

			onOpenChange(false);
		} catch (error) {
			const errorObj = error as ApiError;
			setFormError(setError, errorObj);
		} finally {
			setLoading(false);
		}
	};

	const isLastStep = step === steps.length - 1;

	const prevStep = () => setStep((prev) => prev - 1);

	const nextStep = async () => {
		const isValid = await trigger(stepFields[step], {
			shouldFocus: true
		});

		if (!isValid) return;

		if (isLastStep) {
			handleSubmit(onSubmitExercise)();
			return;
		}

		setStep((prev) => prev + 1);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row justify-between ">
				{steps.map((i, index) => {
					const isActive = index === step;
					const isCompleted = index < step;
					const isClickable = (isCompleted || isActive) && !loading;
					return (
						<Item
							key={i.id}
							onClick={() => {
								if (isClickable) setStep(index);
							}}
							className={`flex flex-col items-center justify-center  ${isClickable ? 'cursor-pointer hover:bg-muted' : 'opacity-40 cursor-not-allowed'}`}
						>
							<ItemMedia className="w-full">
								<Avatar
									className={`size-11 flex items-center justify-center border-2 ${
										isActive
											? 'border-primary text-primary'
											: isCompleted
												? 'border-primary/80 text-primary/80'
												: 'border-muted text-muted-foreground'
									}`}
								>
									{isCompleted ? (
										<CheckIcon className="size-5" />
									) : (
										<BarbellIcon className="size-5" />
									)}
								</Avatar>
							</ItemMedia>
							<ItemContent
								className={`flex items-center ${
									isActive
										? 'text-secondary'
										: isCompleted
											? 'text-secondary/80'
											: 'text-muted-foreground'
								}`}
							>
								<ItemTitle>{i.title}</ItemTitle>
							</ItemContent>
						</Item>
					);
				})}
			</div>

			<Separator />

			<FieldGroup>
				{step === 0 ? (
					<>
						<FormInput
							required
							disabled={loading}
							control={control}
							name="title"
							label="Title"
							placeholder="Enter Exercise Title"
							type="text"
						/>

						<FormSelect
							required
							disabled={loading}
							control={control}
							name="equipmentId"
							label="Equipment"
							placeholder="Select Equipment"
							loading={isPendingEquipments}
							data={dataEquipments?.slice(1)}
						/>

						<FormSelect
							required
							disabled={loading}
							control={control}
							name="primaryMuscleId"
							label="Primary Muscle"
							placeholder="Select Primary Muscle"
							loading={isPendingMuscles}
							data={dataMuscles?.slice(1)}
						/>

						<FormMultipleCombobox
							disabled={loading}
							control={control}
							name="secondaryMuscleIds"
							label="Secondary Muscles"
							placeholder="Search Other Muscles"
							loading={isPendingMuscles}
							data={dataMuscles?.slice(1)}
						/>
					</>
				) : step === 1 ? (
					<ExerciseInputInstructions
						control={control}
						error={errors.instruction}
					/>
				) : (
					<div>
						{mode === 'edit' && videoUrl && !removedVideo && (
							<div className="flex flex-col gap-2">
								<VideoPlayer url={videoUrl} />
								<Button
									type="button"
									variant="outline"
									onClick={() => setRemovedVideo(true)}
								>
									Change Video
								</Button>
							</div>
						)}

						{(mode === 'create' || removedVideo) && (
							<FormVideoUpload
								required={mode === 'create'}
								disabled={loading}
								control={control}
								name="file"
								label="Upload exercise video"
							/>
						)}
					</div>
				)}
			</FieldGroup>

			{errors.root && <p className="text-destructive">{errors.root.message}</p>}

			<Separator />

			<div className="flex justify-between">
				<Button
					type="button"
					variant="secondary"
					onClick={prevStep}
					disabled={step <= 0 || loading}
					iconLeft={<CaretLeftIcon />}
				>
					Previous
				</Button>
				<Button
					type="button"
					variant="secondary"
					onClick={nextStep}
					disabled={loading}
					loading={loading}
					iconRight={isLastStep ? <FloppyDiskIcon /> : <CaretRightIcon />}
				>
					{isLastStep ? (mode === 'create' ? 'Save' : 'Update') : 'Next'}
				</Button>
			</div>
		</div>
	);
};
