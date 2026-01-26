'use client';

import { useClock } from '@/shared/hooks';

export const ClockWidget = () => {
  const now = useClock();

  const timeString = now.toLocaleTimeString(undefined, { hour12: false });
  const dateString = now.toLocaleDateString();

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="font-mono text-2xl">{timeString}</span>
      <span className="text-muted-foreground text-sm">{dateString}</span>
    </div>
  );
};
