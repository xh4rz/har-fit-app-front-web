import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DotsThreeVerticalIcon } from '@phosphor-icons/react';

interface ExerciseActionsDropdownProps {
	onEdit: () => void;
	onDelete: () => void;
}

export const ExerciseActionsDropdown = ({
	onEdit,
	onDelete
}: ExerciseActionsDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex size-8  text-foreground data-[state=open]:bg-muted"
					size="icon"
				>
					<DotsThreeVerticalIcon className="size-6" />
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
