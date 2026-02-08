'use client';

import { Link } from '@/i18n/routing';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

/**
 * 공통 헤더 컴포넌트
 */
export function Header() {
  return (
    <header className="flex justify-between items-center px-4 md:px-8 h-14 md:h-16 bg-secondary border-b border-border sticky top-0 z-[100]">
      <div className="flex items-center gap-4 md:gap-8 min-w-0">
        <Link href="/" className="text-xl md:text-2xl font-bold text-text-primary no-underline transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm shrink-0">
          KeySoundLab
        </Link>
        <Navigation />
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
