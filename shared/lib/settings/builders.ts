import {
  IRangeSetting,
  ISelectSetting,
  ITextSetting,
  IToggleSetting,
} from '@/shared/types';

// generic range builder
//  T = The Settings Object (e.g. IPomodoroSettings)
//  K = The valid keys for numbers in that object

export function createRange<T, K extends keyof T>(
  key: K,
  config: Omit<IRangeSetting<T, K>, 'key' | 'type'>,
): IRangeSetting<T, K> {
  return {
    key,
    type: 'range',
    ...config,
  } as IRangeSetting<T, K>;
}

export function createToggle<T, K extends keyof T>(
  key: K,
  config: Omit<IToggleSetting<T, K>, 'key' | 'type'>,
): IToggleSetting<T, K> {
  return {
    key,
    type: 'toggle',
    ...config,
  } as IToggleSetting<T, K>;
}

export function createSelect<T, K extends keyof T>(
  key: K,
  config: Omit<ISelectSetting<T, K>, 'key' | 'type'>,
): ISelectSetting<T, K> {
  return {
    key,
    type: 'select',
    ...config,
  } as ISelectSetting<T, K>;
}

export function createText<T, K extends keyof T>(
  key: K,
  config: Omit<ITextSetting<T, K>, 'key' | 'type'>,
) {
  return {
    key,
    type: 'text',
    ...config,
  } as ITextSetting<T, K>;
}
