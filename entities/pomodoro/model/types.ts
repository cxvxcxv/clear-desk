import { IRangeSetting, ISelectSetting, IToggleSetting } from '@/shared/types';

export type TPomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

export interface IPomodoroState {
  phase: TPomodoroPhase;
  remainingSeconds: number;
  isRunning: boolean;
  completedCycles: number;
}

export interface IPomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
  isMuted: boolean;
  volume: number;
  soundPack: 'default';
}

export type TPomodoroSettingKey = keyof IPomodoroSettings;

export type TPomodoroRangeKey =
  | 'workMinutes'
  | 'shortBreakMinutes'
  | 'longBreakMinutes'
  | 'cyclesBeforeLongBreak'
  | 'volume';
export type TPomodoroToggleKey = 'isMuted';
export type TPomodoroSelectKey = 'soundPack';

export type TPomodoroRangeSettingItem<
  K extends TPomodoroRangeKey = TPomodoroRangeKey,
> = IRangeSetting<IPomodoroSettings, K>;

export type TPomodoroToggleSettingItem<
  K extends TPomodoroToggleKey = TPomodoroToggleKey,
> = IToggleSetting<IPomodoroSettings, K>;

export type TPomodoroSelectSettingItem<
  K extends TPomodoroSelectKey = TPomodoroSelectKey,
> = ISelectSetting<IPomodoroSettings, K>;

export type TPomodoroSettingItem =
  | TPomodoroRangeSettingItem
  | TPomodoroToggleSettingItem
  | TPomodoroSelectSettingItem;
