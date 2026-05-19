import { ReactNode } from 'react';

interface HomeItemProps {
	icon: ReactNode;
	title: string;
	description?: string;
}

export const HomeItem = ({ icon, title, description }: HomeItemProps) => {
	return (
		<div className="flex items-center gap-4 ">
			<div className="rounded-full border-2 border-primary p-3 sm:p-4 lg:p-5">
				{icon}
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-lg font-semibold leading-none">{title}</p>
				{description && (
					<p className="text-muted-foreground leading-5">{description}</p>
				)}
			</div>
		</div>
	);
};
