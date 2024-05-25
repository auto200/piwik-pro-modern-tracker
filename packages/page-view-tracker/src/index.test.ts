import { HttpService, TrackerService } from '@pp-tracker-client/core';
import { PageViewsTracker } from './index';
import { afterEach, describe, expect, test, vi } from 'vitest';
const BASE_URL = 'http://test.piwik.pro';
const SITE_ID = '69420fcd-c059-4d92-8480-dde3ed465ed1';

const mockFetch = vi.fn();
mockFetch.mockResolvedValue({ status: 202 });
const mockServices = {
  http: HttpService(mockFetch),
};
const tracker = TrackerService({ baseUrl: BASE_URL, siteId: SITE_ID }, mockServices);

afterEach(() => {
  mockFetch.mockClear();
});

const pageViewsTracker = PageViewsTracker(tracker);

describe('Page views tracker', () => {
  test('getNumTrackedPageViews', () => {
    pageViewsTracker.trackPageView();
    expect(pageViewsTracker.getNumTrackedPageViews()).toEqual(1);

    pageViewsTracker.trackPageView();
    expect(pageViewsTracker.getNumTrackedPageViews()).toEqual(2);
  });

  test('automatic adding page id to every request', () => {
    tracker.send({ java: '1' });

    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(expect.stringContaining('&pv_id='), expect.anything());
  });
});
