import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { ITask, TPriority, useTasks } from '@/entities/task';
import { Option, Select } from '@/shared/ui';

type TTaskViewProps = {
  onBack: () => void;
  task?: ITask;
};

export const TaskView = ({ task, onBack }: TTaskViewProps) => {
  const addTask = useTasks(state => state.addTask);
  const editTask = useTasks(state => state.editTask);
  const [data, setData] = useState<ITask>({} as ITask);

  const handleSave = () => {
    if (task) editTask(task.id, data);
    else addTask(data);
  };

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <header className="grid w-full grid-cols-3 items-center">
        <button
          autoFocus
          className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
          onClick={onBack}
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h3 className="text-center text-lg font-bold">Task</h3>
      </header>
      <form id="task-form" className="flex flex-col gap-2">
        <input
          id="task-name"
          type="text"
          value={task?.name}
          placeholder="name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <input
          id="task-deadline"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          onChange={e =>
            setData({ ...data, deadline: new Date(e.target.value) })
          }
        />
        <Select
          onChange={e =>
            setData({ ...data, priority: e.target.value as TPriority })
          }
        >
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
        <button id="task-save" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};
