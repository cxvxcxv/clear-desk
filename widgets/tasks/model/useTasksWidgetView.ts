'use client';

import { useCallback, useState } from 'react';

import { ITask } from '@/entities/task';

type TRootView = 'list' | 'task';

export const TASK_WIDGET_VIEWS: TRootView[] = ['list', 'task'];

export const useTasksWidgetView = () => {
  const [rootView, setRootView] = useState<TRootView>('list');
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();

  const openCreateTaskView = useCallback(() => {
    setSelectedTask(undefined);
    setRootView('task');
  }, []);

  const openTaskListView = useCallback(() => {
    setRootView('list');
  }, []);

  return {
    rootView,
    selectedTask,
    openCreateTaskView,
    openTaskListView,
    setSelectedTask,
  };
};
