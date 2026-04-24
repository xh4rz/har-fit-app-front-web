import { NextRequest, NextResponse } from 'next/server';
import { routeUtils } from './lib/routes/route.utils';

export function proxy(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')?.value;

	const isLoggedIn = !!refreshToken;

	const { pathname } = request.nextUrl;

	if (!isLoggedIn && routeUtils.isPrivate(pathname)) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (isLoggedIn && routeUtils.isPublic(pathname)) {
		return NextResponse.redirect(new URL('/home', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
