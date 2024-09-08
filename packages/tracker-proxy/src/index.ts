import { TrackerService } from '@pp-tracker-client/core';

type JSTCQueue = {
  push: typeof Array.prototype.push | ((...items: unknown[]) => void);
};

const QUEUE_NAME = '_paq';
// [
//   ["setTrackingSource", "jstc_tm"],
//   ["enableLinkTracking"],
//   ["setIpTracking", true],
//   ["setDomains", ["localhost"]],
//   ["trackPageView"],
//   ["enableJSErrorTracking"],
//   ["setTrackerUrl","https://tiki-toki.piwik.pro/ppms.php"],
//   ["setSiteId", "69374fcd-c059-4d92-8480-dde3ed465ed2"]
// ]
function TrackerProxy(window: Window) {
  const tracker = TrackerService({ baseUrl: '', siteId: '' });

  window[QUEUE_NAME as any] ??= [] as any;
  if (typeof window[QUEUE_NAME as any] === 'function') {
    console.error(`Tracker proxy has been already initialized on 'window.${QUEUE_NAME}'`);
    return;
  }
  const initialQueue = window[QUEUE_NAME as any] as unknown as unknown[];

  for (const item of initialQueue) {
    if (!Array.isArray(item)) {
      console.error('Queue item should be an array, received:', item);
      return;
    }
    const [methodName] = item;

    if (typeof methodName !== 'string') {
      console.error('method name must be a string');
      return;
    }
    if (!tracker[methodName as keyof TrackerService]) {
      console.error(`Method '${methodName}' not found`);
      return;
    }
    // remove this abomination when adding payload validation
    const props = item.slice(1) as any[];
    (tracker[methodName as keyof TrackerService] as any)(...props);
  }

  console.log(initialQueue);
  window[QUEUE_NAME as any] = {
    // @ts-expect-error
    push: (...items: unknown[]) => {
      console.log(items);
    },
  };
}

const Proxy = TrackerProxy(window);
