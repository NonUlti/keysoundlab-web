'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  rightContent?: React.ReactNode;
}

/**
 * 공통 헤더 컴포넌트
 */
export function Header({ rightContent }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-left">
        <Link href="/" className="logo">
          KeySoundLab
        </Link>
        <Navigation />
      </div>
      
      <div className="header-right">
        {rightContent}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
