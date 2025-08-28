import { type NextRequest, NextResponse } from 'next/server'
import linguiConfig from '../lingui.config'
import Negotiator from 'negotiator'

const { locales } = linguiConfig

const getRequestLocale = (requestHeaders: Headers): string => {
  const langHeader = requestHeaders.get('accept-language') || undefined
  const languages = new Negotiator({
    headers: { 'accept-language': langHeader },
  }).languages(locales.slice())

  const activeLocale = languages[0] || locales[0] || 'en'

  return activeLocale
}

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', pathname)
    requestHeaders.set('x-url', request.url)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  const locale = getRequestLocale(request.headers)
  const newPathname = `/${locale}${pathname}`

  request.nextUrl.pathname = newPathname
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|xml|txt|js|css)$).*)',
  ],
}
