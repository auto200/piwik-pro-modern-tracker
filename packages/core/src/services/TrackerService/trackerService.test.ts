import { describe, test, vi, expect, afterEach, beforeEach } from 'vitest';
import {
  SendPayload,
  mapDimensions,
  TrackerService,
  TrackerServices,
  RequestProcessor,
} from './TrackerService';
import { HttpService } from '../HttpService';
import { Dimensions } from '../../types';
import { GlobalDimensions } from '../GlobalDimensions';

const BASE_URL = 'http://test.piwik.pro';
const SITE_ID = '69420fcd-c059-4d92-8480-dde3ed465ed1';

let mockHttp: HttpService;
let globalDimensions: GlobalDimensions;
let tracker: TrackerService;

beforeEach(() => {
  mockHttp = {
    post: vi.fn(),
  };
  globalDimensions = GlobalDimensions();
  const mockServices: TrackerServices = {
    globalDimensions,
    http: mockHttp,
  };
  tracker = TrackerService({ baseUrl: BASE_URL, siteId: SITE_ID }, mockServices);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('TrackerService', () => {
  test('sending single request', () => {
    const payload: SendPayload = { rec: 1, dimensions: { 1: 'asd', 2: 'qwe' } };
    tracker.send(payload);

    // TODO: we need to introduce some layer in between current TrackerService and HttpService so we
    // can test against actual objects and don't worry about parsing it to a string in tests. The
    // new 'TrackerHttpService' will be responsible for correctly parsing the objects into query
    // parameters for both single and batch requests.
    expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
      body: expect.stringContaining('&rec=1&dimension1=asd&dimension2=qwe'),
    });
  });

  test('sending batch request', () => {
    const payload: SendPayload[] = [{ rec: 1, dimensions: { 1: 'asd', 2: 'qwe' } }];
    tracker.sendBatch(payload);

    expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
      body: {
        requests: [
          '?idsite=69420fcd-c059-4d92-8480-dde3ed465ed1&rec=1&dimension1=asd&dimension2=qwe',
        ],
      },
    });
  });

  describe('request processors', () => {
    describe('single request', () => {
      test('adds additional params to the request', () => {
        const processor: RequestProcessor = (payload) => ({ ...payload, java: '1' });
        const processor2: RequestProcessor = (payload) => ({ ...payload, pdf: '1' });

        tracker.addRequestProcessor(processor);
        tracker.addRequestProcessor(processor2);
        tracker.send({ _id: '123' });

        expect(mockHttp.post).toBeCalledTimes(1);
        expect(mockHttp.post).toBeCalledWith(BASE_URL, {
          body: expect.stringContaining('&java=1'),
        });
        expect(mockHttp.post).toBeCalledWith(BASE_URL, { body: expect.stringContaining('&pdf=1') });
        expect(mockHttp.post).toBeCalledWith(BASE_URL, {
          body: expect.stringContaining('&_id=123'),
        });

        tracker.removeRequestProcessor(processor);
        tracker.removeRequestProcessor(processor2);

        tracker.send({ _id: '123' });

        expect(mockHttp.post).toBeCalledWith(BASE_URL, {
          body: expect.not.stringContaining('&java=1'),
        });
        expect(mockHttp.post).toBeCalledWith(BASE_URL, {
          body: expect.not.stringContaining('&pdf=1'),
        });
        expect(mockHttp.post).toBeCalledWith(BASE_URL, {
          body: expect.stringContaining('&_id=123'),
        });
      });

      test('cancelling request', () => {
        const cancelingProcessor: RequestProcessor = (_payload) => undefined;

        tracker.addRequestProcessor(cancelingProcessor);

        tracker.send({ _id: '123' });

        // request cancelled
        expect(mockHttp.post).toBeCalledTimes(0);

        tracker.removeRequestProcessor(cancelingProcessor);
      });
    });

    describe('batch send', () => {
      test('adds additional parameters to each request', () => {
        const processor: RequestProcessor = (payload) => ({ ...payload, java: '1' });
        const processor2: RequestProcessor = (payload) => ({ ...payload, pdf: '1' });

        tracker.addRequestProcessor(processor);
        tracker.addRequestProcessor(processor2);

        tracker.sendBatch([{ _id: '123' }, { _id: 'qwe' }]);

        expect(mockHttp.post).toBeCalledTimes(1);
        // TODO: refactor after http service will take queries as an array and not a string
        expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
          body: {
            requests: [
              expect.stringContaining('&_id=123&java=1&pdf=1'),
              expect.stringContaining('&_id=qwe&java=1&pdf=1'),
            ],
          },
        });
        tracker.removeRequestProcessor(processor);
        tracker.removeRequestProcessor(processor2);
      });

      test('cancels one of requests', () => {
        const processor: RequestProcessor = (payload) => ({ ...payload, java: '1' });
        const cancelingProcessor: RequestProcessor = (payload) =>
          payload._id === '123' ? undefined : payload;

        tracker.addRequestProcessor(processor);
        tracker.addRequestProcessor(cancelingProcessor);

        tracker.sendBatch([{ _id: '123' }, { _id: 'qwe' }]);

        expect(mockHttp.post).toBeCalledTimes(1);
        // TODO: refactor after http service will take queries as an array and not a string
        expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
          body: { requests: [expect.stringContaining('&_id=qwe&java=1')] },
        });
        expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
          body: expect.not.stringContaining('&_id=123'),
        });

        tracker.removeRequestProcessor(processor);
        tracker.removeRequestProcessor(cancelingProcessor);
      });
    });
  });

  describe('global dimensions', () => {
    test('global dimensions should be overridden by call specific ones', () => {
      globalDimensions.setCustomDimensionValue(1, 'aaa');
      globalDimensions.setCustomDimensionValue(2, 'aaa');
      tracker.send({ dimensions: { 1: 'bbb' } });

      expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
        body: expect.stringContaining('&rec=1&dimension1=bbb&dimension2=aaa'),
      });
    });
  });

  describe('encoding param values', () => {
    test('encodes parameters for single request', () => {
      tracker.send({ action_name: 'pasta restaurant', dimensions: { 1: 'mac & cheese' } });

      expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
        body: expect.stringContaining('action_name=pasta+restaurant'),
      });
      expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
        body: expect.stringContaining('dimension1=mac+%26+cheese'),
      });
    });

    test('encodes parameters for batch request', () => {
      tracker.sendBatch([
        { action_name: 'pasta restaurant', dimensions: { 1: 'mac & cheese' } },
        { action_name: 'do it yourself', dimensions: { 1: 'tools & metals' } },
      ]);

      expect(mockHttp.post).toHaveBeenCalledWith(BASE_URL, {
        body: {
          requests: [
            '?idsite=69420fcd-c059-4d92-8480-dde3ed465ed1&rec=1&dimension1=mac+%26+cheese&action_name=pasta+restaurant',
            '?idsite=69420fcd-c059-4d92-8480-dde3ed465ed1&rec=1&dimension1=tools+%26+metals&action_name=do+it+yourself',
          ],
        },
      });
    });
  });
});

describe('utils', () => {
  test('mapping dimensions', () => {
    const dimensions: Dimensions = { 1: 'value' };
    const dimensions2: Dimensions = { 1: 'value', 2: 'value2' };

    const expected1 = { dimension1: 'value' };
    const expected2 = { dimension1: 'value', dimension2: 'value2' };

    expect(mapDimensions(dimensions)).toStrictEqual(expected1);
    expect(mapDimensions(dimensions2)).toStrictEqual(expected2);
  });
});
