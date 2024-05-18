import { describe, test, vi, expect, afterEach } from 'vitest';
import { SendPayload, mapDimensions, TrackerService, TrackerServices } from './TrackerService';
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
