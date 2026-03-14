import { Plus } from 'lucide-react';

import { TaskCard } from './TaskCard';
import { useTasks } from '@/entities/task';

type TListViewProps = {
  openTaskView: () => void;
};

export const ListView = ({ openTaskView }: TListViewProps) => {
  const { tasks } = useTasks();
  if (!tasks) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      <header className="flex justify-between">
        <h3>Tasks</h3>
        <button onClick={openTaskView}>
          <Plus strokeWidth={1.5} size={18} />
        </button>
      </header>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
