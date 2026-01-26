'use client';

import { useEffect, useState } from 'react';

export const useClock = (tickInterval = 1000) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), tickInterval);
    return () => clearInterval(interval);
  }, [tickInterval]);

  return now;
};
