import { Dimensions } from '../types';
import { SendPayload, TrackerApiClient } from './TrackerApiClient';

export type TrackerService = {
  send: (data: SendPayload) => unknown;
  sendBatch: (data: SendPayload[]) => unknown;
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
  trackGoal: (props: {
    goalId: number | string;
    conversionValue?: number;
    dimensions?: Dimensions;
  }) => unknown;
};

export function TrackerService(trackerApiClient: TrackerApiClient): TrackerService {
  return {
    send: (data) => trackerApiClient.send(data),
    sendBatch: (data) => trackerApiClient.sendBatch(data),

    trackPageView: (customTitle) => trackerApiClient.trackPageView(customTitle || document.title),

    trackEvent: (props) => trackerApiClient.trackEvent(props),

    trackSiteSearch: (props) => trackerApiClient.trackSiteSearch(props),

    trackGoal: (props) => trackerApiClient.trackGoal(props),
  };
}
