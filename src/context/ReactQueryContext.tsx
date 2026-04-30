import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
	children: ReactNode;
}

export const reactQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // datos frescos por 5 min
			gcTime: 10 * 60 * 1000, // cache se elimina en 10 min
			retry: 1, // 1 reintento si falla
			refetchOnWindowFocus: false, // no refetch al volver a la app
			refetchOnReconnect: true // refetch si vuelve internet
		},
		mutations: {
			retry: 0 // no reintentar mutations
		}
	}
});

export function ReactQueryContextProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={reactQueryClient}>
			<ReactQueryDevtools initialIsOpen={true} />
			{children}
		</QueryClientProvider>
	);
}
