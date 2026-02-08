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
    <nav className="flex items-center min-w-0" aria-label="Main navigation">
      <ul className="flex list-none gap-1 md:gap-2 whitespace-nowrap">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={`block py-2 px-3 md:px-4 no-underline text-sm md:text-base font-medium rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'text-accent bg-[rgba(var(--accent-rgb),0.1)] after:content-[\'\'] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[3px] after:bg-accent after:rounded-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
                aria-current={isActive ? 'page' : undefined}
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
