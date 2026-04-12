'use client';

import { ReactNode } from 'react';
import { ReactQueryContextProvider } from './ReactQueryContext';

interface AppContextProps {
	children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProps) {
	return (
		<ReactQueryContextProvider>
			{children}
			{/* <ThemeContextProvider>{children}</ThemeContextProvider> */}
		</ReactQueryContextProvider>
	);
}
