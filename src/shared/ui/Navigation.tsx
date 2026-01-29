'use client';

import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';
import { Link, usePathname } from '@/i18n/routing';

interface NavItem {
  href: string;
  labelKey: string;
}

const navItems: NavItem[] = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/sound-test', labelKey: 'nav.soundTest' },
];

/**
 * GNB 네비게이션 컴포넌트
 */
export function Navigation() {
  const t = useTranslations(NAMESPACES.COMMON);
  const pathname = usePathname();

  return (
    <nav className="gnb-nav">
      <ul className="gnb-list">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="gnb-item">
              <Link
                href={item.href}
                className={`gnb-link ${isActive ? 'active' : ''}`}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
