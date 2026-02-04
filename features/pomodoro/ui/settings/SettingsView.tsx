import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { DurationsView } from './DurationsView';
import { NotificationsView } from './NotificationsView';
import { PanelStack } from '@/shared/ui';

type TSettingsViewProps = {
  onBack: () => void;
};

type TSettingsView = 'durations' | 'notifications';
const SETTINGS_VIEWS: TSettingsView[] = ['durations', 'notifications'];

export const SettingsView = ({ onBack }: TSettingsViewProps) => {
  const [settingsView, setSettingsView] = useState<TSettingsView>('durations');
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <header className="grid w-full grid-cols-3 items-center">
        <button
          onClick={onBack}
          className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
        >
          <ChevronLeft strokeWidth={1.5} className="h-6 w-6" />
        </button>
        <h3 className="text-center text-lg font-semibold">Settings</h3>
        <div /> {/* spacer column */}
      </header>

      <nav className="bg-card flex items-center justify-center gap-8 rounded-full px-8 py-2 text-xs">
        <button
          className="uppercase"
          onClick={() => setSettingsView('durations')}
        >
          Durations
        </button>
        <button
          className="uppercase"
          onClick={() => setSettingsView('notifications')}
        >
          Notifications
        </button>
      </nav>

      <PanelStack
        view={settingsView}
        views={SETTINGS_VIEWS}
        render={v => {
          if (v === 'durations') return <DurationsView />;
          return <NotificationsView />;
        }}
      />
    </div>
  );
};
