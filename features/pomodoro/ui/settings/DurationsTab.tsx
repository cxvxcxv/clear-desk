'use client';

import { ChevronRight } from 'lucide-react';

import {
  IPomodoroSettings,
  POMODORO_SETTINGS_SCHEMA,
  usePomodoroSettings,
} from '@/entities/pomodoro';
import { ISettingsSection } from '@/shared/types';

const SettingRow = ({
  section,
  onSelect,
}: {
  section: ISettingsSection<IPomodoroSettings>;
  onSelect: (v: keyof IPomodoroSettings) => void;
}) => {
  const settings = usePomodoroSettings();

  return (
    <div className="flex flex-col gap-6">
      {section.items.map(item => {
        const value = settings[item.key];

        const displayValue =
          typeof value === 'boolean' ? (value ? 'On' : 'Off') : String(value);

        return (
          <button
            key={String(item.key)}
            onClick={() => onSelect(item.key)}
            className="group flex items-center justify-between"
          >
            <span className="text-sm font-medium opacity-80 transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tabular-nums">
                {displayValue}
                {item.type === 'range' && item.unit && (
                  <span className="text-muted ml-1 text-xs font-normal">
                    {item.unit}
                  </span>
                )}
              </span>
              <ChevronRight
                size={18}
                className="opacity-40 transition-all group-hover:translate-x-1"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export const DurationsTab = ({
  onSelectDetail,
}: {
  onSelectDetail: (v: keyof IPomodoroSettings) => void;
}) => {
  const durationsSection = POMODORO_SETTINGS_SCHEMA.durations;

  return (
    <div role="tabpanel" className="flex flex-col gap-4 px-6">
      {durationsSection && (
        <SettingRow section={durationsSection} onSelect={onSelectDetail} />
      )}
    </div>
  );
};
