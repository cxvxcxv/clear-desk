'use client';

import { Calendar, Flag } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ITask, formatDate } from '@/entities/task';
import { Checkbox } from '@/shared/ui';

type TTaskProps = {
  task: ITask;
};

export const Task = ({ task }: TTaskProps) => {
  const t = useTranslations('task');
  const ariaPriorityStatus =
    t('priority') + ': ' + t(`priorities.${task.priority}`);

  return (
    <div className="border-border flex items-center justify-between gap-3 rounded-md border p-3">
      <Checkbox />
      <div className="flex-1">
        <p className="text-sm">{task.name}</p>
        {task.deadline && (
          <p className="text-muted flex gap-1 text-xs">
            <Calendar size="0.75rem" /> {formatDate(task.deadline)}
          </p>
        )}
      </div>
      <span aria-label={ariaPriorityStatus}>
        <Flag size="0.75rem" />
      </span>
    </div>
  );
};
