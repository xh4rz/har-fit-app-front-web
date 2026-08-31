import { Skeleton } from '@/components/ui/skeleton';

export const ProfileSkeleton = () => {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-2">
				<Skeleton className="h-8 w-24" />
				<div className="flex-1" />
				<Skeleton className="h-10 w-30" />
			</div>
			<div className="flex items-center gap-4">
				<Skeleton className="h-25 w-25 rounded-full" />
				<Skeleton className="h-8 w-24" />
			</div>
			<div className="flex flex-col gap-8">
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-8 w-full" />
				<div className="flex gap-2">
					<Skeleton className="h-8 flex-1" />
					<Skeleton className="h-8 flex-1" />
				</div>
				<Skeleton className="h-20 w-full" />
			</div>
		</div>
	);
};
