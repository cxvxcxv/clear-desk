import { Plus } from 'lucide-react';

import { NoteCard } from './NoteCard';
import { useNotes } from '@/entities/note';

interface ListViewProps {
  openNoteView: () => void;
}

export const ListView = ({ openNoteView }: ListViewProps) => {
  const { notes } = useNotes();
  return (
    <section className="relative h-full w-full">
      {notes.length ? (
        notes.map(note => <NoteCard key={note.id} note={note} />)
      ) : (
        <p>No notes</p>
      )}
      <button
        onClick={openNoteView}
        className="text-foreground bg-primary absolute right-0 bottom-0 flex items-center justify-center rounded-full p-1"
      >
        <Plus />
      </button>
    </section>
  );
};
