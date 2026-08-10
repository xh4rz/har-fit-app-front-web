'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ProfileFormData,
	profileFormSchema
} from '@/modules/user/validation/profileFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

import {
	FormInput,
	FormSelect,
	FormTextarea,
	UserAvatar
} from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { FloppyDiskIcon } from '@phosphor-icons/react';

// const userData: ProfileFormData = {
// 	username: user?.username ?? '',
// 	fullname: user?.fullname ?? '',
// 	email: user?.email ?? '',
// 	file: undefined,
// 	description: user?.description ?? undefined,
// 	gender: user?.gender ?? undefined,
// 	birthDate: user?.birthDate ? new Date(user.birthDate) : undefined
// };

const genderSelectData: { id: number; name: string }[] = [
	{ id: 1, name: 'Male' },
	{ id: 2, name: 'Female' },
	{ id: 3, name: 'Other' }
];

export const ProfileForm = () => {
	const { user, loading } = useAuthStore((state) => state);

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
			file: undefined,
			description: undefined,
			gender: undefined,
			birthDate: undefined
		}
	});

	// if (!user?.imageUrl) {
	// 	return (
	// 		<Card className="p-4 h-full flex flex-col gap-4">
	// 			<Skeleton className="flex-1 w-full" />
	// 		</Card>
	// 	);
	// }

	const onSaveProfile = (data: ProfileFormData) => {
		console.log(data);
		// saveRoutine(data);
	};

	useEffect(() => {
		if (!user) return;

		reset({
			username: user.username ?? '',
			fullname: user.fullname ?? '',
			email: user.email ?? '',
			file: undefined,
			description: user.description ?? undefined,
			gender: user.gender ?? undefined,
			birthDate: user.birthDate ? new Date(user.birthDate) : undefined
		});
	}, [user]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 items-center">
				<h2 className="text-2xl font-semibold flex-1">Profile</h2>
				<Button
					size="lg"
					loading={loading}
					variant="secondary"
					iconLeft={<FloppyDiskIcon />}
					onClick={handleSubmit(onSaveProfile)}
				>
					Update Profile
				</Button>
			</div>
			<div>
				<UserAvatar
					src={user?.imageUrl || ''}
					name={user?.fullname}
					className="w-25 h-25"
				/>
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
					<FormTextarea
						disabled={loading}
						control={control}
						name="description"
						label="Description"
						placeholder="Enter Description..."
						className="resize-none min-h-20"
					/>
					<FormSelect
						disabled={loading}
						control={control}
						name="gender"
						label="Gender"
						placeholder="Select Equipment"
						loading={false}
						data={genderSelectData}
					/>
				</FieldGroup>
			</div>
		</div>
	);
};
