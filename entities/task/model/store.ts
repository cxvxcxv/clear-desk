import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Task } from './types';

interface ITaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'isComplete'>) => void;
  editTask: (id: string, task: Partial<Task>) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompleted: () => void;
}

export const useTasks = create<ITaskStore>()(
  persist(
    set => ({
      tasks: [] as Task[],

      addTask: task =>
        set(state => ({
          tasks: [
            ...state.tasks,
            { ...task, isComplete: false, id: crypto.randomUUID() },
          ],
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
