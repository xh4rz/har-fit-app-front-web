'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from '@/components/ui/sidebar';
import {
	BarbellIcon,
	DotsThreeVerticalIcon,
	GearIcon,
	HouseIcon,
	SignOutIcon,
	UserCircleDashedIcon,
	UserIcon
} from '@phosphor-icons/react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const menuItems = [
	{
		name: 'Home',
		url: '/home',
		icon: HouseIcon
	},
	{
		name: 'Exercise',
		url: '/exercise',
		icon: BarbellIcon
	},
	{
		name: 'Routine',
		url: '/routine',
		icon: BarbellIcon
	},

	{
		name: 'Profile',
		url: '/profile',
		icon: UserIcon
	}
];

export const AppSidebar = () => {
	const router = useRouter();
	const pathname = usePathname();

	const { user, logout } = useAuthStore();

	const { open } = useSidebar();

	const handleLogout = async () => {
		await logout();
		router.replace('/login');
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="flex items-center justify-center h-10">
					{!open && (
						<div className="rounded-lg bg-sidebar-accent">
							<Image
								src="/logo/icon-har-fit-orange.png"
								alt="logo"
								width={40}
								height={40}
							/>
						</div>
					)}

					{open && (
						<div className="text-primary font-bold text-2xl w-full text-center">
							HarFit<span className="text-secondary">App</span>
						</div>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{menuItems.map((item) => {
							const isActive = pathname === item.url;

							return (
								<SidebarMenuItem key={item.name} className="my-1">
									<SidebarMenuButton asChild isActive={isActive}>
										<Link href={item.url}>
											<item.icon
												size={24}
												className={
													isActive ? 'text-secondary' : 'text-foreground'
												}
											/>
											{open && (
												<span
													className={
														isActive ? 'text-secondary' : 'text-foreground'
													}
												>
													{item.name}
												</span>
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<UserIcon size={24} />
									{open && (
										<>
											<span className="flex-1">{user?.fullName}</span>
											<DotsThreeVerticalIcon size={24} />
										</>
									)}
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="right" align="end" className="w-48">
								<DropdownMenuItem>
									<UserCircleDashedIcon />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<GearIcon />
									Settings
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive" onClick={handleLogout}>
									<SignOutIcon />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
