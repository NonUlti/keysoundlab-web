'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center">
      <Link
        href={pathname}
        locale="ko"
        className={`text-sm no-underline p-1 ${locale === 'ko' ? 'font-bold text-accent' : 'font-normal text-text-secondary'}`}
      >
        KO
      </Link>
      <span className="text-border">|</span>
      <Link
        href={pathname}
        locale="en"
        className={`text-sm no-underline p-1 ${locale === 'en' ? 'font-bold text-accent' : 'font-normal text-text-secondary'}`}
      >
        EN
      </Link>
    </div>
  );
}
