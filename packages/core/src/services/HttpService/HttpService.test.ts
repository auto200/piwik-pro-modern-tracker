import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { HttpService } from '.';

describe('HttpService', () => {
  const mockFetch = vi.fn();
  mockFetch.mockResolvedValue({ status: 202 });

  const httpService = HttpService(mockFetch);

  function calledWith(params: string) {
    expect(mockFetch).toHaveBeenCalledWith(params, expect.anything());
  }

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('encoding get requests', () => {
    test('simple params', async () => {
      const params = { prop: 1, prop1: 'asd' };

      httpService.get('', { query: params });

      calledWith('?prop=1&prop1=asd');
    });

    test('params with special characters', async () => {
      const params = { prop: 'x+d', prop1: 'asd asd' };

      httpService.get('', { query: params });

      calledWith('?prop=x%2Bd&prop1=asd+asd');
    });
  });
});
