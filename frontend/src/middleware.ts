// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'vi'];
const defaultLocale = 'en';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

const isPublicRoute = createRouteMatcher([
  '/',
  '/:locale/sign-in',
  '/:locale/sign-up',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Handle localization first
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  const authData = await auth();

  if (!authData.userId && !isPublicRoute(req)) {
    const url = req.nextUrl;
    const localeSegment = url.pathname.split('/')[1];
    const locale = locales.includes(localeSegment)
      ? localeSegment
      : defaultLocale;

    const signInUrl = new URL(`/${locale}/sign-in`, url.origin);
    signInUrl.searchParams.set('redirect_url', url.pathname + url.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
