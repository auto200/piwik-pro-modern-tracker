import { TrackerService } from '@pp-tracker-client/core';
import { parse as parseError } from 'error-stack-parser';

export type ErrorTracking = {
  isEnabled: () => boolean;
  enable: () => void;
  disable: () => void;
  trackError: (error: Error) => void;
};

const MAX_ERR_MSG_LENGTH = 16_000;

export function ErrorTracking(tracker: TrackerService): ErrorTracking {
  let isEnabled = false;

  const trackError = (error: Error) => {
    try {
      const [frame] = parseError(error);

      tracker.send({
        e_c: 'JavaScript Errors',
        e_a: `${frame?.fileName || ''}:${frame?.lineNumber || ''}:${frame?.columnNumber || ''}`,
        e_n: error.message.substring(0, MAX_ERR_MSG_LENGTH),
      });
    } catch {
      tracker.send({
        e_c: 'JavaScript Errors',
        e_n: error.message.substring(0, MAX_ERR_MSG_LENGTH),
      });
    }
  };

  const errorHandler = (event: ErrorEvent) => trackError(event.error);

  return {
    isEnabled: () => isEnabled,

    enable: () => {
      window.addEventListener('error', errorHandler, true);

      isEnabled = true;
    },

    disable: () => {
      window.removeEventListener('error', errorHandler);

      isEnabled = false;
    },

    trackError,
  };
}
