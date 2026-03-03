import { Option } from '../Option';
import { RangeInput } from '../RangeInput';
import { Select } from '../Select';
import { ToggleButton } from '../ToggleButton';

import { SettingRow } from './SettingRow';
import { TWidgetSetting } from '@/shared/types';

interface SettingItemRenderProps<T, K extends keyof T> {
  item: TWidgetSetting<T, K>;
  value: T[K];
  onChange: (newValue: T[K]) => void;
}

export function SettingItemRender<T, K extends keyof T>({
  item,
  value,
  onChange,
}: SettingItemRenderProps<T, K>) {
  switch (item.type) {
    case 'toggle': {
      return (
        <SettingRow label={item.label} description={item.description}>
          <ToggleButton
            isActive={Boolean(value)}
            onClick={() => onChange(!value as unknown as T[K])}
          />
        </SettingRow>
      );
    }

    case 'range': {
      return (
        <SettingRow label={item.label} description={item.description}>
          <div className="flex items-center gap-2">
            <RangeInput
              value={Number(value)}
              min={item.min}
              max={item.max}
              step={item.step}
              onChange={e =>
                onChange(Number(e.target.value) as unknown as T[K])
              }
            />
            <span className="min-w-[4ch] text-sm font-bold tabular-nums">
              {Number(value).toLocaleString()}
              {item.unit}
            </span>
          </div>
        </SettingRow>
      );
    }

    case 'select': {
      return (
        <SettingRow label={item.label} description={item.description}>
          <Select
            defaultValue={String(value)}
            onChange={e => onChange(e.target.value as unknown as T[K])}
            className="border-border border text-sm"
          >
            {item.options.map(o => (
              <Option key={String(o.value)} value={String(o.value)}>
                {o.label}
              </Option>
            ))}
          </Select>
        </SettingRow>
      );
    }

    case 'text': {
      return (
        <SettingRow label={item.label} description={item.description}>
          <input
            value={String(value)}
            placeholder={item.placeholder}
            onChange={e => {
              const val = e.target.value;
              onChange(val as unknown as T[K]);
            }}
            className="text-sm"
          />
        </SettingRow>
      );
    }

    default: {
      const _exhaustive: never = item;
      return _exhaustive;
    }
  }
}
