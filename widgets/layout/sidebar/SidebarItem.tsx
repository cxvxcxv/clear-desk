'use client';

import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

export type TSidebarItem = {
  key: string;
  href: string;
  icon: LucideIcon;
};

type TSidebarItemProps = {
  item: TSidebarItem;
};

export const SidebarItem = ({ item }: TSidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  const t = useTranslations('navigation');
  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'hover:bg-primary/10 active:bg-primary/10 flex gap-2 border-l-4 p-3',
        isActive
          ? 'border-primary bg-primary/10 font-medium'
          : 'border-transparent',
      )}
    >
      <item.icon strokeWidth={1.5} />
      <span>{t(item.key)}</span>
    </Link>
  );
};
