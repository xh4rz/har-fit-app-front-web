'use client';

import Link from 'next/link';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { MenuItem } from '@/types';

interface SidebarMenuItemLinkProps {
	item: MenuItem;
	isActive: boolean;
	open: boolean;
}

export const SidebarMenuItemLink = ({
	item,
	isActive,
	open
}: SidebarMenuItemLinkProps) => {
	const Icon = item.icon;
	return (
		<SidebarMenuItem key={item.name} className="my-1">
			<SidebarMenuButton asChild isActive={isActive}>
				<Link href={item.url}>
					<Icon
						size={24}
						className={isActive ? 'text-secondary' : 'text-foreground'}
					/>
					{open && (
						<span className={isActive ? 'text-secondary' : 'text-foreground'}>
							{item.name}
						</span>
					)}
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
