'use client';

import { useState } from 'react';

import { ITask } from '@/entities/task';
import { ListView, TaskView } from '@/features/task';
import { PanelStack } from '@/shared/ui';

type TRootView = 'list' | 'task';
const ROOT_VIEWS: TRootView[] = ['list', 'task'];

export const Tasks = () => {
  const [rootView, setRootView] = useState<TRootView>('list');
  const [selectedTask, setSelectedTask] = useState<ITask>({} as ITask);
  return (
    <PanelStack
      view={rootView}
      views={ROOT_VIEWS}
      render={v => {
        if (v === 'list')
          return (
            <ListView
              openTaskView={() => setRootView('task')}
              onTaskSelect={setSelectedTask}
            />
          );
        return (
          <TaskView onBack={() => setRootView('list')} task={selectedTask} />
        );
      }}
    />
  );
};
