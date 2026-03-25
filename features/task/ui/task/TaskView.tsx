import { ChevronLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { ITask, TPriority, useTasks } from '@/entities/task';
import { Option, Select } from '@/shared/ui';

type TTaskViewProps = {
  onBack: () => void;
  task?: ITask;
};

export const TaskView = ({ task, onBack }: TTaskViewProps) => {
  const addTask = useTasks(state => state.addTask);
  const editTask = useTasks(state => state.editTask);

  const [data, setData] = useState<Omit<ITask, 'id' | 'isComplete'>>(
    task || {
      name: '',
      priority: 'low',
      deadline: new Date(),
    },
  );

  const [prevTaskId, setPrevTaskId] = useState(task?.id);

  if (task?.id !== prevTaskId) {
    setPrevTaskId(task?.id);
    if (task) setData(task);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!data.name) return;

    if (task?.id) {
      editTask(task.id, data as ITask);
    } else {
      addTask(data);
    }

    setData({
      name: '',
      priority: 'low',
      deadline: new Date(),
    });

    onBack();
  };

  const dateValue = data.deadline
    ? new Date(data.deadline).toISOString().split('T')[0]
    : '';

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <header className="grid w-full grid-cols-3 items-center">
        <button
          type="button"
          autoFocus
          className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
          onClick={onBack}
          aria-label="Go back to task list"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Back</span>
        </button>
        <h1 className="text-center text-lg font-bold">
          {task ? 'Edit Task' : 'New Task'}
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="task-name" className="text-sm font-medium">
            Task Name
          </label>
          <input
            id="task-name"
            className="rounded border p-2"
            type="text"
            required
            value={data.name || ''}
            placeholder="e.g. Buy groceries"
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="task-deadline" className="text-sm font-medium">
            Deadline
          </label>
          <input
            id="task-deadline"
            className="rounded border p-2"
            type="date"
            value={dateValue}
            onChange={e =>
              setData({ ...data, deadline: new Date(e.target.value) })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="task-priority" className="text-sm font-medium">
            Priority
          </label>
          <Select
            id="task-priority"
            value={data.priority}
            onChange={e =>
              setData({ ...data, priority: e.target.value as TPriority })
            }
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </div>

        <button
          className="bg-primary mt-4 rounded p-2 font-bold text-white"
          type="submit"
        >
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};
