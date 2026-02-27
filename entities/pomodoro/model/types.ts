import { IRangeSetting, ISelectSetting, IToggleSetting } from '@/shared/types';

export type TPomodoroPhase = 'work' | 'shortBreak' | 'longBreak';
export type TPomodoroSoundPackId = 'minimal' | 'nature' | 'retro';

export interface IPomodoroState {
  phase: TPomodoroPhase;
  remainingSeconds: number;
  isRunning: boolean;
  completedCycles: number;
}

export interface IPomodoroSoundPack {
  id: TPomodoroSoundPackId;
  name: string;
  phases: Record<TPomodoroPhase, string>;
  tickFreq: number;
}

export interface IPomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
  isMuted: boolean;
  volume: number;
  soundPackId: TPomodoroSoundPackId;
}

export type TPomodoroSettingKey = keyof IPomodoroSettings;

export type TPomodoroRangeKey =
  | 'workMinutes'
  | 'shortBreakMinutes'
  | 'longBreakMinutes'
  | 'cyclesBeforeLongBreak'
  | 'volume';
export type TPomodoroToggleKey = 'isMuted';
export type TPomodoroSelectKey = 'soundPackId';

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
