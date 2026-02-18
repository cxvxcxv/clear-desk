'use client';

import { ChevronRight } from 'lucide-react';

import { TDetailView } from './SettingsView';
import { usePomodoroSettings } from '@/entities/pomodoro';

type TDurationsTabProps = {
  onSelectDetail: (v: TDetailView) => void;
};

export const DurationsTab = ({ onSelectDetail }: TDurationsTabProps) => {
  const settings = usePomodoroSettings();

  const items = [
    { id: 'work', label: 'Work', val: settings.workMinutes },
    { id: 'shortBreak', label: 'Short Break', val: settings.shortBreakMinutes },
    { id: 'longBreak', label: 'Long Break', val: settings.longBreakMinutes },
    {
      id: 'cyclesBeforeLongBreak',
      label: 'Sessions until long break',
      val: settings.cyclesBeforeLongBreak,
    },
  ] as const;

  return (
    <div role="tabpanel" className="flex flex-col gap-4 px-24 text-sm">
      {items.map(item => (
        <button
          key={item.id}
          className="flex justify-between"
          onClick={() => onSelectDetail(item.id)}
        >
          <span>{item.label}</span>
          <span className="flex items-center gap-2 text-lg font-bold">
            {item.val} <ChevronRight strokeWidth={1.25} />
          </span>
        </button>
      ))}
    </div>
  );
};
