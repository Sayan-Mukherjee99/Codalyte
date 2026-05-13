import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})

export default function proxy(request: NextRequest) {
  // Skip locale middleware for API routes and special routes
  if (
    request.nextUrl.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
