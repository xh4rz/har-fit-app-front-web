import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
	AuthLoginRequest,
	AuthRegisterRequest,
	AuthResponse,
	User
} from '@/infrastructure/interfaces';
import {
	authLogin,
	authLogout,
	authRegister
} from '@/modules/auth/services/auth';

export interface AuthStoreState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	login: (data: AuthLoginRequest) => Promise<AuthResponse>;
	register: (data: AuthRegisterRequest) => Promise<AuthResponse>;
	logout: () => Promise<void>;
	setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStoreState>()(
	devtools(
		(set) => ({
			isAuthenticated: false,
			user: null,
			loading: false,
			login: async (data) => {
				set({ loading: true });
				try {
					const resp = await authLogin(data);
					set({ isAuthenticated: true, user: resp.user });
					return resp;
				} catch (error) {
					throw error;
				} finally {
					set({ loading: false });
				}
			},
			register: async (data) => {
				set({ loading: true });
				try {
					const resp = await authRegister(data);
					set({ isAuthenticated: true, user: resp.user });
					return resp;
				} catch (error) {
					throw error;
				} finally {
					set({ loading: false });
				}
			},
			logout: async () => {
				await authLogout();
				set({ isAuthenticated: false, user: null });
			},
			setUser: (user) => set({ user })
		}),
		{ store: 'useAuthStore' }
	)
);
