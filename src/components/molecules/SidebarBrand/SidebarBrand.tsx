'use client';

import Image from 'next/image';
import { AppLogo } from '@/components/atoms';

interface SidebarBrandProps {
	open: boolean;
}

export const SidebarBrand = ({ open }: SidebarBrandProps) => {
	return (
		<div className="flex items-center justify-center h-10">
			{!open ? (
				<Image
					src="/logo/icon-har-fit-orange.png"
					alt="logo"
					width={40}
					height={40}
				/>
			) : (
				<AppLogo />
			)}
		</div>
	);
};
