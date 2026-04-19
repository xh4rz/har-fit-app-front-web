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
	login: (email: string, password: string) => Promise<boolean>;
	register: (name: string, email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set) => ({
	isAuthenticated: false,
	user: null,
	login: async (email: string, password: string) => {
		const resp = await authLogin(email, password);

		if (!resp) {
			set({ user: null });
			return false;
		}

		set({ isAuthenticated: true, user: resp.user });

		return true;
	},
	register: async (name: string, email: string, password: string) => {
		const resp = await authRegister(name, email, password);

		if (!resp) {
			return false;
		}

		set({ isAuthenticated: true, user: resp.user });

		return true;
	},

	logout: async () => {
		await authLogout();

		set({ isAuthenticated: false, user: null });
	}
}));
