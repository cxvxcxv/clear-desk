'use client';

import { useState } from 'react';

import { ListView, TaskView } from '@/features/task';
import { PanelStack } from '@/shared/ui';

type TRootView = 'list' | 'task';
const ROOT_VIEWS: TRootView[] = ['list', 'task'];

export const Tasks = () => {
  const [rootView, setRootView] = useState<TRootView>('list');
  return (
    <PanelStack
      view={rootView}
      views={ROOT_VIEWS}
      render={v => {
        if (v === 'list')
          return <ListView openTaskView={() => setRootView('task')} />;
        return <TaskView />;
      }}
    />
  );
};
