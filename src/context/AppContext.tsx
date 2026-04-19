'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactQueryContextProvider } from './ReactQueryContext';
import { getUser } from '@/modules/auth/services/getUser';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { routes } from '@/config/routes';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	const pathname = usePathname();

	useEffect(() => {
		const initAuth = async () => {
			if (routes.public.includes(pathname)) return;

			try {
				const user = await getUser();

				useAuthStore.setState({ isAuthenticated: true, user });
			} catch {}
		};

		initAuth();
	}, []);
	return <ReactQueryContextProvider>{children}</ReactQueryContextProvider>;
}
