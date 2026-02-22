'use client';

import {
  RangeSettingEditor,
  SelectSettingEditor,
  ToggleSettingEditor,
} from './SettingEditors';
import {
  POMODORO_SETTINGS_SCHEMA,
  TPomodoroSettingItem,
  TPomodoroSettingKey,
} from '@/entities/pomodoro';

export const DetailEditor = ({
  type,
  onBack,
}: {
  type: TPomodoroSettingKey;
  onBack: () => void;
}) => {
  const item = findSettingItem(type);

  if (!item) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted">Setting not found</p>
      </div>
    );
  }

  switch (item.type) {
    case 'range':
      return <RangeSettingEditor item={item} onBack={onBack} />;

    case 'toggle':
      return <ToggleSettingEditor item={item} onBack={onBack} />;

    case 'select':
      return <SelectSettingEditor item={item} onBack={onBack} />;

    default:
      const _exhaustive: never = item;
      return _exhaustive;
  }
};

function findSettingItem(
  key: TPomodoroSettingKey,
): TPomodoroSettingItem | undefined {
  const sections = Object.values(POMODORO_SETTINGS_SCHEMA);

  for (const section of sections) {
    const item = section.items.find(i => i.key === key);
    if (item) return item as TPomodoroSettingItem;
  }

  return undefined;
}
