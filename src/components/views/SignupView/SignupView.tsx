'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import {
	passwordValidationRules,
	signupFormSchema
} from '@/modules/auth/validation/signupFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { FormInput } from '@/components/molecules';
import { CheckCircleIcon, SignInIcon } from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { Separator } from '@/components/ui/separator';
import { ApiError } from '@/infrastructure/interfaces';

type SignupFormData = z.infer<typeof signupFormSchema>;

export const SignupView = () => {
	const router = useRouter();

	const { register, loading } = useAuthStore();

	const {
		control,
		handleSubmit,
		setError,
		watch,
		formState: { errors }
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupFormSchema),
		mode: 'onChange',
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const password = watch('password') || '';

	const rules = passwordValidationRules.map((rule) => ({
		label: rule.label,
		valid: rule.test(password)
	}));

	const onSubmit = async (data: SignupFormData) => {
		try {
			await register(data.fullName, data.email, data.password);
			router.replace('/home');
		} catch (error) {
			const errorObj = error as ApiError;
			setFormError(setError, errorObj);
		}
	};

	return (
		<Card className="overflow-hidden p-0">
			<div className="grid md:grid-cols-2">
				<div className="relative hidden md:flex">
					<Image
						priority
						fill
						src="/images/gym-men.jpg"
						alt="gym-men"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
					<div className="relative z-10 flex flex-col justify-end p-10">
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
						<CardTitle className="text-4xl font-bold text-primary">
							HarFit<span className="text-secondary">App</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0 mb-4">
						<form id="form-login" onSubmit={handleSubmit(onSubmit)}>
							<FieldGroup>
								<FormInput
									required
									disabled={loading}
									control={control}
									name="fullName"
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
								<FormInput
									required
									disabled={loading}
									control={control}
									name="password"
									label="Password"
									placeholder="Enter your password"
									type="password"
									autoComplete="new-password webauthn"
								/>
								<FormInput
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
						<div className="my-6">
							<Separator />
						</div>
						<div className="flex flex-col">
							<span className="mb-2">Password requirements: </span>
							{rules.map((rule, index) => (
								<div
									key={index}
									className={`flex gap-1 items-center text-[13px] mb-0.5 ${
										rule.valid ? 'text-green-500' : 'text-gray-400'
									}`}
								>
									<CheckCircleIcon size={18} /> {rule.label}
								</div>
							))}
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
