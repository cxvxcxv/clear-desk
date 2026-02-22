import { IPomodoroSettings } from './types';
import { createRange, createSelect, createToggle } from '@/shared/lib';
import { ISettingsSection } from '@/shared/types';

export const POMODORO_SETTINGS_SCHEMA: Record<
  string,
  ISettingsSection<IPomodoroSettings>
> = {
  durations: {
    id: 'durations',
    title: 'Durations',
    items: [
      createRange('workMinutes', {
        label: 'Work',
        min: 1,
        max: 60,
        step: 1,
        unit: 'min',
        description: 'Duration of work sessions',
      }),
      createRange('shortBreakMinutes', {
        label: 'Short Break',
        min: 1,
        max: 30,
        step: 1,
        unit: 'min',
        description: 'Duration of short breaks',
      }),
      createRange('longBreakMinutes', {
        label: 'Long Break',
        min: 5,
        max: 60,
        step: 1,
        unit: 'min',
        description: 'Duration of long breaks',
      }),
      createRange('cyclesBeforeLongBreak', {
        label: 'Cycles Before Long Break',
        min: 2,
        max: 10,
        step: 1,
        unit: 'cycles',
        description: 'Number of work cycles before a long break',
      }),
    ],
  },
  notifications: {
    id: 'notifications',
    title: 'Notifications',
    items: [
      createToggle('isMuted', {
        label: 'Mute Sounds',
        description: 'Disable sound notifications',
      }),
      createRange('volume', {
        label: 'Volume',
        min: 0,
        max: 100,
        step: 10,
        unit: '%',
        description: 'Notification volume level',
      }),
      createSelect('soundPack', {
        label: 'Sound Pack',
        options: [{ label: 'Default', value: 'default' }],
        description: 'Select your sound pack',
      }),
    ],
  },
};
