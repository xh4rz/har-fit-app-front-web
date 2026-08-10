import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';
import { getInitials } from '@/utils';

interface UserAvatarProps {
	src: string;
	name?: string;
	className?: string;
}

export const UserAvatar = ({ src, name, className = '' }: UserAvatarProps) => {
	return (
		<Avatar className={cn('h-8 w-8 rounded-lg', className)}>
			<AvatarImage src={src} alt={name ?? 'user image'} />
			<AvatarFallback className="rounded-full">
				{getInitials(name ?? '')}
			</AvatarFallback>
		</Avatar>
	);
};
