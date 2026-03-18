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
        <span id="completed-tasks-count">
          {completedCount} / {tasks.length}
        </span>
        <Progress
          aria-labelledby="completed-tasks-count"
          value={completedCount}
          max={tasks.length}
        ></Progress>
      </div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
