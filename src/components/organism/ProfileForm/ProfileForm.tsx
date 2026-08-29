'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	imageSchema,
	ProfileFormData,
	profileFormSchema
} from '@/modules/user/validation/profileFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import {
	deleteUserImage,
	patchUserById,
	patchUserImage
} from '@/modules/user/service';
import {
	FormInput,
	FormSelect,
	FormTextarea,
	UserAvatar,
	FormDatePicker
} from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { ImageEditor } from '../ImageEditor';
import { parse } from 'date-fns';
import { formatDate, setFormError } from '@/utils';
import { FloppyDiskIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { ApiError } from '@/infrastructure/interfaces';

const genderSelectData: { id: number; name: string }[] = [
	{ id: 1, name: 'Male' },
	{ id: 2, name: 'Female' },
	{ id: 3, name: 'Other' }
];

export const ProfileForm = () => {
	const { user, setUser } = useAuthStore((state) => state);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [editorOpen, setEditorOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const hasSavedImage = !!user?.imageUrl;

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
		reset
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileFormSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			fullname: '',
			email: '',
			description: undefined,
			gender: undefined,
			birthDate: undefined
		}
	});

	const onSaveProfile = async (data: ProfileFormData) => {
		setLoading(true);

		if (!user) return;

		const dataUser = {
			...data,
			birthDate: data.birthDate ? formatDate(data.birthDate) : null
		};

		try {
			const updatedUser = await patchUserById(user?.id, dataUser);
			setUser(updatedUser);
		} catch (error) {
			const errorObj = error as ApiError;
			setFormError(setError, errorObj);
		} finally {
			setLoading(false);
		}
	};

	const handleEditorOpenChange = (open: boolean) => {
		setEditorOpen(open);
		if (!open) {
			setSelectedImage(null);
		}
	};

	const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		const result = imageSchema.safeParse(file);

		if (!result.success) {
			setImageError(result.error.issues[0].message);
			event.target.value = '';
			return;
		}

		setImageError(null);
		const imageUrl = URL.createObjectURL(file);
		setSelectedImage(imageUrl);
		setEditorOpen(true);
		event.target.value = '';
	};

	const handleOpenImageEditor = () => {
		const image = selectedImage ?? user?.imageUrl;
		if (image) {
			setSelectedImage(image);
			setEditorOpen(true);
			return;
		}
		handleReplaceImage();
		setImageError(null);
	};

	const handleReplaceImage = () => {
		setEditorOpen(false);
		fileInputRef.current?.click();
	};

	const handleSaveImage = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			const updatedUser = await patchUserImage(formData);
			const newImageUrl = updatedUser.imageUrl!;
			setUser({
				...user!,
				imageUrl: newImageUrl
			});
			setSelectedImage(null);
			setEditorOpen(false);
		} catch (error) {
			console.error('Error saving image', error);
		}
	};

	const handleDeleteImage = async () => {
		try {
			await deleteUserImage();
			setUser({
				...user!,
				imageUrl: null
			});
			setSelectedImage(null);
			setEditorOpen(false);
		} catch (error) {
			console.error('Error deleting user image', error);
		}
	};

	useEffect(() => {
		if (!user) return;

		reset({
			username: user.username ?? '',
			fullname: user.fullname ?? '',
			email: user.email ?? '',
			description: user.description ?? undefined,
			gender: user.gender ?? undefined,
			birthDate: user.birthDate
				? parse(user.birthDate, 'yyyy-MM-dd', new Date())
				: undefined
		});
	}, [user]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 items-center">
				<h2 className="text-2xl font-semibold flex-1">Profile</h2>
				<Button
					size="lg"
					disabled={loading}
					variant="secondary"
					iconLeft={<FloppyDiskIcon />}
					onClick={handleSubmit(onSaveProfile)}
				>
					Save Profile
				</Button>
			</div>
			<div>
				<div className="flex items-center gap-4">
					<UserAvatar
						src={user?.imageUrl ?? ''}
						name={user?.fullname}
						className="w-25 h-25"
					/>

					<input
						ref={fileInputRef}
						type="file"
						accept="image/jpeg,image/png,image/webp"
						className="hidden"
						onChange={handleImageSelected}
					/>

					<Button
						size="sm"
						variant="outline"
						iconLeft={<PencilSimpleIcon />}
						onClick={handleOpenImageEditor}
					>
						Edit Image
					</Button>
				</div>

				<div className="mt-2">
					{imageError && (
						<p className="text-sm text-destructive">{imageError}</p>
					)}

					{errors.root && (
						<p className="text-sm text-destructive ">{errors.root.message}</p>
					)}
				</div>

				{selectedImage && (
					<ImageEditor
						open={editorOpen}
						image={selectedImage}
						hasSavedImage={hasSavedImage}
						onOpenChange={handleEditorOpenChange}
						onSave={handleSaveImage}
						onDelete={handleDeleteImage}
						onReplace={handleReplaceImage}
					/>
				)}
			</div>

			<div>
				<FieldGroup>
					<FormInput
						required
						disabled={loading}
						control={control}
						name="username"
						label="Username"
						placeholder="Enter Username"
						type="text"
						autoComplete="username"
					/>
					<FormInput
						required
						disabled={loading}
						control={control}
						name="fullname"
						label="Full Name"
						placeholder="Enter Full Name"
						type="text"
						autoComplete="name"
					/>
					<FormInput
						required
						disabled={loading}
						control={control}
						name="email"
						label="Email"
						placeholder="Enter Email"
						type="email"
						autoComplete="email"
					/>
					<div className="flex gap-2">
						<FormSelect
							disabled={loading}
							control={control}
							name="gender"
							label="Gender"
							placeholder="Select Gender"
							loading={false}
							data={genderSelectData}
						/>
						<FormDatePicker
							disabled={loading}
							control={control}
							name="birthDate"
							label="Birth Date"
						/>
					</div>
					<FormTextarea
						disabled={loading}
						control={control}
						name="description"
						label="Description"
						placeholder="Enter Description..."
						className="resize-none min-h-20"
					/>
				</FieldGroup>
			</div>
		</div>
	);
};
