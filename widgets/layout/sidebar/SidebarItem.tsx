'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { TSidebarItem } from '@/entities';
import { Link, usePathname } from '@/i18n/navigation';

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
        isActive ? 'border-primary bg-primary/10' : 'border-transparent',
      )}
    >
      <item.icon strokeWidth={1.5} />
      <span>{t(item.key)}</span>
    </Link>
  );
};
