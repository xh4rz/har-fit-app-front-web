'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { FormInput } from '@/components/molecules';
import { loginFormSchema } from '@/modules/auth/validation/loginFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { SignInIcon } from '@phosphor-icons/react';
import { setFormError } from '@/utils';
import { ApiError } from '@/infrastructure/interfaces';
import { useRouter } from 'next/navigation';

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
		<Card className="w-full sm:max-w-md">
			<CardHeader className="flex items-center justify-center h-20">
				<CardTitle className="text-4xl font-bold text-primary">
					HarFit<span className="text-secondary">App</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
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
			<CardFooter>
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
			</CardFooter>
		</Card>
	);
};
