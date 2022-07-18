import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    if (
        request.nextUrl.pathname.startsWith('/api/') ||
        request.nextUrl.pathname === '/'
    ) {
        return;
    }

    const slugParameter = request.nextUrl.pathname.split('/').pop();

    const slugFetched = await fetch(
        `${request.nextUrl.origin}/api/get-url/${slugParameter}`
    );

    if (slugFetched.status === 404) return;

    const data = await slugFetched.json();

    if (data?.url) return NextResponse.redirect(data.url);
}
