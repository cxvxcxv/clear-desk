import { Plus } from 'lucide-react';

import { TaskCard } from './TaskCard';
import { useTasks } from '@/entities/task';
import { Progress } from '@/shared/ui';

type TListViewProps = {
  openTaskView: () => void;
};

export const ListView = ({ openTaskView }: TListViewProps) => {
  const { tasks } = useTasks();
  const completedCount = tasks.filter(task => task.isComplete).length;

  if (!tasks) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      <header className="flex justify-between">
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
          value={(completedCount / tasks.length) * 100}
          max={100}
        />
      </div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
