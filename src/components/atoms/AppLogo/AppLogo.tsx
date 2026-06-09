'use client';

import { cn } from '@/lib/utils';

export const AppLogo = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	return (
		<div
			className={cn('font-bold text-4xl w-full text-center', className)}
			{...props}
		>
			<span className="text-primary">HarFit</span>
			<span className="text-secondary">App</span>
		</div>
	);
};
