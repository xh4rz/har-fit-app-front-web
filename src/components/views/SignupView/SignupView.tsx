'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import {
	passwordRequirements,
	passwordStrengthColor,
	passwordStrengthText,
	signupFormSchema
} from '@/modules/auth/validation/signupFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { AppLogo } from '@/components/atoms';
import { FormInput, FormInputPassword } from '@/components/molecules';
import { CheckIcon, SignInIcon, XIcon } from '@phosphor-icons/react';
import { ApiError } from '@/infrastructure/interfaces';
import { setFormError } from '@/utils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SignupFormData = z.infer<typeof signupFormSchema>;

export const SignupView = () => {
	const router = useRouter();

	const { register, loading } = useAuthStore();

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupFormSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			fullname: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const password = useWatch({
		control,
		name: 'password',
		defaultValue: ''
	});

	const passwordChecks = passwordRequirements.map((i) => ({
		isValid: i.regex.test(password),
		description: i.text
	}));

	const passwordStrengthScore = useMemo(() => {
		return passwordChecks.filter((i) => i.isValid).length;
	}, [passwordChecks]);

	const onSubmit = async (data: SignupFormData) => {
		try {
			const registerData = await register(data);
			router.replace('/home');
			toast.success(
				`Hi, ${registerData.user.fullname}, account created successfully.`,
				{
					duration: 5000
				}
			);
		} catch (error) {
			const errorObj = error as ApiError;
			setFormError(setError, errorObj);
		}
	};

	return (
		<Card className="overflow-hidden p-0">
			<div className="grid md:grid-cols-2">
				<div className="relative hidden md:flex h-full">
					<Image
						fill
						preload
						src="/images/gym-men.jpg"
						alt="gym-men"
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
					<div className="absolute inset-0 z-10 flex flex-col justify-end p-10">
						<h2 className="text-3xl font-bold text-white">
							Your Transformation Starts Here
						</h2>

						<p className="mt-2 text-muted-foreground">
							Create your account today and begin tracking workouts, building
							consistency, and reaching your fitness goals.
						</p>
					</div>
				</div>
				<div className="flex flex-col p-4">
					<CardHeader className="flex items-center justify-center h-20">
						<CardTitle>
							<AppLogo />
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0 mb-4">
						<form id="form-login" onSubmit={handleSubmit(onSubmit)}>
							<FieldGroup>
								<FormInput
									required
									autoFocus
									disabled={loading}
									control={control}
									name="username"
									label="Username"
									placeholder="Enter your Username"
									type="text"
									autoComplete="username webauthn"
								/>
								<FormInput
									required
									disabled={loading}
									control={control}
									name="fullname"
									label="Full Name"
									placeholder="Enter your Full Name"
									type="text"
									autoComplete="name webauthn"
								/>
								<FormInput
									required
									disabled={loading}
									control={control}
									name="email"
									label="Email"
									placeholder="Enter your email"
									type="email"
									autoComplete="email webauthn"
								/>

								<FormInputPassword
									required
									disabled={loading}
									control={control}
									name="password"
									label="Password"
									placeholder="Enter your password"
									type="password"
									autoComplete="new-password webauthn"
								/>

								<FormInputPassword
									required
									disabled={loading}
									control={control}
									name="confirmPassword"
									label="Repeat Password"
									placeholder="Repeat your password"
									type="password"
									autoComplete="new-password webauthn"
								/>
							</FieldGroup>
						</form>
						<div className="w-full max-w-xs space-y-2 mt-6">
							<div className="mb-4 flex h-1 w-full gap-1">
								{Array.from({ length: 5 }).map((_, index) => (
									<span
										key={index}
										className={cn(
											'h-full flex-1 rounded-full transition-all duration-500 ease-out',
											index < passwordStrengthScore
												? passwordStrengthColor(passwordStrengthScore)
												: 'bg-border'
										)}
									/>
								))}
							</div>
							<p className="text-foreground text-sm font-medium">
								{passwordStrengthText(passwordStrengthScore)}. Must contain:
							</p>
							<ul className="mb-4 space-y-1.5">
								{passwordChecks.map((i, index) => (
									<li key={index} className="flex items-center gap-2">
										{i.isValid ? (
											<CheckIcon className="size-4 text-green-600 dark:text-green-400" />
										) : (
											<XIcon className="text-muted-foreground size-4" />
										)}
										<span
											className={cn(
												'text-xs',
												i.isValid
													? 'text-green-600 dark:text-green-400'
													: 'text-muted-foreground'
											)}
										>
											{i.description}
										</span>
									</li>
								))}
							</ul>
						</div>
						{errors.root && (
							<div className="mt-5">
								<span className="text-destructive">{errors.root.message}</span>
							</div>
						)}
					</CardContent>
					<Field orientation="vertical">
						<Button
							type="submit"
							form="form-login"
							variant="secondary"
							loading={loading}
							iconLeft={<SignInIcon />}
						>
							Register
						</Button>
						<div className="flex justify-center">
							<span>
								Already have an account?{' '}
								<Button variant="link" className="px-0" disabled={loading}>
									<Link href="/login">Login</Link>
								</Button>
							</span>
						</div>
					</Field>
				</div>
			</div>
		</Card>
	);
};
