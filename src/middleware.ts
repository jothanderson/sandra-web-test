import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './lib/i18n/config';

function getLocale(request: NextRequest): string | undefined {
  // Simple locale detection. In a real app, use negotiator and @formatjs/intl-localematcher
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    if (acceptLanguage.includes('fr')) return 'fr';
    if (acceptLanguage.includes('en')) return 'en';
  }
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // e.g. incoming request is /mapa
    // The new URL is now /es/mapa
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and `/photos/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|photos).*)'],
};
