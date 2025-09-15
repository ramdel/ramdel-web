import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const resolvedLocale = await requestLocale;
  let locale = resolvedLocale;

  if (!locale) {
    locale = 'en'; // Default locale
  }

  // Validate locale
  const supportedLocales = ['en', 'es', 'fr'];
  if (!supportedLocales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});