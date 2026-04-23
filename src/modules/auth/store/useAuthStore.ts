import { create } from 'zustand';
import { User } from '@/infrastructure/interfaces';
import {
	authLogin,
	authLogout,
	authRegister
} from '@/modules/auth/services/auth';

export interface AuthStoreState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set) => ({
	isAuthenticated: false,
	user: null,
	loading: false,
	login: async (email: string, password: string) => {
		set({ loading: true });
		try {
			const resp = await authLogin(email, password);

			set({ isAuthenticated: true, user: resp.user });
		} catch (error) {
			throw error;
		} finally {
			set({ loading: false });
		}
	},
	register: async (name: string, email: string, password: string) => {
		set({ loading: true });
		try {
			const resp = await authRegister(name, email, password);
			set({ isAuthenticated: true, user: resp.user });
		} catch (error) {
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	logout: async () => {
		await authLogout();
		set({ isAuthenticated: false, user: null });
	}
}));
