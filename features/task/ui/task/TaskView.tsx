import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { ITask, useTasks } from '@/entities/task';
import { Option, Select } from '@/shared/ui';

type TTaskFormValues = Omit<ITask, 'id' | 'isComplete'>;

type TTaskViewProps = {
  onBack: () => void;
  task?: ITask;
};

const DEFAULT_VALUES: TTaskFormValues = {
  name: '',
  priority: 'low',
  deadline: new Date().toISOString().split('T')[0],
};

export const TaskView = ({ task, onBack }: TTaskViewProps) => {
  const addTask = useTasks(state => state.addTask);
  const editTask = useTasks(state => state.editTask);

  const isEditing = Boolean(task?.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTaskFormValues>({
    values: task
      ? { name: task.name, priority: task.priority, deadline: task.deadline }
      : DEFAULT_VALUES,
  });

  const onSubmit = (data: TTaskFormValues) => {
    if (isEditing && task?.id) {
      editTask(task.id, { ...task, ...data });
    } else {
      addTask(data);
    }
    reset(DEFAULT_VALUES);
    onBack();
  };

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
          {isEditing ? 'Edit Task' : 'New Task'}
        </h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="task-name" className="text-sm font-medium">
            Task Name
          </label>
          <input
            id="task-name"
            className="border-border rounded border p-2"
            placeholder="Buy groceries"
            {...register('name', { required: 'Task name is required' })}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="task-deadline" className="text-sm font-medium">
            Deadline
          </label>
          <input
            id="task-deadline"
            className="border-border rounded border p-2"
            type="date"
            {...register('deadline')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="task-priority" className="text-sm font-medium">
            Priority
          </label>
          <Select
            id="task-priority"
            className="border"
            {...register('priority')}
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </div>

        <button
          type="submit"
          className="bg-primary mt-4 rounded p-2 font-bold text-white"
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};
