import { useTranslations } from 'next-intl';

import { IPomodoroSettings } from '@/entities/pomodoro';
import { TWidgetSetting } from '@/shared/types';

export function useTranslateSettings(
  namespace: string,
): <I extends TWidgetSetting<IPomodoroSettings>>(item: I) => I {
  const t = useTranslations(namespace);
  const tUnits = useTranslations('pomodoro.settings.units');

  return function translateItem<I extends TWidgetSetting<IPomodoroSettings>>(
    item: I,
  ): I {
    const base: Partial<I> = {
      ...item,
      label: t(`${item.key}.label`),
      description: t(`${item.key}.description`),
    };

    if (item.type === 'range' && item.unit) {
      return {
        ...base,
        unit: tUnits(item.unit),
      } as I;
    }

    return base as I;
  };
}
