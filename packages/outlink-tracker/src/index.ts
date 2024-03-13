import { TrackerService } from '@pp-tracker-client/core';

export type OutlinkTracker = {
  isEnabled: () => boolean;
  enable: (config?: OutlinkTrackerConfig) => void;
  disable: () => void;
};

export type OutlinkTrackerConfig = {
  clicks: {
    trackLeftClicks?: boolean;
    trackRightClicks?: boolean;
    trackMiddleClicks?: boolean;
  };
};

export function OutlinkTracker(tracker: TrackerService): OutlinkTracker {
  // presence or absence of click handler determines if the module is enabled or disabled
  let clickHandler: ((ev: MouseEvent) => void) | undefined = undefined;

  const createClickHandler = (config: OutlinkTrackerConfig) => {
    return ({ target, button: clickedMouseButton }: MouseEvent) => {
      if (!shouldProcessClick(clickedMouseButton, config.clicks)) return;

      if (!target || !(target instanceof Element)) return;

      const closestAnchor = target.closest('a');
      if (!closestAnchor) return;

      // not an outlink
      if (closestAnchor.hostname === location.hostname) return;

      tracker.send({ link: closestAnchor.href });
    };
  };

  const disable = () => {
    if (!clickHandler) return;

    document.removeEventListener('mousedown', clickHandler);
    clickHandler = undefined;
  };

  const isEnabled = () => !!clickHandler;

  return {
    isEnabled,

    enable: (
      config = {
        clicks: { trackLeftClicks: true, trackRightClicks: true, trackMiddleClicks: true },
      }
    ) => {
      if (isEnabled()) disable();

      clickHandler = createClickHandler(config);

      // TODO: `mousedown` does not a11y friendly. `click` handler fires when element is clicked no
      // matter how, focus + enter ect. but does not fires on middle mouse or right click
      document.addEventListener('mousedown', clickHandler);
    },

    disable,
  };
}

function shouldProcessClick(mouseButton: number, clickConfig: OutlinkTrackerConfig['clicks']) {
  switch (mouseButton) {
    case 0: {
      return clickConfig.trackLeftClicks;
    }
    case 1: {
      return clickConfig.trackMiddleClicks;
    }
    case 2: {
      return clickConfig.trackRightClicks;
    }
    default: {
      return false;
    }
  }
}
