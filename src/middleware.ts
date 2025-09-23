import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

const protectedRoutes = ['/profile', '/post/create', '/post/edit']

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname

  const session = await auth.api.getSession({
    headers: await headers()
  })
  const isProtectedRoute = protectedRoutes.some(route =>
    pathName.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  // If user is already logged in and user is accessing auth route
  //they will automatically be redirected to the home page

  if (pathName === '/auth' && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/profile/:path*', '/post/create', '/post/edit/:path*', '/auth']
}
