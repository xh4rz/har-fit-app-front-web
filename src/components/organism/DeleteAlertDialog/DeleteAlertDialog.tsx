'use client';

import { ReactNode, useRef } from 'react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogMedia
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { TrashIcon } from '@phosphor-icons/react';

interface DeleteAlertDialogProps {
	open: boolean;
	loading: boolean;
	onOpenChange: (open: boolean) => void;
	onDelete: () => void;
	title?: ReactNode;
	description?: string;
	cancelText?: string;
	deleteText?: string;
}

export const DeleteAlertDialog = ({
	open,
	loading,
	onOpenChange,
	onDelete,
	title = 'Delete item?',
	description = 'This action cannot be undone.',
	cancelText = 'Cancel',
	deleteText = 'Delete'
}: DeleteAlertDialogProps) => {
	const deleteRef = useRef<HTMLButtonElement>(null);

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent
				size="sm"
				className="min-w-md"
				onOpenAutoFocus={(e) => {
					e.preventDefault();
					deleteRef.current?.focus();
				}}
			>
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-muted text-destructive">
						<TrashIcon />
					</AlertDialogMedia>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={loading}
					>
						{cancelText}
					</Button>
					<Button
						ref={deleteRef}
						variant="destructive"
						onClick={onDelete}
						disabled={loading}
					>
						{loading ? <Spinner /> : deleteText}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
