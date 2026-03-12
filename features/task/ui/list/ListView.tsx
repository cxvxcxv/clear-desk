import { TaskCard } from './TaskCard';
import { useTasks } from '@/entities/task';

type TListViewProps = {
  openTaskView: () => void;
};

export const ListView = ({ openTaskView }: TListViewProps) => {
  const { tasks } = useTasks();
  if (!tasks) return <div>loading...</div>;

  console.log(tasks);
  return (
    <div className="flex flex-col gap-2">
      <button onClick={openTaskView}>add</button>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
