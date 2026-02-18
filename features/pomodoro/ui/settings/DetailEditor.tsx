'use client';

import { ChevronLeft } from 'lucide-react';

import { TDetailView } from './SettingsView';
import { usePomodoroSettings } from '@/entities/pomodoro';

type TDetailEditorProps = {
  type: TDetailView;
  onBack: () => void;
};

export const DetailEditor = ({ type, onBack }: TDetailEditorProps) => {
  const config = {
    work: { key: 'workMinutes', label: 'Work Duration' },
    shortBreak: { key: 'shortBreakMinutes', label: 'Short Break' },
    longBreak: { key: 'longBreakMinutes', label: 'Long Break' },
    cyclesBeforeLongBreak: { key: 'cyclesBeforeLongBreak', label: 'Cycles' },
  }[type!];

  const settings = usePomodoroSettings();

  const value = settings[config.key as keyof typeof settings] as number;

  return (
    <div className="flex h-full flex-col justify-center">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </button>
      <div className="flex flex-col items-center gap-6">
        <span className="text-muted text-sm font-medium tracking-widest uppercase">
          {config.label}
        </span>
        <div className="flex items-center gap-8">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl transition-transform active:scale-90"
            onClick={() =>
              settings.updateSettings({ [config.key]: Math.max(1, value - 1) })
            }
          >
            –
          </button>
          <span className="text-6xl font-bold tabular-nums">{value}</span>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl transition-transform active:scale-90"
            onClick={() => settings.updateSettings({ [config.key]: value + 1 })}
          >
            +
          </button>
        </div>
        <span className="text-muted text-sm font-medium tracking-widest">
          min
        </span>
      </div>
    </div>
  );
};
