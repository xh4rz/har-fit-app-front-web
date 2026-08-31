'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { SidebarNavigationGroups } from '../SidebarNavigationGroups';
import { MoonIcon, UserIcon } from '@phosphor-icons/react';

const menuGroups = [
	{
		title: 'Account',
		items: [
			{
				name: 'Profile',
				url: '/settings/profile',
				icon: UserIcon
			}
		]
	},
	{
		title: 'Preferences',
		items: [
			{
				name: 'Theme',
				url: '/settings/theme',
				icon: MoonIcon
			}
		]
	}
];

export const SettingsSidebar = () => {
	const pathname = usePathname();

	return (
		<Sidebar
			className="w-full border-b md:w-56 md:border-r md:border-b-0"
			collapsible="none"
		>
			<SidebarContent className="py-6">
				<SidebarNavigationGroups
					groups={menuGroups}
					pathname={pathname}
					open={true}
				/>
			</SidebarContent>
		</Sidebar>
	);
};
