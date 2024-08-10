type JSTCQueue = {
  push: typeof Array.prototype.push | ((...items: unknown[]) => void);
};

const QUEUE_NAME = '_paq';

function TrackerProxy(window: Window) {
  const initialize = () => {
    window[QUEUE_NAME as any] ??= [] as any;
    if (typeof window[QUEUE_NAME as any] === 'function') {
      console.error(`Tracker proxy has been already initialized on 'window.${QUEUE_NAME}'`);
      return;
    }
    const initialQueue = window[QUEUE_NAME as any];
    console.log(initialQueue);
    window[QUEUE_NAME as any] = {
      // @ts-expect-error
      push: (...items: unknown[]) => {
        console.log(items);
      },
    };
  };

  initialize();
}

const Proxy = TrackerProxy(window);
