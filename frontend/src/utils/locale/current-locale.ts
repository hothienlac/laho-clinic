import { defaultLocale, Locale, locales } from '@/i18n/config';

export async function getCurrentLocale(): Promise<Locale> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get('NEXT_LOCALE')?.value as
    | Locale
    | undefined;
  if (!storedLocale || !locales.includes(storedLocale)) {
    return defaultLocale;
  }
  return storedLocale;
}
