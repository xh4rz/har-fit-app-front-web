'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { loginFormSchema } from '@/modules/auth/validation/loginFormSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { FormInput } from '@/components/molecules';
import { SignInIcon } from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';
import { AppLogo } from '@/components/atoms';

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginView = () => {
	const router = useRouter();

	const { login, loading } = useAuthStore();

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.email, data.password);
			router.replace('/home');
		} catch (error) {
			const errorObj = error as ApiError;
			if (errorObj.statusCode === 401) {
				setError('root', {
					type: 'custom',
					message: 'Invalid credentials'
				});

				return;
			}
			setFormError(setError, errorObj);
		}
	};

	return (
		<Card className="overflow-hidden p-0">
			<div className="grid md:grid-cols-2">
				<div className="flex flex-col p-4">
					<CardHeader className="flex items-center justify-center h-28">
						<CardTitle className="text-4xl font-bold text-primary">
							<AppLogo />
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0 mb-4">
						<form id="form-login" onSubmit={handleSubmit(onSubmit)}>
							<FieldGroup>
								<FormInput
									required
									disabled={loading}
									control={control}
									name="email"
									label="Email"
									placeholder="Enter your Email"
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
							</FieldGroup>
						</form>
						<div className="flex justify-end">
							<Button variant="link" className="px-0" disabled>
								Forgot your Password?
							</Button>
						</div>
						{errors.root && (
							<span className="text-destructive ">{errors.root.message}</span>
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
							Login
						</Button>
						<div className="flex justify-center">
							<span>
								Don&apos;t have an account?{' '}
								<Button variant="link" className="px-0" disabled={loading}>
									<Link href="/signup">Sign Up</Link>
								</Button>
							</span>
						</div>
					</Field>
				</div>
				<div className="relative hidden md:flex">
					<Image
						fill
						preload
						src="/images/gym-weights.avif"
						alt="gym-weights"
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
					<div className="absolute inset-0 z-10 flex flex-col justify-end p-10">
						<h2 className="text-3xl font-bold text-white">
							The Change Is Today
						</h2>
						<p className="mt-2 text-muted-foreground">
							Track your workouts, monitor your progress and achieve your
							fitness goals.
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};
