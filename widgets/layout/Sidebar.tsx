'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type TSidebarProps = {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
};

export const Sidebar = ({ isSidebarOpen, onSidebarClose }: TSidebarProps) => {
  const t = useTranslations('navigation');
  return (
    <>
      {isSidebarOpen && (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onSidebarClose}
        />
      )}
      <aside
        id="app-sidebar"
        className={clsx(
          'fixed top-0 bottom-0 left-0 z-50 flex w-64 transform flex-col gap-4 p-4 transition-transform duration-300 ease-out md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <h2 id="sidebar-title" className="sr-only">
          {t('title')}
        </h2>
        <nav role="navigation" aria-labelledby="sidebar-title"></nav>
      </aside>
    </>
  );
};
