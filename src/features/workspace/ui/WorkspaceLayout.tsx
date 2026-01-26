'use client';

import { ReactNode } from 'react';

interface WorkspaceLayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  main: ReactNode;
  footer?: ReactNode;
}

/**
 * 메인 앱 레이아웃
 */
export function WorkspaceLayout({
  header,
  sidebar,
  main,
  footer,
}: WorkspaceLayoutProps) {
  return (
    <div className="workspace-layout">
      {header && <header className="workspace-header">{header}</header>}

      <div className="workspace-content">
        {sidebar && <aside className="workspace-sidebar">{sidebar}</aside>}
        <main className="workspace-main">{main}</main>
      </div>

      {footer && <footer className="workspace-footer">{footer}</footer>}
    </div>
  );
}
