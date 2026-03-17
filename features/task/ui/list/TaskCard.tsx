'use client';

import clsx from 'clsx';
import { Calendar, Flag } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ITask, formatDate, useTasks } from '@/entities/task';
import { Checkbox } from '@/shared/ui';

type TTaskCardProps = {
  task: ITask;
};

export const TaskCard = ({ task }: TTaskCardProps) => {
  const removeTask = useTasks(state => state.removeTask);
  const toggleTask = useTasks(state => state.toggleTask);
  const t = useTranslations('task');
  const ariaPriorityStatus =
    t && t('priority') + ': ' + t(`priorities.${task.priority}`);

  return (
    <div
      className={clsx(
        'border-border flex items-center justify-between gap-3 rounded-md border p-3 text-left transition-all',
        task.isComplete && 'bg-card/30 text-muted opacity-70',
      )}
    >
      <Checkbox
        checked={!!task.isComplete}
        onChange={() => toggleTask(task.id)}
      />
      <div className="flex-1">
        <p className={clsx('text-sm', task.isComplete && 'line-through')}>
          {task.name}
        </p>
        {task.deadline && (
          <p className="text-muted flex items-center gap-1 text-xs">
            <Calendar size="0.75rem" /> {formatDate(new Date(task.deadline))}
          </p>
        )}
      </div>
      <span aria-label={ariaPriorityStatus}>
        <Flag
          size="0.75rem"
          onClick={() => removeTask(task.id)}
          className={clsx({
            'text-green': task.priority === 'low',
            'text-red': task.priority === 'high',
            'text-yellow': task.priority === 'medium',
          })}
        />
      </span>
    </div>
  );
};
