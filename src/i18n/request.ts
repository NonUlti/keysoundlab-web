import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { NAMESPACES, type Locale } from './constants';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate locale
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  // Load all namespace files for the locale
  const [common, home, soundTest] = await Promise.all([
    import(`../../messages/${locale}/${NAMESPACES.COMMON}.json`),
    import(`../../messages/${locale}/${NAMESPACES.HOME}.json`),
    import(`../../messages/${locale}/${NAMESPACES.SOUND_TEST}.json`),
  ]);

  return {
    locale,
    messages: {
      [NAMESPACES.COMMON]: common.default,
      [NAMESPACES.HOME]: home.default,
      [NAMESPACES.SOUND_TEST]: soundTest.default,
    },
  };
});
