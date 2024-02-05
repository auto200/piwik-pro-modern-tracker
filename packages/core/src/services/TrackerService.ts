import { TrackerApiClient } from './TrackerApiClient';

type Dimensions = Record<number, string>;

export type TrackerService = {
  trackPageView: (customTitle?: string) => unknown;
  trackEvent: (props: {
    category: string;
    action: string;
    name?: string;
    value?: number;
    dimensions?: Dimensions;
  }) => unknown;
  trackSiteSearch: (props: {
    keyword: string;
    category?: string | string[];
    searchCount?: number;
    dimensions: Dimensions;
  }) => unknown;
};

export function TrackerService(trackerApiClient: TrackerApiClient): TrackerService {
  return {
    trackPageView: (customTitle) => trackerApiClient.trackPageView(customTitle || document.title),

    trackEvent: (props) => trackerApiClient.trackEvent(props),

    trackSiteSearch: (props) => trackerApiClient.trackSiteSearch(props),
  };
}
