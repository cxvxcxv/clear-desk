import { TDetailView } from './types';

export interface ISettingConfig {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  description?: string;
}

export const POMODORO_SETTING_SCHEMAS: Record<TDetailView, ISettingConfig> = {
  work: {
    key: 'workMinutes',
    label: 'Work Duration',
    unit: 'min',
    min: 1,
    max: 60,
    step: 1,
    description: 'The time you will focus on your task.',
  },
  shortBreak: {
    key: 'shortBreakMinutes',
    label: 'Short Break',
    unit: 'min',
    min: 1,
    max: 60,
    step: 1,
    description: 'A brief rest to recharge.',
  },
  longBreak: {
    key: 'longBreakMinutes',
    label: 'Long Break',
    unit: 'min',
    min: 10,
    max: 60,
    step: 1,
    description: 'A longer break after several cycles.',
  },
  cyclesBeforeLongBreak: {
    key: 'cyclesBeforeLongBreak',
    label: 'Long Break After',
    unit: 'sets',
    min: 1,
    max: 10,
    step: 1,
    description: 'Number of work sessions before a long break.',
  },
};
