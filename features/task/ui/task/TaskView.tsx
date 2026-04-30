import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import { ITask, useTasks } from '@/entities/task';
import { Option, Select } from '@/shared/ui';

type TTaskFormValues = Omit<ITask, 'id' | 'isComplete'>;

type TTaskViewProps = {
  onBack: () => void;
};

const DEFAULT_TASK_VALUES: TTaskFormValues = {
  name: '',
  priority: 'low',
  deadline: new Date().toISOString().split('T')[0],
};

export const TaskView = ({ onBack }: TTaskViewProps) => {
  const addTask = useTasks(state => state.addTask);
  const tGeneral = useTranslations('general');
  const t = useTranslations('task');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TTaskFormValues>({
    defaultValues: DEFAULT_TASK_VALUES,
  });

  const onSubmit = (data: TTaskFormValues) => {
    addTask(data);

    reset(DEFAULT_TASK_VALUES);
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
        >
          <ChevronLeft size={16} />
          <span>{t('taskView.back')}</span>
        </button>

        <h1 className="text-center text-lg font-bold">
          {t('taskView.newTask')}
        </h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 overflow-y-auto"
      >
        {/* task name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="task-name" className="text-sm font-medium">
            {t('taskName')}
          </label>
          <input
            id="task-name"
            className="border-border rounded border p-2"
            placeholder={t('taskView.placeholder')}
            {...register('name', {
              required: t('taskView.required', { property: t('taskName') }),
            })}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* deadline */}
        <div className="flex flex-col gap-1">
          <label htmlFor="task-deadline" className="text-sm font-medium">
            {t('deadline')}
          </label>
          <input
            id="task-deadline"
            className="border-border rounded border p-2"
            type="date"
            {...register('deadline', {
              required: t('taskView.required', { property: t('deadline') }),
            })}
          />
          {errors.deadline && (
            <p role="alert" className="text-xs text-red-500">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* priority */}
        <div className="flex flex-col gap-1">
          <label htmlFor="task-priority" className="text-sm font-medium">
            {t('priority')}
          </label>

          <Controller
            name="priority"
            control={control}
            defaultValue="low"
            rules={{
              required: t('taskView.required', { property: t('priority') }),
            }}
            render={({ field }) => (
              <Select
                id="task-priority"
                className="border"
                value={field.value}
                onChange={field.onChange}
              >
                <Option value="low">{t('priorities.low')}</Option>
                <Option value="medium">{t('priorities.medium')}</Option>
                <Option value="high">{t('priorities.high')}</Option>
              </Select>
            )}
          />

          {errors.priority && (
            <p role="alert" className="text-xs text-red-500">
              {errors.priority.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary mt-4 rounded p-2 font-bold text-white"
        >
          {tGeneral('actions.save')}
        </button>
      </form>
    </div>
  );
};
