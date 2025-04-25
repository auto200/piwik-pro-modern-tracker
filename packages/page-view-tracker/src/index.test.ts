import { HttpService, TrackerService } from '@pp-tracker-client/core';
import { PageViewsTracker } from './index';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
const BASE_URL = 'http://test.piwik.pro';
const SITE_ID = '69420fcd-c059-4d92-8480-dde3ed465ed1';

const mockHttp: HttpService = { post: vi.fn() };
let tracker: TrackerService;
let pageViewsTracker: PageViewsTracker;

beforeEach(() => {
  const mockServices = {
    http: mockHttp,
  };

  tracker = TrackerService({ baseUrl: BASE_URL, siteId: SITE_ID }, mockServices);
  pageViewsTracker = PageViewsTracker(tracker);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Page views tracker', () => {
  test('getNumTrackedPageViews', () => {
    pageViewsTracker.trackPageView();
    expect(pageViewsTracker.getNumTrackedPageViews()).toEqual(1);

    pageViewsTracker.trackPageView();
    expect(pageViewsTracker.getNumTrackedPageViews()).toEqual(2);
  });

  test('automatic adding page id to every request', () => {
    pageViewsTracker.trackPageView();
    tracker.send({ java: '1' });

    expect(mockHttp.post).toBeCalledTimes(2);
    expect(mockHttp.post).toBeCalledWith(BASE_URL, { body: expect.stringContaining('&pv_id=') });
  });
});
