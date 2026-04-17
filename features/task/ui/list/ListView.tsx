import { Plus, Trash2 } from 'lucide-react';

import { TaskCard } from './TaskCard';
import { useTasks } from '@/entities/task';
import { Progress } from '@/shared/ui';

type TListViewProps = {
  openTaskView: () => void;
};

export const ListView = ({ openTaskView }: TListViewProps) => {
  const { tasks, clearCompleted } = useTasks();
  const completedCount = tasks.filter(task => task.isComplete).length;
  const progressValue = tasks.length
    ? (completedCount / tasks.length) * 100
    : 0;

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <header className="flex items-center justify-between">
        <h3>Tasks</h3>
        <button onClick={openTaskView}>
          <Plus strokeWidth={1.5} size={18} />
        </button>
      </header>
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <p id="progress-label" className="text-muted">
            Progress
          </p>

          <p id="task-status" aria-live="polite">
            {completedCount}/{tasks.length} completed
          </p>
        </div>

        <Progress
          aria-labelledby="progress-label"
          aria-valuetext={`${completedCount} of ${tasks.length} tasks completed`}
          value={progressValue}
          max={100}
        />
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
        {tasks
          .sort((a, b) => +a.isComplete - +b.isComplete)
          .map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        {completedCount ? (
          <button
            onClick={clearCompleted}
            className="text-muted hover:text-red flex items-center gap-1 text-xs"
          >
            <Trash2 size={12} />
            Clear Completed
          </button>
        ) : null}
      </div>
    </div>
  );
};
