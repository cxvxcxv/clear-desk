import { ChevronLeft } from 'lucide-react';

interface NoteViewProps {
  onBack: () => void;
}

export const NoteView = ({ onBack }: NoteViewProps) => {
  return (
    <section>
      <header className="grid w-full grid-cols-3 items-center">
        <button
          type="button"
          autoFocus
          className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100"
          onClick={onBack}
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <h1 className="text-center text-lg font-bold">Note</h1>
      </header>
      <form></form>
    </section>
  );
};
