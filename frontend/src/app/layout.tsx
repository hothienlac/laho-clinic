import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'vi'];
const defaultLocale = 'en';

// Make getLocale async to correctly await cookies
async function getLocale() {
  const cookieStore = cookies();
  const cookieLocale = (await cookieStore).get('NEXT_LOCALE')?.value;

  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage =
    (await cookieStore).get('accept-language')?.value || 'en';
  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages();

  return match(languages, locales, defaultLocale);
}

export async function generateMetadata() {
  const locale = await getLocale();
  const messages = (await import(`../messages/${locale}/app.json`)).default;

  return {
    title: messages.name,
    description: messages.description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <ClerkProvider afterSignOutUrl={'/sign-in'}>
      <NextIntlClientProvider locale={locale}>
        <html lang={locale}>
          <body className={inter.className}>{children}</body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
