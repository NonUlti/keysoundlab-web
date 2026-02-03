"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from local storage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    const themeToApply = savedTheme || defaultTheme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // resolvedTheme을 isMounted 전에 결정하여 다크모드 깜빡임 방지
    if (themeToApply === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(prefersDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(themeToApply as 'light' | 'dark');
    }
    setIsMounted(true);
  }, [storageKey, defaultTheme]);

  // Handle system theme changes and update resolvedTheme
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(media.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    applyResolvedTheme();

    // Listen for system changes if theme is system
    if (theme === 'system') {
      media.addEventListener('change', applyResolvedTheme);
      return () => media.removeEventListener('change', applyResolvedTheme);
    }
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    if (!isMounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    root.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem(storageKey, theme);
  }, [theme, resolvedTheme, storageKey, isMounted]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      // 사용자가 직접 테마를 전환할 때만 transition 적용
      document.body.classList.add('theme-transition');
      setTheme(newTheme);
      window.setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);
    },
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
