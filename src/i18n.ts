import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // requestLocale es una Promise en Next.js 15
  const resolvedLocale = await requestLocale;
  let locale = resolvedLocale;

  // Fallback si requestLocale es undefined
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