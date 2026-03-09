import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ITask } from './types';

interface ITaskStore {
  tasks: ITask[];
  addTask: (task: Omit<ITask, 'id'>) => void;
  editTask: (id: string, task: Partial<ITask>) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTasks = create<ITaskStore>()(
  persist(
    set => ({
      tasks: [] as ITask[],

      addTask: task =>
        set(state => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),
      editTask: (id, task) =>
        set(state => ({
          tasks: state.tasks.map(t => (t.id === id ? { ...t, ...task } : t)),
        })),
      removeTask: id =>
        set(state => ({
          tasks: state.tasks.filter(t => t.id !== id),
        })),
      toggleTask: id =>
        set(state => ({
          tasks: state.tasks.map(t =>
            t.id === id ? { ...t, isComplete: !t.isComplete } : t,
          ),
        })),
      clearCompleted: () =>
        set(state => ({
          tasks: state.tasks.filter(t => !t.isComplete),
        })),
    }),
    { name: 'tasks', storage: createJSONStorage(() => localStorage) },
  ),
);
