'use client';

import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar';
import { SidebarMenuItemLink } from '@/components/molecules';
import { MenuItem } from '@/types';

interface SidebarNavigationProps {
	items: MenuItem[];
	pathname: string;
	open: boolean;
}

export const SidebarNavigation = ({
	items,
	pathname,
	open
}: SidebarNavigationProps) => {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItemLink
						key={item.name}
						item={item}
						isActive={pathname === item.url}
						open={open}
					/>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};
