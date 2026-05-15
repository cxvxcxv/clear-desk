import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface NoteViewProps {
  onBack: () => void;
}

export const NoteView = ({ onBack }: NoteViewProps) => {
  const [content, setContent] = useState('');
  return (
    <section>
      <header className="mb-4 grid w-full grid-cols-3 items-center">
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
      <form>
        <textarea
          name="content"
          id="content"
          placeholder="Thoughts..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border-border w-full border p-2"
        ></textarea>
        <button className="bg-primary mx-auto rounded-2xl px-6 py-2">
          Save
        </button>
      </form>
    </section>
  );
};
