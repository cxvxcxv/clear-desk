'use client';

import { NOTES_WIDGET_VIEWS, useNotesWidgetView } from './model';
import { ListView } from '@/features/note';
import { NoteView } from '@/features/note/ui/note';
import { PanelStack } from '@/shared/ui';

export const Notes = () => {
  const { rootView, openListView, openNoteView } = useNotesWidgetView();
  return (
    <PanelStack
      view={rootView}
      views={NOTES_WIDGET_VIEWS}
      render={v => {
        if (v === 'list') return <ListView openNoteView={openNoteView} />;
        return <NoteView onBack={openListView} />;
      }}
    />
  );
};
