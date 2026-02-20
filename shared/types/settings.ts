export type TSettingType = 'range' | 'toggle' | 'select' | 'text';

export interface IBaseSettingConfig<T, K extends keyof T = keyof T> {
  key: K;
  label: string;
  description?: string;
  type: TSettingType;
}

export interface IRangeSetting<
  T,
  K extends keyof T = keyof T,
> extends IBaseSettingConfig<T, K> {
  type: 'range';
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export interface IToggleSetting<
  T,
  K extends keyof T = keyof T,
> extends IBaseSettingConfig<T, K> {
  type: 'toggle';
}

export interface ISelectSetting<
  T,
  K extends keyof T = keyof T,
> extends IBaseSettingConfig<T, K> {
  type: 'select';
  options: { label: string; value: T[K] }[];
}

export interface ITextSetting<
  T,
  K extends keyof T = keyof T,
> extends IBaseSettingConfig<T, K> {
  type: 'text';
  placeholder?: string;
  validation?: RegExp;
}

export type TWidgetSetting<T, K extends keyof T = keyof T> =
  | IRangeSetting<T, K>
  | IToggleSetting<T, K>
  | ISelectSetting<T, K>
  | ITextSetting<T, K>;

export interface ISettingsSection<T> {
  id: string;
  title: string;
  items: TWidgetSetting<T>[];
}

// helper type to get value type for a specific key
export type GetSettingValueType<T, K extends keyof T> = T[K];
