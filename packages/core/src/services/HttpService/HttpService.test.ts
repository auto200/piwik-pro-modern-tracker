import { describe, expect, test, vi, beforeEach } from 'vitest';
import { HttpService } from '.';

describe('HttpService', () => {
  const mockFetch = vi.fn();
  mockFetch.mockResolvedValue({ status: 202 });

  const httpService = HttpService(mockFetch);

  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('passes body to fetch', async () => {
    const params = { prop: 'x+d', prop1: 'asd asd' };

    httpService.post('https://example.com', { body: params });

    expect(mockFetch).toBeCalledWith(
      'https://example.com',
      expect.objectContaining({ body: JSON.stringify(params) })
    );
  });
});
