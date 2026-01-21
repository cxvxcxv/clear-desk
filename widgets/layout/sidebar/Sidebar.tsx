'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { SidebarItem } from './SidebarItem';
import { NAVIGATION } from '@/shared/config';

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
          role="presentation"
          aria-hidden
          className="bg-background/40 fixed inset-0 z-30 transition-colors duration-300 md:hidden"
          onClick={onSidebarClose}
        />
      )}
      <aside
        id="app-sidebar"
        className={clsx(
          'w-sidebar-width bg-card border-border top-header-height fixed bottom-0 left-0 z-40 flex transform flex-col gap-4 border-r-2 py-6 transition-all duration-300 md:static md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <h2 id="sidebar-title" className="sr-only">
          {t('navigation.title')}
        </h2>
        <nav aria-labelledby="sidebar-title">
          <ul className="flex flex-col gap-2">
            {NAVIGATION.map(item => (
              <li key={item.key}>
                <SidebarItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
