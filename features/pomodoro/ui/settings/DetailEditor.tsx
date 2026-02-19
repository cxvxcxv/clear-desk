'use client';

import { ChevronLeft, Minus, Plus } from 'lucide-react';

import {
  POMODORO_SETTING_SCHEMAS,
  TDetailView,
  usePomodoroSettings,
} from '@/entities/pomodoro';

export const DetailEditor = ({
  type,
  onBack,
}: {
  type: TDetailView;
  onBack: () => void;
}) => {
  const settings = usePomodoroSettings();
  const schema = POMODORO_SETTING_SCHEMAS[type];
  const value = settings[schema.key as keyof typeof settings] as number;

  const update = (step: number) =>
    settings.updateSettings({ [schema.key]: value + step });

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6">
      <button
        onClick={onBack}
        className="absolute top-0 left-0 flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
          {schema.label}
        </h2>

        <div className="flex items-center gap-10">
          <ControlButton
            onClick={() => update(-1)}
            disabled={value <= schema.min}
            icon={<Minus size={24} />}
          />

          <div className="flex flex-col">
            <span className="text-7xl leading-none font-black tabular-nums">
              {value}
            </span>
            <span className="text-muted-foreground mt-2 text-[10px] font-bold tracking-[0.2em] uppercase">
              {schema.unit}
            </span>
          </div>

          <ControlButton
            onClick={() => update(1)}
            disabled={value >= schema.max}
            icon={<Plus size={24} />}
          />
        </div>

        <p className="text-muted-foreground max-w-xs text-xs leading-relaxed opacity-80">
          {schema.description}
        </p>
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
