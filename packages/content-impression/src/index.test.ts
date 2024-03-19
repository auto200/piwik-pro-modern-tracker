import { CONTENT } from '@pp-tracker-client/content-tracking-utils';
import { TrackerService } from '@pp-tracker-client/core';
import { ContentImpression } from 'index';
import { expect, test, describe, vi } from 'vitest';

describe('content impressions', () => {
  test('calling `trackPageContentImpressions` multiple times should only send data once if content did not change', () => {
    const template = `
        <div ${CONTENT.PARENT.ATTR} ${CONTENT.NAME.ATTR}="content-name">
            <div>title</div>
            <a href="https://piwik.pro" ${CONTENT.TARGET.ATTR}="https://piwik.pro/img">
                <img src="https://piwik.pro/img" ${CONTENT.PIECE.ATTR}="content-piece"/>
            </a>
        </div>
        <div class="${CONTENT.PARENT.CLASS}">
            <div ${CONTENT.NAME.ATTR}="content-name2">title</div>
            <a href="https://piwik.pro" ${CONTENT.TARGET.ATTR}="https://piwik.pro/img2">
                <img src="https://piwik.pro/img" ${CONTENT.PIECE.ATTR}="content-piece2"/>
            </a>
        </div>
        `;
    document.documentElement.innerHTML = template;

    const mockTracker = { sendBatch: vi.fn() };
    const contentImpression = ContentImpression(mockTracker as unknown as TrackerService);
    contentImpression.trackPageContentImpressions();

    expect(mockTracker.sendBatch).toBeCalledTimes(1);
    expect(mockTracker.sendBatch).toBeCalledWith([
      {
        c_n: 'content-name',
        c_p: 'content-piece',
        c_t: 'https://piwik.pro/img',
      },
      {
        c_n: 'content-name2',
        c_p: 'content-piece2',
        c_t: 'https://piwik.pro/img2',
      },
    ]);

    mockTracker.sendBatch.mockReset();

    contentImpression.trackPageContentImpressions();

    expect(mockTracker.sendBatch).toBeCalledTimes(0);
  });
});
