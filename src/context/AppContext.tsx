'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactQueryContextProvider } from './ReactQueryContext';
import { getUser } from '@/modules/auth/services/getUser';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { routeUtils } from '@/lib/routes';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <ReactQueryContextProvider>{children}</ReactQueryContextProvider>;
}
