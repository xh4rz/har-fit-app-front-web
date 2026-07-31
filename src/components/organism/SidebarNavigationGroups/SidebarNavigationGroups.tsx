'use client';

import { SidebarMenuItemLink } from '@/components/molecules';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu
} from '@/components/ui/sidebar';
import { MenuItem } from '@/types';

interface SidebarNavigationGroupsProps {
	groups: MenuGroup[];
	pathname: string;
	open: boolean;
}

interface MenuGroup {
	title: string;
	items: MenuItem[];
}

export const SidebarNavigationGroups = ({
	groups,
	pathname,
	open
}: SidebarNavigationGroupsProps) => {
	return (
		<>
			{groups.map((group) => (
				<SidebarGroup key={group.title}>
					<SidebarGroupLabel className="mb-2 text-sm font-medium text-muted-foreground">
						{group.title}
					</SidebarGroupLabel>

					<SidebarMenu>
						{group.items.map((item) => (
							<SidebarMenuItemLink
								key={item.name}
								item={item}
								isActive={pathname.includes(item.url)}
								open={open}
							/>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
};
