'use client';

import { useCallback, useState } from 'react';

type RootView = 'list' | 'task';

export const TASK_WIDGET_VIEWS: RootView[] = ['list', 'task'];

export const useTasksWidgetView = () => {
  const [rootView, setRootView] = useState<RootView>('list');

  const openCreateTaskView = useCallback(() => setRootView('task'), []);

  const openTaskListView = useCallback(() => setRootView('list'), []);

  return {
    rootView,
    openCreateTaskView,
    openTaskListView,
  };
};
