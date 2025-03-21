import { LayoutProps } from '@/types';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import './globals.css';
import { APPLIcATION_DESCRIPTION, APPLICATION_NAME } from '@/application-information';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata() {
  return {
    title: APPLICATION_NAME,
    description: APPLIcATION_DESCRIPTION,
  };
}

export default async function RootLayout({ children }: LayoutProps) {
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
