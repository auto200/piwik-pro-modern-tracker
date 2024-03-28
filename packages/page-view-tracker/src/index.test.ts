import { TrackerService } from '@pp-tracker-client/core';
import { PageViewsTracker } from 'index';
import { expect, test, vi } from 'vitest';

test('getNumTrackedPageViews', () => {
  const mockTracker = { trackPageView: vi.fn() };
  const pageViewsTracker = PageViewsTracker(mockTracker as unknown as TrackerService);

  pageViewsTracker.trackPageView();
  expect(pageViewsTracker.getNumTrackedPageViews()).toEqual(1);

  pageViewsTracker.trackPageView();
  expect(pageViewsTracker.getNumTrackedPageViews()).toEqual(2);
});
