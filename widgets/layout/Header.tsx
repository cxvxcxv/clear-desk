'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/features/locale-switcher/';
import { ThemeSwitcher } from '@/features/theme-switcher';

type THeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export const Header = ({ isSidebarOpen, onToggleSidebar }: THeaderProps) => {
  const t = useTranslations('aria');

  return (
    <header className="bg-card border-border h-header-height sticky top-0 z-50 flex shrink-0 items-center justify-between border-b-2 px-4 transition-colors duration-300">
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
        <h1 className="text-2xl font-semibold tracking-wide">ClearDesk</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </header>
  );
};
