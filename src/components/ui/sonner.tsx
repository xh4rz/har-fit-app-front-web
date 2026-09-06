'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
	CheckCircleIcon,
	InfoIcon,
	WarningIcon,
	XCircleIcon,
	SpinnerIcon
} from '@phosphor-icons/react';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			position="bottom-right"
			icons={{
				success: <CheckCircleIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <WarningIcon className="size-4" />,
				error: <XCircleIcon className="size-4" />,
				loading: <SpinnerIcon className="size-4 animate-spin" />
			}}
			toastOptions={{
				classNames: {
					toast: '!text-foreground !border',
					success: '!bg-secondary',
					info: '!bg-blue-500',
					warning: '!bg-primary',
					error: '!bg-destructive',
					loading: '!bg-secondary '
				}
			}}
			duration={4000}
			{...props}
		/>
	);
};

export { Toaster };
