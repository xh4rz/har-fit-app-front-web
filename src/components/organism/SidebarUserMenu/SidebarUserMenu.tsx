import Link from 'next/link';
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
	SignOutIcon
} from '@phosphor-icons/react/ssr';
import { User } from '@/infrastructure/interfaces';
import { UserAvatar } from '@/components/molecules';

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
								<UserAvatar src={user?.imageUrl || ''} name={user?.fullname} />
								{open && (
									<>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate">{user?.fullname}</span>
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
								<Link href="/settings/profile" passHref>
									<DropdownMenuItem>
										<GearIcon />
										Settings
									</DropdownMenuItem>
								</Link>
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
