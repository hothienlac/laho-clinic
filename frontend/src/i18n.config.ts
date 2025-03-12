import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = {
    app: (await import(`./messages/${locale}/app.json`)).default,
    auth: (await import(`./messages/${locale}/auth.json`)).default,
    navigation: (await import(`./messages/${locale}/navigation.json`)).default,
    dashboard: (await import(`./messages/${locale}/dashboard.json`)).default,
    errors: (await import(`./messages/${locale}/errors.json`)).default,
    language: (await import(`./messages/${locale}/language.json`)).default,
    clinics: (await import(`./messages/${locale}/clinics.json`)).default,
  };

  return {
    locale: locale!,
    messages,
  };
});
