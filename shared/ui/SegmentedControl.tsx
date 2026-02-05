'use client';

import clsx from 'clsx';
import { useLayoutEffect, useRef } from 'react';

type SegmentedItem<T extends string> = {
  id: T;
  label: string;
};

type TSegmentedControlProps<T extends string> = {
  value: T;
  items: readonly SegmentedItem<T>[];
  className?: string;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  value,
  items,
  className,
  onChange,
}: TSegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;

    if (!container || !indicator) return;

    const update = () => {
      const activeEl = itemsRef.current.get(value);
      if (!activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      indicator.style.transform = `translateX(${activeRect.left - containerRect.left}px)`;
      indicator.style.width = `${activeRect.width}px`;
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);

    update();

    return () => resizeObserver.disconnect();
  }, [value, items]);
  return (
    <div
      role="tablist"
      ref={containerRef}
      className={clsx(
        'bg-card relative flex items-center justify-center gap-4 rounded-full px-1.5 py-2 text-xs shadow-inner',
        className,
      )}
    >
      <span
        ref={indicatorRef}
        className="bg-foreground/10 absolute inset-y-1 left-0 z-10 rounded-full transition-all duration-300"
      />

      {items.map(item => (
        <button
          key={item.id}
          role="tab"
          ref={el => {
            if (el) itemsRef.current.set(item.id, el);
            else itemsRef.current.delete(item.id);
          }}
          onClick={() => onChange(item.id)}
          className="relative z-10 px-5 py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
