import { BarChart3, Info, LayoutGrid, Settings } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type TSidebarItem = {
  key: string;
  href: string;
  icon: LucideIcon;
};

export const NAVIGATION: TSidebarItem[] = [
  {
    key: 'dashboard',
    href: '/',
    icon: BarChart3,
  },
  {
    key: 'widgets',
    href: '/widgets',
    icon: LayoutGrid,
  },
  {
    key: 'settings',
    href: '/settings',
    icon: Settings,
  },
  {
    key: 'about',
    href: '/about',
    icon: Info,
  },
];
