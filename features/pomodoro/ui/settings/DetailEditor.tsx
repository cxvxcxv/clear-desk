'use client';

import {
  RangeSettingEditor,
  SelectSettingEditor,
  ToggleSettingEditor,
} from './SettingEditors';
import { useTranslateSettings } from './useTranslateSettings';
import {
  POMODORO_SETTINGS_SCHEMA,
  TPomodoroRangeSettingItem,
  TPomodoroSelectSettingItem,
  TPomodoroSettingItem,
  TPomodoroSettingKey,
  TPomodoroToggleSettingItem,
} from '@/entities/pomodoro';

export const DetailEditor = ({
  type,
  onBack,
}: {
  type: TPomodoroSettingKey;
  onBack: () => void;
}) => {
  const found = findSettingItem(type);
  const sectionId = found?.sectionId ?? 'durations';
  const translate = useTranslateSettings(`pomodoro.settings.${sectionId}`);

  if (!found) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted">Setting not found</p>
      </div>
    );
  }

  const { item } = found;
  const translatedItem = translate(item);

  switch (item.type) {
    case 'range':
      return (
        <RangeSettingEditor
          item={translatedItem as TPomodoroRangeSettingItem}
          onBack={onBack}
        />
      );

    case 'toggle':
      return (
        <ToggleSettingEditor
          item={translatedItem as TPomodoroToggleSettingItem}
          onBack={onBack}
        />
      );

    case 'select':
      return (
        <SelectSettingEditor
          item={translatedItem as TPomodoroSelectSettingItem}
          onBack={onBack}
        />
      );

    default:
      const _exhaustive: never = item;
      return _exhaustive;
  }
};

function findSettingItem(
  key: TPomodoroSettingKey,
): { item: TPomodoroSettingItem; sectionId: string } | undefined {
  const sections = Object.entries(POMODORO_SETTINGS_SCHEMA) as [
    string,
    (typeof POMODORO_SETTINGS_SCHEMA)[string],
  ][];

  for (const [sectionId, section] of sections) {
    const item = section.items.find(i => i.key === key);
    if (item) return { item: item as TPomodoroSettingItem, sectionId };
  }

  return undefined;
}
