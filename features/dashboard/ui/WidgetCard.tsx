'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { TWidgetType } from '@/entities/widget';

type TWidgetCardProps = {
  type: TWidgetType;
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

export const WidgetCard = ({
  type,
  children,
  onEdit,
  onDelete,
  className,
}: TWidgetCardProps) => {
  const t = useTranslations('widgets');
  return (
    <div
      role="region"
      aria-label={t(type)}
      className={clsx(
        'border-border col-span-1 row-span-1 flex flex-col rounded border shadow-sm',
        className,
      )}
    >
      <header className="bg-card border-border flex items-center justify-between border-b p-2">
        <h3 className="font-medium">{t(type)}</h3>
        <div className="flex gap-2">
          {onEdit && <button onClick={onEdit}>Edit</button>}
          {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
      </header>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};
