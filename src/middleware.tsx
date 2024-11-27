import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const loggedIn = request.cookies.get('loggedIn')?.value === 'true';

    if (!loggedIn) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/app/:path*'], // Add routes that need authentication
};