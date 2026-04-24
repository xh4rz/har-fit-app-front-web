import type { AppRoutes } from './route.types';

export const routes = {
	public: ['/login', '/signup'],
	private: ['/home', '/exercise', '/routine', '/profile']
} as const satisfies AppRoutes;
