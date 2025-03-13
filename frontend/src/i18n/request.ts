import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const defaultLocale = 'en';

  // get locale from cookies
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = cookieLocale || defaultLocale;

  const messages = {
    app: (await import(`../messages/${locale}/app.json`)).default,
    auth: (await import(`../messages/${locale}/auth.json`)).default,
    navigation: (await import(`../messages/${locale}/navigation.json`)).default,
    dashboard: (await import(`../messages/${locale}/dashboard.json`)).default,
    error: (await import(`../messages/${locale}/error.json`)).default,
    language: (await import(`../messages/${locale}/language.json`)).default,
    clinic: (await import(`../messages/${locale}/clinic.json`)).default,
    role: (await import(`../messages/${locale}/role.json`)).default,
  };

  return {
    locale: locale!,
    messages,
  };
});
