import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  // Target your specific admin subdomain
  if (hostname === 'admin.dhirojpandit.com.np') {
    
    // Prevent infinite loops if the internal path is already being requested
    if (url.pathname.startsWith('/admin/admin')) {
      return NextResponse.next();
    }

    // Rewrite the root and any sub-paths (e.g., admin.dhirojpandit.com.np/dashboard)
    url.pathname = `/admin/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

// Ensure the middleware only runs on actual pages, not static assets or APIs
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};
