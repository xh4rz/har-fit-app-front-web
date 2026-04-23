'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar
} from '@/components/ui/sidebar';
import { BarbellIcon, HouseIcon, UserIcon } from '@phosphor-icons/react';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { SidebarNavigation, SidebarUserMenu } from '@/components/organism';
import { SidebarBrand } from '@/components/molecules';
import { MenuItem } from '@/types';

const menuItems: MenuItem[] = [
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

	const { user, loading, logout } = useAuthStore();

	const { open, isMobile } = useSidebar();

	const handleLogout = async () => {
		await logout();
		router.replace('/login');
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarBrand open={open} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarNavigation items={menuItems} pathname={pathname} open={open} />
			</SidebarContent>
			<SidebarFooter>
				<SidebarUserMenu
					loading={loading}
					open={open}
					isMobile={isMobile}
					user={user}
					onLogout={handleLogout}
				/>
			</SidebarFooter>
		</Sidebar>
	);
};
