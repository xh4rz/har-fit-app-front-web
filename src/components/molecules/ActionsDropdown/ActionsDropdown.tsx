'use client';

import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DotsThreeIcon } from '@phosphor-icons/react';
import { DotsThreeVerticalIcon } from '@phosphor-icons/react/ssr';

interface ExerciseActionsDropdownProps {
	onEdit: () => void;
	onDelete: () => void;
	vertical?: boolean;
	size?: ComponentProps<typeof Button>['size'];
}

export const ActionsDropdown = ({
	onEdit,
	onDelete,
	vertical = false,
	size = 'icon-xs'
}: ExerciseActionsDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="" size={size}>
					{vertical ? (
						<DotsThreeVerticalIcon className="size-6 text-primary" />
					) : (
						<DotsThreeIcon className="size-6 text-primary" />
					)}
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-32">
				<DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" onClick={onDelete}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
