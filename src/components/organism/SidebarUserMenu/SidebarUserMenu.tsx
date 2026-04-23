'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton
} from '@/components/ui/sidebar';
import {
	DotsThreeVerticalIcon,
	GearIcon,
	SignOutIcon,
	UserCircleDashedIcon
} from '@phosphor-icons/react';
import { getInitials } from '@/utils';
import { User } from '@/infrastructure/interfaces';

interface SidebarUserMenuProps {
	loading: boolean;
	open: boolean;
	isMobile: boolean;
	onLogout: () => void;
	user: User | null;
}

export const SidebarUserMenu = ({
	loading,
	open,
	isMobile,
	user,
	onLogout
}: SidebarUserMenuProps) => {
	return (
		<SidebarMenu>
			{loading ? (
				<SidebarMenuItem className="mb-1">
					<SidebarMenuSkeleton skeletonClassName="h-8" showIcon />
				</SidebarMenuItem>
			) : (
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src="https://avatars.githubusercontent.com/u/70307905?v=4&size=64"
										alt={user?.fullName ?? 'avatar image'}
									/>
									<AvatarFallback className="rounded-full">
										{getInitials(user?.fullName ?? '')}
									</AvatarFallback>
								</Avatar>

								{open && (
									<>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate">{user?.fullName}</span>
											<span className="truncate text-xs text-muted-foreground">
												{user?.email}
											</span>
										</div>
										<DotsThreeVerticalIcon size={24} />
									</>
								)}
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? 'bottom' : 'right'}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<UserCircleDashedIcon />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<GearIcon />
									Settings
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem variant="destructive" onClick={onLogout}>
								<SignOutIcon />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			)}
		</SidebarMenu>
	);
};
