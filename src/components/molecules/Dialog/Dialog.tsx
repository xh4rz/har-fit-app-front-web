import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog as UIDialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type DialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: ReactNode;
	idForm?: string;
	description?: string;
	saveLabel?: string;
	cancelLabel?: string;
	className?: string;
};

export const Dialog = ({
	open,
	onOpenChange,
	title,
	children,
	description,
	saveLabel = 'Save',
	cancelLabel = 'Cancel',
	className = '',
	idForm
}: DialogProps) => {
	return (
		<UIDialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn('w-full sm:min-w-lg', className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description ?? ''}</DialogDescription>
				</DialogHeader>

				{children}

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">{cancelLabel}</Button>
					</DialogClose>

					{idForm && (
						<Button type="submit" variant="secondary" form={idForm}>
							{saveLabel}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</UIDialog>
	);
};
