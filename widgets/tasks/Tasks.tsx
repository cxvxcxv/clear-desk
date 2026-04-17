'use client';

import {
  TASK_WIDGET_VIEWS,
  useTasksWidgetView,
} from './model/useTasksWidgetView';
import { ListView, TaskView } from '@/features/task';
import { PanelStack } from '@/shared/ui';

export const Tasks = () => {
  const { rootView, selectedTask, openCreateTaskView, openTaskListView } =
    useTasksWidgetView();

  return (
    <PanelStack
      view={rootView}
      views={TASK_WIDGET_VIEWS}
      render={v => {
        if (v === 'list') return <ListView openTaskView={openCreateTaskView} />;
        return <TaskView onBack={openTaskListView} task={selectedTask} />;
      }}
    />
  );
};
