import { BarChart3, Info, LayoutGrid, Settings } from 'lucide-react';

import { TSidebarItem } from '@/shared/entities';

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
