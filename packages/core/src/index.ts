import { HttpService } from './services/HttpService';
import { TrackerApiClient } from './services/TrackerApiClient';
import { TrackerService } from './services/TrackerService';

export * from './services/HttpService';
export * from './services/TrackerApiClient';
export * from './services/TrackerService';
export * from './types';
export * from './utils';

export function createTracker(baseUrl: string, siteId: string) {
  const http = HttpService();
  const trackerApiClient = TrackerApiClient(http, baseUrl, siteId);

  return TrackerService(trackerApiClient);
}
