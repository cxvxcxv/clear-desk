import { POMODORO_SOUND_PACKS } from './constants';
import { IPomodoroSettings } from './types';
import { createRange, createSelect, createToggle } from '@/shared/lib';
import { ISettingsSection } from '@/shared/types';

export const POMODORO_SETTINGS_SCHEMA: Record<
  string,
  ISettingsSection<IPomodoroSettings>
> = {
  durations: {
    id: 'durations',
    items: [
      createRange('workMinutes', {
        min: 1,
        max: 60,
        step: 1,
        unit: 'min',
      }),
      createRange('shortBreakMinutes', {
        min: 1,
        max: 30,
        step: 1,
        unit: 'min',
      }),
      createRange('longBreakMinutes', {
        min: 5,
        max: 60,
        step: 1,
        unit: 'min',
      }),
      createRange('cyclesBeforeLongBreak', {
        min: 2,
        max: 10,
        step: 1,
        unit: 'cycles',
      }),
    ],
  },
  notifications: {
    id: 'notifications',
    items: [
      createToggle('isMuted', {}),
      createRange('volume', {
        min: 0,
        max: 100,
        step: 10,
        unit: 'percent',
      }),
      createSelect('soundPackId', {
        options: Object.values(POMODORO_SOUND_PACKS).map(pack => ({
          label: pack.name,
          value: pack.id,
        })),
      }),
    ],
  },
};
