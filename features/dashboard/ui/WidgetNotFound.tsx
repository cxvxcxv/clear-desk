'use client';

import { useTranslations } from 'next-intl';

type TWidgetNotFoundProps = {
  type: string;
};

export const WidgetNotFound = ({ type }: TWidgetNotFoundProps) => {
  const t = useTranslations('widgets');

  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex flex-col items-center justify-center"
    >
      <p className="text-sm font-medium">{t('notFound.title', { type })}</p>
      <p className="text-xs">{t('notFound.description')}</p>
    </div>
  );
};
