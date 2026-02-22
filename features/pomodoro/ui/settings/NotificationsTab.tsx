'use client';

import {
  POMODORO_SETTINGS_SCHEMA,
  usePomodoroSettings,
} from '@/entities/pomodoro';
import { SettingItemRender } from '@/shared/ui';

export const NotificationsTab = () => {
  const settings = usePomodoroSettings();
  const section = POMODORO_SETTINGS_SCHEMA.notifications;

  if (!section) return null;

  return (
    <div role="tabpanel" className="flex flex-col gap-8 px-6 py-2">
      {section.items.map(item => (
        <SettingItemRender
          key={String(item.key)}
          item={item}
          value={settings[item.key]}
          onChange={val => settings.updateSettings({ [item.key]: val })}
        />
      ))}
    </div>
  );
};
