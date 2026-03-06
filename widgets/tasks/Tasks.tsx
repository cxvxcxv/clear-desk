'use client';

import { ITask, useTasks } from '@/entities/task';
import { Task } from '@/features/task';

const TASK_MOCK: ITask = {
  id: '2',
  name: 'test name test name test name test name test name test name test name test name test name test name test name test name test name test name',
  isComplete: false,
  priority: 'low',
};

export const Tasks = () => {
  const addTask = useTasks(state => state.addTask);
  const { tasks } = useTasks();
  if (tasks)
    return (
      <div className="flex flex-col gap-2">
        <button onClick={() => addTask(TASK_MOCK)}>add</button>
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
};
