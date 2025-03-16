import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, Locale, locales } from './config';

export default getRequestConfig(async () => {
  // get locale from cookies
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value as
    | Locale
    | undefined;
  let locale: Locale;
  if (!cookieLocale || !locales.includes(cookieLocale)) {
    locale = defaultLocale;
  } else {
    locale = cookieLocale;
  }
  const messages = {
    auth: (await import(`../messages/${locale}/auth.json`)).default,
    navigation: (await import(`../messages/${locale}/navigation.json`)).default,
    dashboard: (await import(`../messages/${locale}/dashboard.json`)).default,
    error: (await import(`../messages/${locale}/error.json`)).default,
    clinic: (await import(`../messages/${locale}/clinic.json`)).default,
    onboarding: (await import(`../messages/${locale}/onboarding.json`)).default,
    role: (await import(`../messages/${locale}/role.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
