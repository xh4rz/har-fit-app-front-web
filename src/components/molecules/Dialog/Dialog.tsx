import type { ReactNode } from 'react';
import {
	Dialog as UIDialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type DialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: ReactNode;
	description?: string;
	className?: string;
	// footer?: boolean;
	// idForm?: string;
	// saveLabel?: string;
	// cancelLabel?: string;
};

export const Dialog = ({
	open,
	onOpenChange,
	title,
	children,
	description,
	className = ''
	// footer,
	// idForm,
	// saveLabel = 'Save',
	// cancelLabel = 'Cancel',
}: DialogProps) => {
	return (
		<UIDialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn('w-full sm:min-w-lg', className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description ?? ''}</DialogDescription>
				</DialogHeader>

				{children}

				{/* {footer && (
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
				)} */}
			</DialogContent>
		</UIDialog>
	);
};
