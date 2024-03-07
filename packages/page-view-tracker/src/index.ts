import { type TrackerService } from '@pp-tracker-client/core';

export type PageViewsTracker = {
  trackPageView: TrackerService['trackPageView'];
  isEnabled: boolean;
  enable: () => void;
  disable: () => void;
};

export function PageViewsTracker(
  tracker: TrackerService,
  history: History = window.history
): PageViewsTracker {
  let isEnabled = false;
  let lastTrackedPageURL = '';

  for (const method of ['pushState', 'replaceState'] as const) {
    window.history[method] = new Proxy(history[method], {
      apply: (target, thisArg, argArray: Parameters<History[typeof method]>) => {
        if (!isEnabled) return;

        const href = window.location.href;
        if (href !== lastTrackedPageURL) {
          tracker.trackPageView({ title: document.title, url: href });
          lastTrackedPageURL = href;
        }

        target.apply(thisArg, argArray);
      },
    });
  }

  return {
    isEnabled,

    trackPageView: tracker.trackPageView,

    enable: () => (isEnabled = true),

    disable: () => (isEnabled = false),
  };
}
