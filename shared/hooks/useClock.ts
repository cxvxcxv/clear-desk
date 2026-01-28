import { useEffect, useState } from 'react';

export const useClock = (tickInterval = 1000) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), tickInterval);
    return () => clearInterval(interval);
  }, [tickInterval]);

  return now;
};
