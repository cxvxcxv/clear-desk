import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { DetailEditor } from './DetailEditor';
import { DurationsTab } from './DurationsTab';
import { NotificationsTab } from './NotificationsTab';
import { PanelStack, SegmentedControl } from '@/shared/ui';

export type TDetailView =
  | 'work'
  | 'shortBreak'
  | 'longBreak'
  | 'cyclesBeforeLongBreak'
  | null;

type TSettingsViewProps = {
  onBack: () => void;
};

type TSettingsTab = 'durations' | 'notifications';
const SETTINGS_TABS: TSettingsTab[] = ['durations', 'notifications'];

export const SettingsView = ({ onBack }: TSettingsViewProps) => {
  const [activeTab, setActiveTab] = useState<TSettingsTab>('durations');
  const [activeDetail, setActiveDetail] = useState<TDetailView>(null);
  const t = useTranslations('pomodoro.settings');

  const items = [
    { id: 'durations', label: t('durations') },
    { id: 'notifications', label: t('notifications') },
  ] as const;

  if (activeDetail) {
    return (
      <DetailEditor type={activeDetail} onBack={() => setActiveDetail(null)} />
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <header className="grid w-full grid-cols-3 items-center">
        <button
          aria-label={t('back')}
          className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
          onClick={onBack}
        >
          <ChevronLeft strokeWidth={1.5} className="h-6 w-6" />
        </button>
        <h3 className="text-center text-lg font-semibold">{t('title')}</h3>
        <div /> {/* spacer column */}
      </header>

      <SegmentedControl
        value={activeTab}
        onChange={value => setActiveTab(value)}
        items={items}
      />

      <PanelStack
        view={activeTab}
        views={SETTINGS_TABS}
        render={v => {
          if (v === 'durations')
            return <DurationsTab onSelectDetail={setActiveDetail} />;
          return <NotificationsTab />;
        }}
      />
    </div>
  );
};
