import { Dimensions, type TrackerService } from '@pp-tracker-client/core';

export type PageViewsTracker = {
  trackPageView: (props?: TrackPageViewProps) => void;
  getNumTrackedPageViews: () => number;
  isEnabled: () => boolean;
  enable: () => void;
  disable: () => void;
};

type TrackPageViewProps = { title: string; url: string; dimensions?: Dimensions };

export function PageViewsTracker(
  tracker: TrackerService,
  history: History = window.history
): PageViewsTracker {
  let isEnabled = false;
  let lastTrackedPageURL = '';
  let trackedPageViews = 0;
  let idPageView = '';

  for (const method of ['pushState', 'replaceState'] as const) {
    history[method] = new Proxy(history[method], {
      apply: (target, thisArg, argArray: Parameters<History[typeof method]>) => {
        if (!isEnabled) return;

        const href = location.href;
        if (href !== lastTrackedPageURL) {
          trackPageView({ title: document.title, url: href });
          lastTrackedPageURL = href;
        }

        target.apply(thisArg, argArray);
      },
    });
  }

  const trackPageView = (props?: TrackPageViewProps) => {
    idPageView = crypto.randomUUID().substring(0, 6);

    const { title = document.title, url = location.href, dimensions } = props || {};
    tracker.trackPageView({ title, url, dimensions, pageViewId: idPageView });

    trackedPageViews++;
  };

  return {
    isEnabled: () => isEnabled,

    getNumTrackedPageViews: () => trackedPageViews,

    trackPageView,

    enable: () => (isEnabled = true),

    disable: () => (isEnabled = false),
  };
}
