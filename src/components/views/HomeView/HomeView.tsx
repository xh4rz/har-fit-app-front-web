'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { HomeItem } from '@/components/molecules';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AppQRCode } from '@/components/atoms';
import {
	BarbellIcon,
	DownloadSimpleIcon,
	UserIcon
} from '@phosphor-icons/react';
import { URLS } from '@/lib/constants/urls';

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
							preload
							src="/images/banner-har-fit.png"
							alt="home banner"
							width={500}
							height={500}
							className="w-lg"
						/>
					</div>
				</div>
			</div>
			<div className="px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-4">
				<div className="flex flex-col xl:flex-row xl:items-center gap-6">
					<div className="flex-1">
						<HomeItem
							icon={<DownloadSimpleIcon size={30} className="text-primary" />}
							title="Download the HarFit mobile app"
						/>
					</div>
					<div className="flex justify-center xl:flex-1">
						<AppQRCode value={URLS.appDownload} size={120} />
					</div>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 xl:flex-1">
						<Link
							href={URLS.appDownload}
							target="_blank"
							className="relative h-14 w-44"
						>
							<Image
								fill
								preload
								src="/images/badge-google-play-store.svg"
								alt="Get it on Google Play"
								className="object-contain transition-transform hover:scale-105"
							/>
						</Link>
						<Link
							href={URLS.appDownload}
							target="_blank"
							className="relative h-14 w-44"
						>
							<Image
								fill
								preload
								src="/images/badge-app-store.svg"
								alt="Download on the App Store"
								className="object-contain transition-transform hover:scale-105"
							/>
						</Link>
					</div>
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
