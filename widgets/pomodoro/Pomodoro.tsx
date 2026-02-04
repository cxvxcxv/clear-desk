'use client';

import { useState } from 'react';

import { TimerView } from '../../features/pomodoro/ui/TimerView';
import { SettingsView } from '../../features/pomodoro/ui/settings/SettingsView';

import { PanelStack } from '@/shared/ui';

type TRootView = 'timer' | 'settings';
const ROOT_VIEWS: TRootView[] = ['timer', 'settings'];

export const Pomodoro = () => {
  const [rootView, setRootView] = useState<TRootView>('timer');
  return (
    <PanelStack
      view={rootView}
      views={ROOT_VIEWS}
      render={v => {
        if (v === 'timer')
          return <TimerView openSettings={() => setRootView('settings')} />;
        return <SettingsView onBack={() => setRootView('timer')} />;
      }}
    />
  );
};
