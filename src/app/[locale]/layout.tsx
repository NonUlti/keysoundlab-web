import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { NAMESPACES, type Locale } from '@/i18n/constants';
import { Providers } from '../providers';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();
  const common = messages[NAMESPACES.COMMON] as Record<string, Record<string, string>>;

  return {
    title: common?.metadata?.title || 'KeySoundLab',
    description: common?.metadata?.description || '',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storageKey = 'ui-theme';
                  var theme = localStorage.getItem(storageKey);
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  var isDark = theme === 'dark' || ((!theme || theme === 'system') && supportDarkMode);
                  var resolved = isDark ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', resolved);
                  var last = resolved;
                  new MutationObserver(function(ms) {
                    for (var i = 0; i < ms.length; i++) {
                      if (ms[i].attributeName === 'data-theme') {
                        var c = document.documentElement.getAttribute('data-theme');
                        if (c) { last = c; } else { document.documentElement.setAttribute('data-theme', last); }
                      }
                    }
                  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
