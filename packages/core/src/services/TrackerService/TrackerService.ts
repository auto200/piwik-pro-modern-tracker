import { PingLevel, isNotNullable, removeEmptyEntries, toArray } from '../../utils';
import { Dimensions } from '../../types';
import { GlobalDimensions } from '../GlobalDimensions';
import { TrackingParameters } from './types';
import { HttpService, paramsToQueryString } from '../HttpService';
import { version } from '../../../package.json';

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
  addRequestProcessor: (processor: RequestProcessor) => void;
  removeRequestProcessor: (processor: RequestProcessor) => void;
  //config
  setTrackerUrl: (url: string) => void;
  setSiteId: (siteId: string) => void;
  setTrackingSource: (source: [name: string, version?: string]) => void;
} & Pick<
  GlobalDimensions,
  'getCustomDimensionValue' | 'setCustomDimensionValue' | 'deleteCustomDimension'
>;

/**
 * Returning undefined from processor cancels the request
 */
export type RequestProcessor = (payload: TrackingParameters) => TrackingParameters | undefined;

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
  services: Partial<TrackerServices> = defaultServices
): TrackerService {
  const { globalDimensions, http } = { ...defaultServices, ...services };

  let siteId = config.siteId;
  let baseUrl = config.baseUrl;
  let trackingSourceName = 'modern JSTC';
  let trackingSourceVersion = version;

  let requestProcessors: RequestProcessor[] = [];

  function prepareQuery({ dimensions, ...data }: SendPayload) {
    let processedQuery: TrackingParameters | undefined = {
      idsite: siteId,
      rec: 1,
      ...(dimensions && mapDimensions({ ...globalDimensions.getAll(), ...dimensions })),
      ...data,
    };

    for (const processor of requestProcessors) {
      processedQuery = processor(processedQuery);

      // cancel request
      if (!processedQuery) return;
    }
    // filter out parameters with empty values
    const entriesWithValues = Object.fromEntries(
      Object.entries(processedQuery)
        .map(([key, value]) => (value === '' ? null : [key, value]))
        .filter(isNotNullable)
    );

    return entriesWithValues;
  }

  const send: TrackerService['send'] = (payload) => {
    const query = prepareQuery(payload);
    if (!query) return;

    http.get(baseUrl, { query });
  };

  const sendBatch: TrackerService['sendBatch'] = (payloads) => {
    const queries = payloads.map(prepareQuery).filter(isNotNullable);

    if (queries.length === 0) return;

    http.post(baseUrl, {
      body: { requests: queries.map(paramsToQueryString) },
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

    // NOTE: this probably should not belong here, if someone wants to interact with global
    // dimensions they should provide GlobalDimensions service and and operate on it directly (?)
    // dimensions
    getCustomDimensionValue: globalDimensions.getCustomDimensionValue,

    setCustomDimensionValue: globalDimensions.setCustomDimensionValue,

    deleteCustomDimension: globalDimensions.deleteCustomDimension,

    // request processors
    addRequestProcessor: (processor) => {
      requestProcessors = [...requestProcessors, processor];
    },

    removeRequestProcessor: (processor) => {
      requestProcessors = requestProcessors.filter((p) => p !== processor);
    },
    // config
    setTrackerUrl: (newTrackerUrl) => {
      baseUrl = newTrackerUrl;
    },

    setSiteId: (newSiteId) => {
      siteId = newSiteId;
    },

    setTrackingSource: ([name, version]) => {
      trackingSourceName = name;

      if (version) {
        trackingSourceVersion = version;
      }
    },
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
