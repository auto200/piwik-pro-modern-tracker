import { PingLevel, type TrackerService } from '@pp-tracker-client/core';

const DEFAULT_TIMINGS = [1, 3, 5, 10, 15, 30, 60, 180];

export type HeartBeat = {
  enable: (timings?: number[]) => void;
  disable: () => void;
  isEnabled: () => boolean;
};

export function HeartBeat(tracker: TrackerService): HeartBeat {
  let isEnabled = false;

  // default to true, since we want to ignore the first 'focus' event
  let isWindowInFocused = true;
  let timings: number[] = DEFAULT_TIMINGS;
  let timeoutId: number | undefined;
  let currentBeat = 0;

  const heartBeatTimerUp = () => {
    const timeoutSec = timings[currentBeat];
    if (timeoutSec === undefined) {
      timeoutId = undefined;
      return;
    }

    timeoutId = setTimeout(() => {
      if (isWindowInFocused) {
        tracker.ping(PingLevel.PeriodicHeartbeat);
      }

      currentBeat++;

      heartBeatTimerUp();
    }, timeoutSec * 1000);
  };

  const onFocus = () => {
    console.log('focusing');
    if (isWindowInFocused) {
      return;
    }

    isWindowInFocused = true;
    tracker.ping(PingLevel.PeriodicHeartbeat);
  };

  const onBlur = () => {
    console.log('blurring');
    isWindowInFocused = false;
    tracker.ping(PingLevel.BlurHeartbeat);
  };

  return {
    enable: (beatTimings = DEFAULT_TIMINGS) => {
      timings = beatTimings;
      isEnabled = true;

      window.addEventListener('focus', onFocus);
      window.addEventListener('blur', onBlur);

      heartBeatTimerUp();
    },

    disable: () => {
      isEnabled = false;
      clearTimeout(timeoutId);
      timeoutId = undefined;
      currentBeat = 0;

      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    },

    isEnabled: () => isEnabled,
  };
}
