import { describe, test, vi, expect, afterEach } from 'vitest';
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

const mockFetch = vi.fn();
mockFetch.mockResolvedValue({ status: 202 });
const mockServices: TrackerServices = {
  globalDimensions: GlobalDimensions(),
  http: HttpService(mockFetch),
};
const tracker = TrackerService({ baseUrl: BASE_URL, siteId: SITE_ID }, mockServices);

afterEach(() => {
  mockFetch.mockClear();
  mockServices.globalDimensions.clearAll();
});

function calledWith(params: string) {
  expect(mockFetch).toHaveBeenCalledWith(
    `${BASE_URL}?idsite=${SITE_ID}${params}`,
    expect.anything()
  );
}

describe('TrackerService', () => {
  test('sending get request', () => {
    const payload: SendPayload = { rec: 1, dimensions: { 1: 'asd', 2: 'qwe' } };
    tracker.send(payload);
    calledWith('&rec=1&dimension1=asd&dimension2=qwe');
  });

  test('sending post request', () => {
    const payload: SendPayload[] = [{ rec: 1, dimensions: { 1: 'asd', 2: 'qwe' } }];
    tracker.sendBatch(payload);

    expect(mockFetch).toHaveBeenCalledWith(
      BASE_URL,
      expect.objectContaining({
        body: '{"requests":["?idsite=69420fcd-c059-4d92-8480-dde3ed465ed1&rec=1&dimension1=asd&dimension2=qwe"]}',
      })
    );
  });

  describe('request processors', () => {
    describe('single request', () => {
      test('adds additional params to the request', () => {
        const processor: RequestProcessor = (payload) => ({ ...payload, java: '1' });
        const processor2: RequestProcessor = (payload) => ({ ...payload, pdf: '1' });

        tracker.addRequestProcessor(processor);
        tracker.addRequestProcessor(processor2);
        tracker.send({ _id: '123' });

        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(expect.stringContaining('&java=1'), expect.anything());
        expect(mockFetch).toBeCalledWith(expect.stringContaining('&pdf=1'), expect.anything());
        expect(mockFetch).toBeCalledWith(expect.stringContaining('&_id=123'), expect.anything());

        tracker.removeRequestProcessor(processor);
        tracker.removeRequestProcessor(processor2);

        tracker.send({ _id: '123' });

        expect(mockFetch).toBeCalledWith(expect.not.stringContaining('&java=1'), expect.anything());
        expect(mockFetch).toBeCalledWith(expect.not.stringContaining('&pdf=1'), expect.anything());
        expect(mockFetch).toBeCalledWith(expect.stringContaining('&_id=123'), expect.anything());
      });

      test('cancelling request', () => {
        const cancelingProcessor: RequestProcessor = (_payload) => undefined;

        tracker.addRequestProcessor(cancelingProcessor);

        tracker.send({ _id: '123' });

        // request cancelled
        expect(mockFetch).toBeCalledTimes(0);

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

        expect(mockFetch).toBeCalledTimes(1);
        // TODO: refactor after http service will take queries as an array and not a string
        expect(mockFetch).toHaveBeenCalledWith(
          BASE_URL,
          expect.objectContaining({
            body: expect.stringContaining('&_id=123&java=1&pdf=1'),
          })
        );
        expect(mockFetch).toHaveBeenCalledWith(
          BASE_URL,
          expect.objectContaining({
            body: expect.stringContaining('&_id=qwe&java=1&pdf=1'),
          })
        );
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

        expect(mockFetch).toBeCalledTimes(1);
        // TODO: refactor after http service will take queries as an array and not a string
        expect(mockFetch).toHaveBeenCalledWith(
          BASE_URL,
          expect.objectContaining({
            body: expect.stringContaining('&_id=qwe&java=1'),
          })
        );
        expect(mockFetch).toHaveBeenCalledWith(
          BASE_URL,
          expect.objectContaining({
            body: expect.not.stringContaining('&_id=123'),
          })
        );

        tracker.removeRequestProcessor(processor);
        tracker.removeRequestProcessor(cancelingProcessor);
      });
    });
  });

  describe('global dimensions', () => {
    test('global dimensions should be overridden by call specific ones', () => {
      tracker.setCustomDimensionValue(1, 'aaa');
      tracker.setCustomDimensionValue(2, 'aaa');
      tracker.send({ dimensions: { 1: 'bbb' } });

      calledWith('&rec=1&dimension1=bbb&dimension2=aaa');
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
});
