import { authMiddleware } from '@clerk/nextjs';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// List of supported locales
const locales = ['en', 'vi'];
const defaultLocale = 'en';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // Default locale
  defaultLocale: defaultLocale,
  // This function is called when a user visits the root (/) without a locale
  localeDetection: true,
});

// Export the combined middleware
export default authMiddleware({
  publicRoutes: ['/', '/:locale/sign-in', '/:locale/sign-up'],
  beforeAuth: (req: NextRequest) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
  afterAuth(auth, req: NextRequest) {
    // Handle routing based on authentication status
    const url = req.nextUrl;
    const isPublicRoute =
      url.pathname === '/' ||
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up');

    // If the user is not authenticated and the route is not public, redirect to sign-in
    if (!auth.userId && !isPublicRoute) {
      const locale = url.pathname.split('/')[1];
      const isValidLocale = locales.includes(locale);
      const signInUrl = new URL(
        `/${isValidLocale ? locale : defaultLocale}/sign-in`,
        req.url,
      );
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
