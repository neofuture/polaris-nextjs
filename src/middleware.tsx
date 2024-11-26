import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const loggedIn = request.cookies.get('loggedIn')?.value === 'true';

    if (!loggedIn) {
        return NextResponse.redirect(new URL('/app/user/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/app/user/profile'], // Add routes that need authentication
};