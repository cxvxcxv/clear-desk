'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeSwitcher } from '@/features/theme-switcher';

type THeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export const Header = ({ isSidebarOpen, onToggleSidebar }: THeaderProps) => {
  const t = useTranslations('aria');

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4">
      <div className="flex gap-4">
        <button
          aria-label={isSidebarOpen ? t('closeSidebar') : t('openSidebar')}
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu />
        </button>
        <h1 className="font-bold">ClearDesk</h1>
      </div>
      <div>
        <ThemeSwitcher />
        <button>locale</button>
      </div>
    </header>
  );
};
