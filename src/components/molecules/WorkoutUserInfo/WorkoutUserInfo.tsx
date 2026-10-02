import { UserAvatar } from '../UserAvatar';
import { formatDateTime } from '@/utils';

interface WorkoutUserInfoProps {
	imageUrl?: string | null;
	fullname: string;
	username: string;
	createdAt: Date;
}

export const WorkoutUserInfo = ({
	imageUrl,
	fullname,
	username,
	createdAt
}: WorkoutUserInfoProps) => {
	return (
		<div className="flex items-center gap-4">
			<UserAvatar src={imageUrl} name={fullname} className="size-12 shrink-0" />
			<div className="min-w-0">
				<p className="truncate font-medium">{username}</p>
				<p className="text-xs text-muted-foreground">
					{formatDateTime(createdAt)}
				</p>
			</div>
		</div>
	);
};
