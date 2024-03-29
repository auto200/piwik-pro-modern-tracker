import { TrackerService } from '@pp-tracker-client/core';
import { ErrorTracking } from './index';
import { describe, test, expect, vi, afterEach } from 'vitest';

describe('error tracking', () => {
  const mockTracker = { send: vi.fn() };
  const errorTracking = ErrorTracking(mockTracker as unknown as TrackerService);

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('global error handler', () => {
    errorTracking.enable();

    const errorEvent = new ErrorEvent('error', {
      error: new Error('error'),
    });

    window.dispatchEvent(errorEvent);

    expect(mockTracker.send).toBeCalledTimes(1);

    vi.resetAllMocks();

    // we should not send anything if we disable error tracking

    errorTracking.disable();
    window.dispatchEvent(errorEvent);

    expect(mockTracker.send).toBeCalledTimes(0);
  });

  test('track single error on demand', () => {
    errorTracking.trackError(new Error('just an error nothing big'));

    expect(mockTracker.send).toBeCalledTimes(1);
    expect(mockTracker.send).toBeCalledWith(
      expect.objectContaining({
        e_a: expect.any(String),
        e_c: 'JavaScript Errors',
        e_n: 'just an error nothing big',
      })
    );
  });
});
