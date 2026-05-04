'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ExerciseFormData,
	exerciseFormSchema
} from '@/modules/exercise/validation/exerciseFormSchema';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { getMuscles } from '@/modules/exercise/services/muscle';

import {
	postExercise
	// patchExerciseById
} from '@/modules/exercise/services/exercise';
import { FieldGroup } from '@/components/ui/field';
import {
	ExerciseInputInstructions,
	FormInput,
	FormMultipleCombobox,
	FormSelect,
	FormVideoUpload
} from '@/components/molecules';
import { setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';

interface ExerciseFormProps {
	mode: 'create' | 'edit';
	defaultValues?: ExerciseFormData;
	idForm: string;
}

export const ExerciseForm = ({
	defaultValues,
	mode,
	idForm
}: ExerciseFormProps) => {
	// const { id } = useLocalSearchParams<{ id: string }>();

	// const exerciseId = id as string | undefined;

	const router = useRouter();

	// const navigation = useNavigation();

	const queryClient = useQueryClient();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<ExerciseFormData>({
		resolver: zodResolver(exerciseFormSchema),
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

			// const hasVideoChanged =
			// 	data.file?.uri && data.file.uri !== defaultValues?.file?.uri;

			formData.append('file', data.file);

			if (mode === 'create') {
				await postExercise(formData);
				await queryClient.invalidateQueries({
					queryKey: ['exercises']
				});
			} else {
				// if (!exerciseId) {
				// 	setError('root', { message: 'Invalid exercise id' });
				// 	return;
				// }
				// await patchExerciseById(exerciseId, formData);
				// await queryClient.invalidateQueries({
				// 	queryKey: ['exercise', exerciseId]
				// });
				// await queryClient.invalidateQueries({
				// 	queryKey: ['exercises']
				// });
			}

			router.back();
		} catch (error) {
			const errorObj = error as ApiError;
			setFormError(setError, errorObj);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form id={idForm} onSubmit={handleSubmit(onSubmitExercise)}>
			<FieldGroup>
				<FormVideoUpload
					required
					disabled={loading}
					control={control}
					name="file"
					label="Upload exercise video"
				/>

				<FormInput
					required
					disabled={loading}
					control={control}
					name="title"
					label="Title"
					placeholder="Enter Exercise Title"
					type="text"
					autoComplete="name webauthn"
				/>
				<FormSelect
					required
					disabled={loading}
					control={control}
					name="equipmentId"
					label="Equipment"
					placeholder="Select Equipment"
					loading={isPendingEquipments}
					data={dataEquipments}
				/>

				<FormSelect
					required
					disabled={loading}
					control={control}
					name="primaryMuscleId"
					label="Primary Muscle"
					placeholder="Select Primary Muscle"
					loading={isPendingMuscles}
					data={dataMuscles}
				/>

				<FormMultipleCombobox
					disabled={loading}
					control={control}
					name="secondaryMuscleIds"
					label="Secondary Muscles"
					placeholder="Search Other Muscles"
					loading={isPendingMuscles}
					data={dataMuscles}
				/>

				<ExerciseInputInstructions
					control={control}
					error={errors.instruction}
				/>
			</FieldGroup>
		</form>
	);
};
