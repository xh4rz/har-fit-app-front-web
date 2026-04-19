import { NextRequest, NextResponse } from 'next/server';
import { routes } from './config/routes';

const isProtected = (path: string) =>
	routes.private.some((r) => path.startsWith(r));

const isAuth = (path: string) => routes.public.some((r) => path.startsWith(r));

export function proxy(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')?.value;

	const isLoggedIn = !!refreshToken;

	const { pathname } = request.nextUrl;

	if (!isLoggedIn && isProtected(pathname)) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (isLoggedIn && isAuth(pathname)) {
		return NextResponse.redirect(new URL('/home', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
