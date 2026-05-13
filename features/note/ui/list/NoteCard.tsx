import { Note } from '@/entities/note';

interface NoteProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteProps) => {
  return <div>{note.content}</div>;
};
