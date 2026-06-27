import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // 1. BLOCK/REDIRECT DIRECT ROOT ACCESS
  // If the user attempts to load the main domain with the old path...
  if (hostname === 'dhirojpandit.com.np' && url.pathname.startsWith('/admin/admin')) {
    // Strip the internal path from the final address bar look
    const cleanPath = url.pathname.replace('/admin/admin', '');
    
    // Redirect them permanently (308) to the subdomain equivalent
    return NextResponse.redirect(
      new URL(`https://dhirojpandit.com.np${cleanPath || '/'}`, request.url),
      308
    );
  }

  // 2. KEEP REWRITE WORKING FOR THE SUBDOMAIN
  if (hostname === 'admin.dhirojpandit.com.np') {
    // Prevent infinite loop checks
    if (url.pathname.startsWith('/admin/admin')) {
      return NextResponse.next();
    }

    // Secretly load the files behind the clean address bar
    url.pathname = `/admin/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};
