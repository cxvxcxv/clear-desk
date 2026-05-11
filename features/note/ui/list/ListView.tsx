import { Plus } from 'lucide-react';

interface ListViewProps {
  openNoteView: () => void;
}

export const ListView = ({ openNoteView }: ListViewProps) => {
  return (
    <section className="relative h-full w-full">
      <button
        onClick={openNoteView}
        className="text-foreground bg-primary absolute right-0 bottom-0 flex items-center justify-center rounded-full p-1"
      >
        <Plus />
      </button>
    </section>
  );
};
