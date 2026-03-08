import { ChevronLeft } from 'lucide-react';

import { ITask } from '@/entities/task';

type TTaskViewProps = {
  onBack: () => void;
  task?: ITask;
};

export const TaskView = ({ task, onBack }: TTaskViewProps) => {
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
        <input id="task-name" type="text" value={task?.name} />
        <input id="task-deadline" type="date" />
      </form>
    </div>
  );
};
