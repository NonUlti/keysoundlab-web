'use client';

import { Link } from '@/i18n/routing';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  rightContent?: React.ReactNode;
}

/**
 * 공통 헤더 컴포넌트
 */
export function Header({ rightContent }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-8 h-16 bg-secondary border-b border-border sticky top-0 z-[100]">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold text-text-primary no-underline transition-colors hover:text-accent">
          KeySoundLab
        </Link>
        <Navigation />
      </div>

      <div className="flex items-center gap-4">
        {rightContent}
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
