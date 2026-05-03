'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ExerciseFormData,
	exerciseFormSchema
} from '@/modules/exercise/validation/exerciseFormSchema';
// import { Button, Input, Separator, Text } from '@/components/atoms';
// import {
// 	ExerciseInputInstructions,
// 	ExerciseVideoUpload,
// 	SelectField
// } from '@/components/molecules';
// import { BottomSheetSelectList } from '../BottomSheetSelectList';
// import { BottomSheetVideoOptions } from '../BottomSheetVideoOptions';
import { getEquipments } from '@/modules/exercise/services/equipment';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMuscles } from '@/modules/exercise/services/muscle';
// import { usePickVideo } from '@/hooks';
import {
	postExercise,
	patchExerciseById
} from '@/modules/exercise/services/exercise';
import { setFormError } from '@/utils';
import { useRouter } from 'next/navigation';
import { FieldGroup } from '@/components/ui/field';
import {
	ExerciseInputInstructions,
	FormInput,
	FormMultipleCombobox,
	FormSelect
} from '@/components/molecules';

interface ExerciseFormProps {
	mode: 'create' | 'edit';
	defaultValues?: ExerciseFormData;
	idForm: string;
}

const emptyFile = {
	uri: '',
	fileName: '',
	mimeType: '',
	width: 0,
	height: 0
};

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
		setError,
		clearErrors,
		setValue,
		watch,
		formState: { errors },
		setFocus
	} = useForm<ExerciseFormData>({
		resolver: zodResolver(exerciseFormSchema),
		mode: 'onChange',
		defaultValues: defaultValues ?? {
			title: '',
			equipmentId: 0,
			primaryMuscleId: 0,
			secondaryMuscleIds: [],
			instruction: [],
			file: emptyFile
		}
	});

	const [loading, setLoading] = useState(false);

	const [showModalOptionsVideo, setShowModalOptionsVideo] = useState(false);

	const [showModalEquipment, setShowModalEquipment] = useState(false);

	const [showModalPrimaryMuscle, setShowModalPrimaryMuscle] = useState(false);

	const [showModalSecondaryMuscle, setShowModalSecondaryMuscle] =
		useState(false);

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

	const { file, equipmentId, primaryMuscleId, secondaryMuscleIds } = watch();

	const equipmentText =
		dataEquipments?.find((i) => i.id === equipmentId)?.name || 'Select';

	const primaryMuscleText =
		dataMuscles?.find((i) => i.id === primaryMuscleId)?.name || 'Select';

	const secondaryMuscleText =
		dataMuscles
			?.filter((i) => secondaryMuscleIds?.includes(i.id))
			.map((i) => i.name)
			.join(', ') || 'Select';

	const handleChangeSelectSingle =
		(field: 'equipmentId' | 'primaryMuscleId') => (ids: number[]) => {
			setValue(field, ids[0] ?? 0);
			clearErrors(field);
		};

	const handleChangeSelectMultiple =
		(field: 'secondaryMuscleIds') => (ids: number[]) => {
			setValue(field, ids);
			clearErrors(field);
		};

	const equipmentError = errors.equipmentId?.message;

	const primaryMuscleError = errors.primaryMuscleId?.message;

	// const { loadingVideo, selectVideo, captureVideo, removeVideo } = usePickVideo(
	// 	(video) => {
	// 		setValue(
	// 			'file',
	// 			{
	// 				uri: video.uri,
	// 				fileName: video.fileName ?? 'video.mp4',
	// 				mimeType: video.mimeType ?? 'video/mp4',
	// 				width: video.width,
	// 				height: video.height,
	// 				fileSize: video.fileSize
	// 			},
	// 			{ shouldValidate: true }
	// 		);
	// 		clearErrors('file');
	// 	},
	// 	() => {
	// 		setValue('file', emptyFile, { shouldValidate: true });
	// 		clearErrors('file');
	// 	}
	// );

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

			const hasVideoChanged =
				data.file?.uri && data.file.uri !== defaultValues?.file?.uri;

			if (hasVideoChanged) {
				formData.append('file', {
					uri: data.file.uri,
					name: data.file.fileName,
					type: data.file.mimeType
				} as any);
			}

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
			// setFormError(setError, error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form id={idForm} onSubmit={handleSubmit(onSubmitExercise)}>
			<FieldGroup>
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
