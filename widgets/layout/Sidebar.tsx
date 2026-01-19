'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type TSidebarProps = {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
};

export const Sidebar = ({ isSidebarOpen, onSidebarClose }: TSidebarProps) => {
  const t = useTranslations();
  return (
    <>
      {isSidebarOpen && (
        <div
          aria-hidden
          className="bg-background/40 fixed inset-0 z-30 md:hidden"
          onClick={onSidebarClose}
        />
      )}
      <aside
        id="app-sidebar"
        className={clsx(
          'w-sidebar-width bg-card border-border top-header-height fixed bottom-0 left-0 z-40 flex transform flex-col gap-4 border-r-2 p-4 transition-transform duration-300 ease-out md:static md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <h2 id="sidebar-title" className="sr-only">
          {t('navigation.title')}
        </h2>
        <nav role="navigation" aria-labelledby="sidebar-title">
          <ul>
            <li>
              <Link href="/dashboard">{t('navigation.dashboard')}</Link>
            </li>
            <li>
              <Link href="/widgets">{t('navigation.widgets')}</Link>
            </li>
            <li>
              <Link href="/settings">{t('navigation.settings')}</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
