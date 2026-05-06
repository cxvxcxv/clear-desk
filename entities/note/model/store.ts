import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Note } from './types';

interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  editNote: (id: string, note: Omit<Note, 'id'>) => void;
  removeNote: (id: string) => void;
}

export const useNotes = create<NoteStore>()(
  persist(
    set => ({
      notes: [] as Note[],

      addNote: note =>
        set(state => ({
          notes: [...state.notes, { ...note, id: crypto.randomUUID() }],
        })),
      editNote: (id, note) =>
        set(state => ({
          notes: state.notes.map(n => (n.id === id ? { ...n, ...note } : n)),
        })),
      removeNote: id =>
        set(state => ({
          notes: state.notes.filter(n => n.id !== id),
        })),
    }),
    { name: 'notes', storage: createJSONStorage(() => localStorage) },
  ),
);
