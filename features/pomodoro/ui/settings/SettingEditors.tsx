'use client';

import { ChevronLeft, Minus, Plus } from 'lucide-react';

import {
  TPomodoroRangeSettingItem,
  TPomodoroSelectSettingItem,
  TPomodoroToggleSettingItem,
  usePomodoroSettings,
} from '@/entities/pomodoro';

type TSettingEditorProps = {
  onBack: () => void;
};

export const RangeSettingEditor = ({
  item,
  onBack,
}: { item: TPomodoroRangeSettingItem } & TSettingEditorProps) => {
  const settings = usePomodoroSettings();
  const value = settings[item.key];

  const update = (step: number) =>
    settings.updateSettings({ [item.key]: value + step });

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6">
      <button
        onClick={onBack}
        className="absolute top-0 left-0 flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-muted text-xs font-bold tracking-widest uppercase">
          {item.label}
        </h2>

        <div className="flex items-center gap-10">
          <ControlButton
            onClick={() => update(-item.step)}
            disabled={value <= item.min}
            icon={<Minus size={24} />}
          />

          <div className="flex flex-col">
            <span className="text-7xl leading-none font-black tabular-nums">
              {value}
            </span>
            <span className="text-muted mt-2 text-[10px] font-bold tracking-[0.2em] uppercase">
              {item.unit}
            </span>
          </div>

          <ControlButton
            onClick={() => update(item.step)}
            disabled={value >= item.max}
            icon={<Plus size={24} />}
          />
        </div>

        {item.description && (
          <p className="text-muted max-w-xs text-xs leading-relaxed opacity-80">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

export const ToggleSettingEditor = ({
  item,
  onBack,
}: { item: TPomodoroToggleSettingItem } & TSettingEditorProps) => {
  const settings = usePomodoroSettings();
  const value = settings[item.key];

  const toggle = () => settings.updateSettings({ [item.key]: !value });

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6">
      <button
        onClick={onBack}
        className="absolute top-0 left-0 flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-muted text-xs font-bold tracking-widest uppercase">
          {item.label}
        </h2>

        <button
          onClick={toggle}
          className={`flex h-16 w-32 items-center rounded-full border-2 transition-all ${
            value
              ? 'bg-foreground border-foreground'
              : 'border-border bg-background'
          }`}
        >
          <span className="w-full text-lg font-bold">
            {value ? 'ON' : 'OFF'}
          </span>
        </button>

        {item.description && (
          <p className="text-muted max-w-xs text-xs leading-relaxed opacity-80">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

export const SelectSettingEditor = ({
  item,
  onBack,
}: { item: TPomodoroSelectSettingItem } & TSettingEditorProps) => {
  const settings = usePomodoroSettings();
  const value = settings[item.key];

  const handleSelect = (newValue: typeof value) =>
    settings.updateSettings({ [item.key]: newValue });

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6">
      <button
        onClick={onBack}
        className="absolute top-0 left-0 flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-muted text-xs font-bold tracking-widest uppercase">
          {item.label}
        </h2>

        <div className="flex w-full max-w-xs flex-col gap-3">
          {item.options.map(option => (
            <button
              key={String(option.value)}
              onClick={() => handleSelect(option.value)}
              className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                value === option.value
                  ? 'border-foreground bg-foreground/10'
                  : 'border-border hover:border-foreground/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {item.description && (
          <p className="text-muted max-w-xs text-xs leading-relaxed opacity-80">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

const ControlButton = ({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all active:scale-90 disabled:opacity-20"
  >
    {icon}
  </button>
);
