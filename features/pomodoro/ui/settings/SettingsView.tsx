'use client';

import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { DetailEditor } from './DetailEditor';
import { DurationsTab } from './DurationsTab';
import { NotificationsTab } from './NotificationsTab';
import { TDetailView } from '@/entities/pomodoro';
import { PanelStack, SegmentedControl } from '@/shared/ui';

type TSettingsTab = 'durations' | 'notifications';

export const SettingsView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<TSettingsTab>('durations');
  const [activeDetailView, setActiveDetailView] = useState<TDetailView | null>(
    null,
  );
  const t = useTranslations('pomodoro.settings');

  // Handle Detail View Overlay
  if (activeDetailView) {
    return (
      <DetailEditor
        type={activeDetailView}
        onBack={() => setActiveDetailView(null)}
      />
    );
  }

  const TABS = [
    {
      id: 'durations',
      label: t('durations'),
      component: <DurationsTab onSelectDetail={setActiveDetailView} />,
    },
    {
      id: 'notifications',
      label: t('notifications'),
      component: <NotificationsTab />,
    },
  ];

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <header className="grid w-full grid-cols-3 items-center">
        <button
          onClick={onBack}
          className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <h3 className="text-center text-lg font-bold">{t('title')}</h3>
      </header>

      <SegmentedControl
        value={activeTab}
        onChange={v => setActiveTab(v as TSettingsTab)}
        items={TABS.map(({ id, label }) => ({ id, label }))}
      />

      <PanelStack
        view={activeTab}
        views={TABS.map(tab => tab.id)}
        render={currentView => TABS.find(t => t.id === currentView)?.component}
      />
    </div>
  );
};
