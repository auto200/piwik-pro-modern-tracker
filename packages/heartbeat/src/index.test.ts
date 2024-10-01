import { PingLevel, TrackerService } from '@pp-tracker-client/core';
import { HeartBeat } from './index';
import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';

const mockTracker = { ping: vi.fn() } as unknown as TrackerService;
let hb: HeartBeat;

vi.useFakeTimers();

beforeEach(() => {
  hb = HeartBeat(mockTracker);
});

afterEach(() => {
  vi.clearAllMocks();
  hb.disable();
});

describe('HeartBeat', () => {
  describe('periodic heartbeat', () => {
    test('beats over time', () => {
      const timings = [1, 2, 3];
      hb.enable(timings);

      expect(mockTracker.ping).toBeCalledTimes(0);

      vi.advanceTimersByTime(1000);
      expect(mockTracker.ping).toBeCalledTimes(1);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);

      vi.advanceTimersByTime(2000);
      expect(mockTracker.ping).toBeCalledTimes(2);

      vi.advanceTimersByTime(3000);
      expect(mockTracker.ping).toBeCalledTimes(3);

      // sanity check if timer is not firing excessively
      vi.advanceTimersByTime(10000);
      expect(mockTracker.ping).toBeCalledTimes(3);
    });

    test('resets when enabled, disabled and enabled again', () => {
      const timings = [1, 2, 3];
      hb.enable(timings);

      vi.advanceTimersByTime(1000);
      expect(mockTracker.ping).toBeCalledTimes(1);

      hb.disable();

      hb.enable();
      vi.advanceTimersByTime(10000);

      expect(mockTracker.ping).toBeCalledTimes(4);
    });

    test('does not beat when page is blurred', () => {
      const timings = [1, 2, 3];
      hb.enable(timings);

      // focus event is dispatched every time the page is entered for the first time
      window.dispatchEvent(new Event('focus'));
      expect(mockTracker.ping).toHaveBeenCalledTimes(0);

      window.dispatchEvent(new Event('blur'));
      expect(mockTracker.ping).toHaveBeenCalledTimes(1);
      expect(mockTracker.ping).toHaveBeenCalledWith(PingLevel.BlurHeartbeat);

      vi.advanceTimersByTime(10000);

      expect(mockTracker.ping).toHaveBeenCalledTimes(1);
    });
  });

  describe('user activity beats', () => {
    test('on page focus', () => {
      hb.enable();
      // this event is always dispatched once page is viewed, we should ignore first focus event
      window.dispatchEvent(new Event('focus'));
      expect(mockTracker.ping).toBeCalledTimes(0);

      window.dispatchEvent(new Event('blur'));
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);

      window.dispatchEvent(new Event('focus'));
      expect(mockTracker.ping).toBeCalledTimes(2);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);
    });

    test('on page blur', () => {
      hb.enable();

      window.dispatchEvent(new Event('blur'));
      expect(mockTracker.ping).toBeCalledTimes(1);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);
    });
  });
});
