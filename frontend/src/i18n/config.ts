export const LOCALE_VN = 'vi' as const;
export const LOCALE_EN = 'en' as const;

export const locales = [LOCALE_VN, LOCALE_EN] as const;
export const defaultLocale = LOCALE_VN;

export type Locale = (typeof locales)[number];
