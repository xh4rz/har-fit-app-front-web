import { User } from '..';

export interface Auth extends Token {
	user: User;
}

export interface Token {
	accessToken: string;
	refreshToken: string;
}
