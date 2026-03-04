import { ITask } from '@/entities/task';
import { Task } from '@/features/task';

const TASKS_MOCK: ITask[] = [
  {
    id: '1',
    name: 'test name',
    isComplete: false,
    deadline: new Date(),
    priority: 'medium',
  },
  {
    id: '2',
    name: 'test name',
    isComplete: false,
    priority: 'medium',
  },
];

export const Tasks = () => {
  return (
    <div className="flex flex-col gap-2">
      {TASKS_MOCK.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
