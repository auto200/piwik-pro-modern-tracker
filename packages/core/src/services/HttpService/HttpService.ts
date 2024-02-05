type QueryParams = Record<string, string | number | Array<string | number> | object>;
type PayloadBody = RequestInit['body'] | object;

export type RequestParams = Omit<RequestInit, 'body'> & {
  body?: PayloadBody;
  query?: QueryParams;
};

export function HttpService(fetcher: typeof fetch = fetch) {
  async function request(url: string, params: RequestParams) {
    const { body, headers, query } = params;

    const response = await fetcher(attachQueryToUrl(url, query), {
      ...params,
      body: formatBody(body),
      headers: extendHeaders(headers, body),
    });

    if (response.status !== 202) {
      throw new HttpError(response.status, response, 'HTTP request failed');
    }
  }

  return {
    get: (url: string, params: RequestParams) =>
      request(url, { keepalive: true, ...params, method: 'GET' }),

    post: (url: string, params: RequestParams) =>
      request(url, { keepalive: true, ...params, method: 'POST' }),
  };
}
export type HttpService = ReturnType<typeof HttpService>;

function attachQueryToUrl(url: string, query?: QueryParams): string {
  if (!query) return url;

  return `${url}${paramsToQueryString(query)}`;
}

export function paramsToQueryString(params: QueryParams) {
  if (Object.keys(params).length === 0) return '';

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'object') {
      searchParams.append(key, JSON.stringify(value));
      continue;
    }

    searchParams.append(key, String(value));
  }

  const paramsString = searchParams.toString();
  if (paramsString.length === 0) return '';

  return `?${paramsString}`;
}

function formatBody(body: PayloadBody): RequestInit['body'] {
  if (isPlainObject(body)) {
    return JSON.stringify(body);
  }

  return body;
}

function extendHeaders(headers: RequestInit['headers'], body: PayloadBody): RequestInit['headers'] {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...headers,
  };
}

function isPlainObject(value: unknown): value is object {
  return (
    typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype
  );
}

export class AppError extends Error {
  constructor(
    public name: string,
    public originalError: unknown,
    public message: string
  ) {
    super(`${message} - ${originalError instanceof Error ? originalError.message : 'unknown'}`);

    if (originalError instanceof Error && originalError.stack) {
      this.stack = originalError.stack;
    }
  }
}

class HttpError extends AppError {
  constructor(
    public status: number,
    originalError: unknown,
    message: string
  ) {
    super('HttpError', originalError, message);
  }
}
