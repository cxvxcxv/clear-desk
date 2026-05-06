import { useCallback, useState } from 'react';

type RootView = 'list' | 'note';

export const NOTES_WIDGET_VIEWS: RootView[] = ['list', 'note'];

export const useNotesWidgetView = () => {
  const [rootView, setRootView] = useState<RootView>('list');

  const openNoteView = useCallback(() => setRootView('note'), []);

  const openListView = useCallback(() => setRootView('list'), []);

  return {
    rootView,
    openNoteView,
    openListView,
  };
};
