import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
	AuthLoginRequest,
	AuthRegisterRequest,
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
	login: (data: AuthLoginRequest) => Promise<void>;
	register: (data: AuthRegisterRequest) => Promise<void>;
	logout: () => Promise<void>;
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
		}),
		{ store: 'useAuthStore' }
	)
);
