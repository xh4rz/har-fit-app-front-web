'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactQueryContextProvider, ThemeContextProvider } from './';
import { getUser } from '@/modules/user/service';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { routeUtils } from '@/lib/routes';
import { Toaster } from '@/components/ui/sonner';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	const pathname = usePathname();

	useEffect(() => {
		const initAuth = async () => {
			if (routeUtils.isPublic(pathname)) return;

			useAuthStore.setState({ loading: true });

			try {
				const user = await getUser();

				useAuthStore.setState({ isAuthenticated: true, user });
			} finally {
				useAuthStore.setState({ loading: false });
			}
		};

		initAuth();
	}, []);

	return (
		<ReactQueryContextProvider>
			<ThemeContextProvider>
				{children}
				<Toaster />
			</ThemeContextProvider>
		</ReactQueryContextProvider>
	);
}
