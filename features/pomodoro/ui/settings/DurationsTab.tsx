'use client';

import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useTranslateSettings } from './useTranslateSettings';
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
  const translate = useTranslateSettings('pomodoro.settings.durations');
  const tGeneral = useTranslations('pomodoro.settings.general');

  return (
    <div className="flex flex-col gap-6">
      {section.items.map(item => {
        const value = settings[item.key];

        const displayValue =
          typeof value === 'boolean'
            ? tGeneral(value ? 'on' : 'off')
            : String(value);

        const translated = translate(item);
        const label = translated.label;
        const unit = translated.type === 'range' ? translated.unit : undefined;

        return (
          <button
            key={String(item.key)}
            onClick={() => onSelect(item.key)}
            aria-label={label}
            className="group flex items-center justify-between"
          >
            <span className="text-left text-sm font-medium opacity-80 transition-opacity group-hover:opacity-100">
              {label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tabular-nums">
                {displayValue}
                {unit && (
                  <span className="text-muted ml-1 text-xs font-normal">
                    {unit}
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
