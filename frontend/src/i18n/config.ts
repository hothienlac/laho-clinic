export const locales = ['en', 'vn'] as const;
export const defaultLocale: Locale = 'en';

export type Locale = (typeof locales)[number];
