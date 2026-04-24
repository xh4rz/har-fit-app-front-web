import type { Route } from 'next';

export interface AppRoutes {
	public: readonly Route[];
	private: readonly Route[];
}
