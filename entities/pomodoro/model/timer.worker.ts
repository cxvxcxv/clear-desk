let intervalId: ReturnType<typeof setInterval> | null = null;

self.onmessage = (e: MessageEvent<{ cmd: 'START' | 'STOP' }>) => {
  switch (e.data.cmd) {
    case 'START':
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        self.postMessage('TICK');
      }, 1000);
      break;

    case 'STOP':
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      break;
  }
};
