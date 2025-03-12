import type React from "react"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { NextIntlClientProvider } from "next-intl"
import { cookies, headers } from "next/headers"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// List of supported locales
const locales = ["en", "vi"]
const defaultLocale = "en"

// Function to get locale from request headers or cookies
function getLocale(): string {
  // Check if locale cookie exists
  const cookieStore = cookies()
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Otherwise, use Accept-Language header
  const headersList = headers()
  const acceptLanguage = headersList.get("accept-language") || ""
  const languages = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).languages()

  return match(languages, locales, defaultLocale)
}

export async function generateMetadata() {
  const locale = getLocale()
  const messages = (await import(`../messages/${locale}/app.json`)).default

  return {
    title: messages.name,
    description: messages.description,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the locale from cookies or headers
  const locale = getLocale()

  // Load all message files for the current locale
  const messages = {
    app: (await import(`../messages/${locale}/app.json`)).default,
    auth: (await import(`../messages/${locale}/auth.json`)).default,
    navigation: (await import(`../messages/${locale}/navigation.json`)).default,
    dashboard: (await import(`../messages/${locale}/dashboard.json`)).default,
    errors: (await import(`../messages/${locale}/errors.json`)).default,
    language: (await import(`../messages/${locale}/language.json`)).default,
    clinics: (await import(`../messages/${locale}/clinics.json`)).default,
  }

  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale}>
          <body className={inter.className}>{children}</body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}

