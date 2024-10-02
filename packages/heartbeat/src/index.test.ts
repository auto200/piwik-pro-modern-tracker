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
      focusPage();

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

    test('does not start until page has been focused', () => {
      vi.spyOn(document, 'hasFocus').mockImplementation(() => false);
      const timings = [1, 2, 3];
      hb.enable(timings);

      vi.advanceTimersByTime(5000);

      expect(mockTracker.ping).toBeCalledTimes(0);

      focusPage();

      vi.advanceTimersByTime(10000);
      expect(mockTracker.ping).toBeCalledTimes(3);
    });

    test('properly pauses when switching tabs', () => {
      vi.spyOn(document, 'hasFocus').mockImplementation(() => false);
      const timings = [1, 2, 3];
      hb.enable(timings);

      vi.advanceTimersByTime(5000);

      expect(mockTracker.ping).toBeCalledTimes(0);

      focusPage();
      // first focus event should be ignored
      expect(mockTracker.ping).toBeCalledTimes(0);

      // some time passes, not enough to trigger periodic heart beat
      vi.advanceTimersByTime(500);

      blurPage();
      expect(mockTracker.ping).toBeCalledTimes(1);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);

      focusPage();
      expect(mockTracker.ping).toBeCalledTimes(2);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);

      // first heartbeat
      vi.advanceTimersByTime(1000);
      expect(mockTracker.ping).toBeCalledTimes(3);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);

      blurPage();
      expect(mockTracker.ping).toBeCalledTimes(4);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);

      focusPage();
      expect(mockTracker.ping).toBeCalledTimes(5);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);

      // last two configured heartbeats
      vi.advanceTimersByTime(10000);
      expect(mockTracker.ping).toBeCalledTimes(7);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);

      blurPage();
      expect(mockTracker.ping).toBeCalledTimes(8);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);

      vi.advanceTimersByTime(10000);
      expect(mockTracker.ping).toBeCalledTimes(8);

      focusPage();
      expect(mockTracker.ping).toBeCalledTimes(9);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);

      vi.advanceTimersByTime(10000);
      expect(mockTracker.ping).toBeCalledTimes(9);
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
      focusPage();
      expect(mockTracker.ping).toHaveBeenCalledTimes(0);

      blurPage();
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
      focusPage();
      expect(mockTracker.ping).toBeCalledTimes(0);

      blurPage();
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);

      focusPage();
      expect(mockTracker.ping).toBeCalledTimes(2);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.PeriodicHeartbeat);
    });

    test('on page blur', () => {
      hb.enable();

      blurPage();
      expect(mockTracker.ping).toBeCalledTimes(1);
      expect(mockTracker.ping).toBeCalledWith(PingLevel.BlurHeartbeat);
    });
  });
});

function focusPage() {
  window.dispatchEvent(new Event('focus'));
  vi.spyOn(document, 'hasFocus').mockImplementation(() => true);
}

function blurPage() {
  window.dispatchEvent(new Event('blur'));
  vi.spyOn(document, 'hasFocus').mockImplementation(() => false);
}
