'use client';

import { useState } from 'react';

import { SettingsView, TimerView } from '@/features/pomodoro';
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
