import { useTranslations } from 'next-intl';

import { TWidgetSetting } from '@/shared/types';

export function useTranslateSettings<T extends Record<string, unknown>>(
  namespace: string,
) {
  const t = useTranslations(namespace);
  const tUnits = useTranslations('general.units');

  return function translateItem<
    K extends keyof T & string,
    I extends TWidgetSetting<T, K>,
  >(item: I): I {
    const itemKey = item.key as string;

    const base = {
      ...item,
      label: t(`${itemKey}.label`),
      description: t(`${itemKey}.description`),
    };

    if (
      item.type === 'range' &&
      'unit' in item &&
      typeof item.unit === 'string'
    ) {
      return {
        ...base,
        unit: tUnits(item.unit),
      } as I;
    }

    return base as I;
  };
}
