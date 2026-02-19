'use client';

import { ChevronRight } from 'lucide-react';

import {
  POMODORO_SETTING_SCHEMAS,
  TDetailView,
  usePomodoroSettings,
} from '@/entities/pomodoro';

const SettingRow = ({
  id,
  onSelect,
}: {
  id: TDetailView;
  onSelect: (v: TDetailView) => void;
}) => {
  const settings = usePomodoroSettings();
  const config = POMODORO_SETTING_SCHEMAS[id];
  const value = settings[config.key as keyof typeof settings];

  return (
    <button
      onClick={() => onSelect(id)}
      className="group flex items-center justify-between"
    >
      <span className="text-sm font-medium">{config.label}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tabular-nums">
          {String(value)}
          <span className="text-muted-foreground ml-1 text-xs font-normal">
            {config.unit}
          </span>
        </span>
        <ChevronRight
          size={18}
          className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors"
        />
      </div>
    </button>
  );
};

export const DurationsTab = ({
  onSelectDetail,
}: {
  onSelectDetail: (v: TDetailView) => void;
}) => {
  const settingKeys = Object.keys(POMODORO_SETTING_SCHEMAS) as TDetailView[];

  return (
    <div role="tabpanel" className="flex flex-col gap-4 px-6">
      {settingKeys.map(key => (
        <SettingRow key={key} id={key} onSelect={onSelectDetail} />
      ))}
    </div>
  );
};
