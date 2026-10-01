'use client';

import type { ReactNode } from 'react';
import {
	AlertDialog as UIAlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface AlertDialogProps {
	open: boolean;
	children: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	cancelText?: string;
	acceptText?: string;
	showCancel?: boolean;
	onOpenChange: (open: boolean) => void;
	onCancel?: () => void;
	onAccept: () => void;
}

export const AlertDialog = ({
	open,
	children,
	title = '',
	description,
	cancelText = 'Cancel',
	acceptText = 'Continue',
	showCancel = true,
	onOpenChange,
	onCancel = () => {},
	onAccept
}: AlertDialogProps) => {
	return (
		<UIAlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-secondary font-semibold">
						{title}
					</AlertDialogTitle>
					{description && (
						<AlertDialogDescription>{description}</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				{children}
				<AlertDialogFooter>
					{showCancel && (
						<Button variant="outline" onClick={onCancel}>
							{cancelText}
						</Button>
					)}
					<Button variant="secondary" onClick={onAccept}>
						{acceptText}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</UIAlertDialog>
	);
};
