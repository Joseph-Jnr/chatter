// middleware.ts

/*import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value

  // Define a pattern for dynamic routes under /feeds
  const dynamicFeedRoutePattern = /^\/feeds\/[^\/]+$/

  // Allow access to the unprotected page
  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/register'
    //dynamicFeedRoutePattern.test(request.nextUrl.pathname)
  ) {
    return undefined
  }

  // Protect other routes
  if (currentUser && !request.nextUrl.pathname.startsWith('/feeds')) {
    return Response.redirect(new URL('/feeds', request.url))
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/sign-in')) {
    return Response.redirect(new URL('/sign-in', request.url))
  }

  return undefined
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
 */

export function middleware() {}

/* import { NextResponse } from 'next/server'
import { isAuthenticated } from './utils/Auth'

export function middleware(request: NextResponse) {
  const user = isAuthenticated

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/analytics', '/category'],
}
 */
