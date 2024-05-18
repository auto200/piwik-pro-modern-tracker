import { PingLevel, removeEmptyEntries, toArray } from '../../utils';
import { Dimensions } from '../../types';
import { GlobalDimensions } from '../GlobalDimensions';
import { TrackingParameters } from './types';
import { HttpService, paramsToQueryString } from '../HttpService';

export type SendPayload = TrackingParameters & {
  /**
   * Request specific dimensions
   */
  dimensions?: Dimensions;
  /**
   * Tracker instance global dimensions, added to every request
   */
  globalDimensions?: Dimensions;
};

export type TrackerService = {
  send: (data: SendPayload) => unknown;
  sendBatch: (data: SendPayload[]) => unknown;
  trackPageView: (props: {
    title: string;
    url: string;
    dimensions?: Dimensions;
    pageViewId?: string;
  }) => unknown;
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
} & Pick<
  GlobalDimensions,
  'getCustomDimensionValue' | 'setCustomDimensionValue' | 'deleteCustomDimension'
>;

export type TrackerServiceConfig = {
  baseUrl: string;
  siteId: string;
};

export type TrackerServices = {
  http: HttpService;
  globalDimensions: GlobalDimensions;
};

const defaultServices: TrackerServices = {
  http: HttpService(),
  globalDimensions: GlobalDimensions(),
};

export function TrackerService(
  config: TrackerServiceConfig,
  services: TrackerServices = defaultServices
): TrackerService {
  const siteId = config.siteId;
  const baseUrl = config.baseUrl;

  const { globalDimensions, http } = services;

  function prepareQuery({ dimensions, ...data }: SendPayload) {
    const query: TrackingParameters = {
      idsite: siteId,
      rec: 1,
      ...(dimensions && mapDimensions({ ...globalDimensions.getAll(), ...dimensions })),
      ...data,
    };

    return query;
  }

  const send: TrackerService['send'] = (data) => {
    const query: TrackingParameters = prepareQuery(data);

    http.get(baseUrl, { query });
  };

  const sendBatch: TrackerService['sendBatch'] = (data) => {
    const queryParams = data.map(prepareQuery);

    http.post(baseUrl, {
      body: { requests: queryParams.map((params) => paramsToQueryString(params)) },
    });
  };

  return {
    send,
    sendBatch,

    trackPageView: ({ title, url, dimensions, pageViewId }) =>
      send({ action_name: title, url, dimensions, ...removeEmptyEntries({ pv_id: pageViewId }) }),

    trackEvent: ({ action, category, dimensions, name, value }) =>
      send({
        e_c: category,
        e_a: action,
        ...removeEmptyEntries({ e_n: name, e_v: value?.toString() }),
        dimensions,
      }),

    trackSiteSearch: ({ dimensions, keyword, category, searchCount }) =>
      send({
        search: keyword,
        ...removeEmptyEntries({
          search_cats: toArray(category),
          search_count: searchCount,
        }),
        dimensions,
      }),

    trackGoal: ({ goalId, conversionValue, dimensions }) =>
      send({
        idgoal: goalId,
        ...removeEmptyEntries({
          conversionValue,
        }),
        dimensions,
      }),

    ping: (level = PingLevel.OnDemand) =>
      send({
        ping: level.toString(),
      }),

    // dimensions
    getCustomDimensionValue: globalDimensions.getCustomDimensionValue,

    setCustomDimensionValue: globalDimensions.setCustomDimensionValue,

    deleteCustomDimension: globalDimensions.deleteCustomDimension,
  };
}

type MappedDimensions = Record<`dimension${number}`, string>;
/**
 * Maps dimensions from `{1: "value"}`
 *
 * to
 *
 * `{dimension1: "value"}`
 */
export function mapDimensions(dimensions: Dimensions): MappedDimensions {
  return Object.fromEntries(
    Object.entries(dimensions).map(([id, value]) => [`dimension${id}`, value])
  );
}
