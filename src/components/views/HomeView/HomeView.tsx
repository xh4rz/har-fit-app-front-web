'use client';

import Image from 'next/image';
import { HomeItem } from '@/components/molecules';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import {
	BarbellIcon,
	DownloadSimpleIcon,
	UserIcon
} from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppQRCode } from '@/components/atoms';

export const HomeView = () => {
	const { user } = useAuthStore((state) => state);

	if (!user?.fullName) {
		return (
			<Card className="p-4 h-full flex flex-col gap-4">
				<Skeleton className="flex-1/6 w-full " />
				<Skeleton className="flex-1 w-full" />
			</Card>
		);
	}

	return (
		<Card className="rounded-lg p-0 gap-0">
			<div className="bg-accent px-4 sm:px-8 lg:px-12 py-8">
				<div className="flex flex-col lg:flex-row items-center justify-center gap-8">
					<div className="flex flex-col gap-4 w-full max-w-xl text-center lg:text-left">
						<h3 className="text-2xl font-bold leading-tight">
							Hello <span className="text-secondary">{user.fullName}</span>,
							welcome to HarFit!
						</h3>

						<p className="text-lg text-muted-foreground leading-6">
							To take full advantage of Hevy complete the following steps:
						</p>
					</div>
					<div className="w-full">
						<Image
							loading="eager"
							src="/images/banner-har-fit.png"
							alt="home banner"
							width={500}
							height={500}
							className="w-lg "
							priority
						/>
					</div>
				</div>
			</div>
			<div className="px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-4">
				<div className="flex gap-20">
					<HomeItem
						icon={<DownloadSimpleIcon size={30} className="text-primary" />}
						title="Download the HarFit mobile app"
					/>

					<AppQRCode
						value="https://github.com/xh4rz/har-fit-app-front-mobile/releases/tag/v1.0.0"
						size={100}
					/>
				</div>

				<Separator />
				<HomeItem
					icon={<UserIcon size={30} className="text-primary" />}
					title="Log in with the account you just created"
					description='Make sure you tap on "Already have an account? Login"'
				/>
				<Separator />
				<HomeItem
					icon={<BarbellIcon size={30} className="text-primary" />}
					title="Log your first workout with the HarFit app"
					description="Enjoy access to HarFit on both your phone and the web app"
				/>
			</div>
		</Card>
	);
};
