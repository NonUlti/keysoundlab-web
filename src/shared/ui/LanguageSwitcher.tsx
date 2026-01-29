'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="language-switcher" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Link 
        href={pathname} 
        locale="ko" 
        style={{ 
          fontSize: '0.875rem', 
          fontWeight: locale === 'ko' ? 'bold' : 'normal',
          color: locale === 'ko' ? 'var(--accent)' : 'var(--text-secondary)',
          textDecoration: 'none',
          padding: '0.25rem'
        }}
      >
        KO
      </Link>
      <span style={{ color: 'var(--border)' }}>|</span>
      <Link 
        href={pathname} 
        locale="en" 
        style={{ 
          fontSize: '0.875rem', 
          fontWeight: locale === 'en' ? 'bold' : 'normal',
          color: locale === 'en' ? 'var(--accent)' : 'var(--text-secondary)',
          textDecoration: 'none',
          padding: '0.25rem'
        }}
      >
        EN
      </Link>
    </div>
  );
}
