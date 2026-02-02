import { ReactNode } from 'react';

type TPanelStackProps<T extends string> = {
  view: T;
  views: readonly T[];
  render: (view: T) => ReactNode;
};

export function PanelStack<T extends string>({
  view,
  views,
  render,
}: TPanelStackProps<T>) {
  const index = views.indexOf(view);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full transition-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {views.map(v => (
          <div
            key={v}
            className="w-full shrink-0"
            inert={v !== view}
            aria-hidden={v !== view}
          >
            {render(v)}
          </div>
        ))}
      </div>
    </div>
  );
}
