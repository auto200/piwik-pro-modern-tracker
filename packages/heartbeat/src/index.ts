import { PingLevel, type TrackerService } from '@pp-tracker-client/core';

const DEFAULT_TIMINGS = [1, 3, 5, 10, 15, 30, 60, 180];

export type HeartBeat = {
  enable: (timings?: number[]) => void;
  disable: () => void;
  isEnabled: () => boolean;
};

export function HeartBeat(tracker: TrackerService): HeartBeat {
  let isEnabled = false;
  // timer could be paused due to tab switch
  let isPaused = false;

  // default to true, since we want to ignore the first 'focus' event
  let isWindowInFocus = true;
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
      if (isWindowInFocus) {
        tracker.ping(PingLevel.PeriodicHeartbeat);
      }

      currentBeat++;

      heartBeatTimerUp();
    }, timeoutSec * 1000);
  };

  const onFocus = () => {
    if (isPaused) {
      heartBeatTimerUp();
      isPaused = false;
    }
    console.log('focusing');
    if (isWindowInFocus) {
      return;
    }

    isWindowInFocus = true;
    tracker.ping(PingLevel.PeriodicHeartbeat);
  };

  const onBlur = () => {
    console.log('blurring');
    isWindowInFocus = false;
    tracker.ping(PingLevel.BlurHeartbeat);
  };

  return {
    enable: (beatTimings = DEFAULT_TIMINGS) => {
      timings = beatTimings;
      isEnabled = true;

      window.addEventListener('focus', onFocus);
      window.addEventListener('blur', onBlur);

      if (document.hasFocus()) {
        heartBeatTimerUp();
        return;
      }

      isPaused = true;
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
