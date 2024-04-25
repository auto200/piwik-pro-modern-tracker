import { PingLevel } from '../utils';
import { Dimensions } from '../types';
import { SendPayload, TrackerApiClient } from './TrackerApiClient';

type TrackPageViewProps = {
  title: string;
  url: string;
  dimensions?: Dimensions;
  pageViewId?: string;
};

export type TrackerService = {
  send: (data: SendPayload) => unknown;
  sendBatch: (data: SendPayload[]) => unknown;
  trackPageView: (props: TrackPageViewProps) => unknown;
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
  ping: (level?: PingLevel) => unknown;
};

export function TrackerService(trackerApiClient: TrackerApiClient): TrackerService {
  return {
    send: (data) => trackerApiClient.send(data),
    sendBatch: (data) => trackerApiClient.sendBatch(data),

    trackPageView: (props) => {
      trackerApiClient.trackPageView(props);
    },

    trackEvent: (props) => trackerApiClient.trackEvent(props),

    trackSiteSearch: (props) => trackerApiClient.trackSiteSearch(props),

    trackGoal: (props) => trackerApiClient.trackGoal(props),

    ping: (level = PingLevel.OnDemand) => {
      trackerApiClient.ping(level);
    },
  };
}
