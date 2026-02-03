'use client';

import { useClock } from '@/shared/hooks';

export const Clock = () => {
  const now = useClock();

  if (!now) return null;

  const timeString = now.toLocaleTimeString(undefined, { hour12: false });
  const dateString = now.toLocaleDateString();

  const timeISO = now.toISOString();
  const dateISO = timeISO.split('T')[0];

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <time dateTime={timeISO} className="font-mono text-2xl">
        {timeString}
      </time>
      <time dateTime={dateISO} className="text-muted-foreground text-sm">
        {dateString}
      </time>
    </div>
  );
};
