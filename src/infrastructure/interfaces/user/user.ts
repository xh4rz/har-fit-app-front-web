import { Gender } from './gender';

export interface User {
	id: string;
	email: string;
	fullname: string;
	username: string;
	isActive: boolean;
	roles: string[];
	description?: string | null;
	gender?: Gender | null;
	birthDate?: string | null;
	imageUrl?: string | null;
}
