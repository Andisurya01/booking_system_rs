import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;
    //   const headerList = 

    const isAuthPage = pathname.startsWith('/login');
    const isProtectedPage =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/mybookings') ||
        pathname.startsWith('/insurance');

    if (isProtectedPage && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/mybookings/:path*',
        '/insurance/:path*',
        '/login'
    ],
};