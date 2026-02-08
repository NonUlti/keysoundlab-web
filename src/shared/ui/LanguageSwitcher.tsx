'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center" role="group" aria-label="Language">
      <Link
        href={pathname}
        locale="ko"
        className={`text-sm no-underline p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${locale === 'ko' ? 'font-bold text-accent' : 'font-normal text-text-secondary hover:text-text-primary'}`}
        aria-current={locale === 'ko' ? 'true' : undefined}
      >
        KO
      </Link>
      <span className="text-border" aria-hidden="true">|</span>
      <Link
        href={pathname}
        locale="en"
        className={`text-sm no-underline p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${locale === 'en' ? 'font-bold text-accent' : 'font-normal text-text-secondary hover:text-text-primary'}`}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
