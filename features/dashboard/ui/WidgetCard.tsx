'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { TWidgetType } from '@/entities/widget';

type TWidgetCardProps = {
  type: TWidgetType;
  children: ReactNode;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const WidgetCard = ({
  type,
  children,
  className,
  onEdit,
  onDelete,
}: TWidgetCardProps) => {
  const t = useTranslations('widgets');
  const titleId = `widget-title-${type}`;

  return (
    <section
      aria-labelledby={titleId}
      className={clsx(
        'border-border flex h-full flex-col rounded border shadow-sm',
        className,
      )}
    >
      <header className="bg-card border-border flex items-center justify-between border-b p-2">
        <h3 id={titleId} className="font-medium">
          {t(type)}
        </h3>
        <div className="flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Edit ${t(type)}`}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              aria-label={`Delete ${t(type)}`}
            >
              Delete
            </button>
          )}
        </div>
      </header>
      <div className="flex-1 p-4">{children}</div>
    </section>
  );
};
