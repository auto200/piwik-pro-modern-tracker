import { TrackerService } from '@pp-tracker-client/core';
import { type ContentBlock } from '@pp-tracker-client/content-tracking-utils';
import {
  filterOutTrackedContentParents,
  filterOutNotVisibleContentParents,
  findAllContentParents,
  markContentParentsAsAlreadyTracked,
  ContentBlockHash,
  buildContentBlockInfo,
} from './utils';

export type ContentImpression = {
  isEnabled: () => boolean;
  enable: (config?: ContentImpressionConfig) => void;
  disable: () => void;
  trackContentImpression: (contentBlock: ContentBlock) => unknown;
  trackContentImpressions: (contentBlock: ContentBlock[]) => unknown;
  trackPageContentImpressions: () => unknown;
};

export type ContentImpressionConfig = {
  watchIntervalMs: number;
  trackOnlyVisible: boolean;
};

const DEFAULT_CONFIG: ContentImpressionConfig = {
  watchIntervalMs: 500,
  trackOnlyVisible: false,
};

export function ContentImpression(tracker: TrackerService): ContentImpression {
  let interval: number | undefined = undefined;
  let config = DEFAULT_CONFIG;
  let alreadyTrackedContentHashes: ContentBlockHash[] = [];

  const trackContentImpression = ({ name, piece, target }: ContentBlock) => {
    return tracker.send({
      c_n: name,
      c_p: piece,
      c_t: target,
    });
  };

  const trackContentImpressions = (blocks: ContentBlock[]) => {
    return tracker.sendBatch(
      blocks.map(({ name, piece, target }) => ({
        c_n: name,
        c_p: piece,
        c_t: target,
      }))
    );
  };

  function trackPageContentImpressions() {
    const allContentParents = findAllContentParents();
    const contentParentsNotMarkedAsTracked = filterOutTrackedContentParents(allContentParents);

    // TODO: test content visibility
    const contentParentsToTrack = config.trackOnlyVisible
      ? filterOutNotVisibleContentParents(contentParentsNotMarkedAsTracked)
      : contentParentsNotMarkedAsTracked;

    const blockInfos = contentParentsToTrack.map(buildContentBlockInfo);
    const infoBlocksToTrack = blockInfos.filter(
      ({ hash }) => !alreadyTrackedContentHashes.includes(hash)
    );

    if (infoBlocksToTrack.length === 0) return;

    trackContentImpressions(infoBlocksToTrack.map(({ block }) => block));
    markContentParentsAsAlreadyTracked(infoBlocksToTrack.map(({ parentEl }) => parentEl));
    alreadyTrackedContentHashes = [
      ...alreadyTrackedContentHashes,
      ...infoBlocksToTrack.map(({ hash }) => hash),
    ];
  }

  function isEnabled() {
    return interval !== undefined;
  }

  function disable() {
    if (isEnabled()) {
      clearInterval(interval);
      interval = undefined;
      alreadyTrackedContentHashes = [];
    }
  }

  return {
    isEnabled,

    enable: (conf = DEFAULT_CONFIG) => {
      disable();
      config = conf;

      interval = setInterval(trackPageContentImpressions, config.watchIntervalMs);
    },

    disable,

    trackContentImpression,

    trackContentImpressions,

    trackPageContentImpressions,
  };
}
