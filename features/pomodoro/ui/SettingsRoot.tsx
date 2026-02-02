import { useState } from 'react';

import { PanelStack } from '@/shared/ui';

type TSettingsRootProps = {
  onBack: () => void;
};

type TSettingsView = 'durations' | 'notifications';
const SETTINGS_VIEWS: TSettingsView[] = ['durations', 'notifications'];

export const SettingsRoot = ({ onBack }: TSettingsRootProps) => {
  const [settingsView, setSettingsView] = useState<TSettingsView>('durations');
  return (
    <div className="flex flex-col">
      <header>
        <button onClick={onBack}>back</button>
      </header>

      <PanelStack
        view={settingsView}
        views={SETTINGS_VIEWS}
        render={v => {
          if (v === 'durations') return <div>Durations Settings</div>;
          return <div>Notifications Settings</div>;
        }}
      />
    </div>
  );
};
