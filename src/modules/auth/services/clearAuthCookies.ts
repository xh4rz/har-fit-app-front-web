'use server';

import { cookies } from 'next/headers';

export const clearAuthCookies = async () => {
	const cookieStore = await cookies();
	cookieStore.delete('accessToken');
	cookieStore.delete('refreshToken');
};
