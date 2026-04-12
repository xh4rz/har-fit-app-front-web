import { create } from 'zustand';
import { StorageAdapter } from '@/adapters/storage-adapter';
import { User } from '@/infrastructure/interfaces';
import { authLogin, authRegister } from '@/modules/auth/services/auth';

export interface AuthStoreState {
	isAuthenticated: boolean;
	accessToken: string;
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (name: string, email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set) => ({
	isAuthenticated: false,
	accessToken: '',
	user: null,
	login: async (email: string, password: string) => {
		const resp = await authLogin(email, password);

		if (!resp) {
			set({ isAuthenticated: false, accessToken: '', user: null });
			return false;
		}

		StorageAdapter.setItem('accessToken', resp.accessToken);

		StorageAdapter.setItem('refreshToken', resp.refreshToken);

		set({
			isAuthenticated: true,
			accessToken: resp.accessToken,
			user: resp.user
		});

		return true;
	},
	register: async (name: string, email: string, password: string) => {
		const resp = await authRegister(name, email, password);

		if (!resp) {
			return false;
		}

		StorageAdapter.setItem('accessToken', resp.accessToken);

		StorageAdapter.setItem('refreshToken', resp.refreshToken);

		set({
			isAuthenticated: true,
			accessToken: resp.accessToken,
			user: resp.user
		});

		return true;
	},

	logout: async () => {
		StorageAdapter.removeItem('accessToken');

		StorageAdapter.removeItem('refreshToken');

		set({ isAuthenticated: false, accessToken: '', user: null });
	}
}));
