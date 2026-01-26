'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', label: '메인' },
  { href: '/sound-test', label: '사운드 테스트' },
];

/**
 * GNB 네비게이션 컴포넌트
 */
export function Navigation() {
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
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
