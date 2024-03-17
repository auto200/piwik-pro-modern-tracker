import { TrackerService } from '@pp-tracker-client/core';
import { findContentParent, buildContentBlock } from '@pp-tracker-client/content-tracking-utils';

export type ContentInteraction = {
  isEnabled: () => boolean;
  enable: () => void;
  disable: () => void;
  trackContentInteraction: (params: TrackContentInteractionParams) => unknown;
};

type TrackContentInteractionParams = {
  contentInteraction: string;
  contentName: string;
  contentPiece: string;
  contentTarget: string;
};

export function ContentInteraction(tracker: TrackerService): ContentInteraction {
  let isEnabled = false;

  const clickHandler = ({ target: clickedElement }: MouseEvent) => {
    if (!clickedElement || !(clickedElement instanceof Element)) return;

    const contentParent = findContentParent(clickedElement);
    if (!contentParent) return;

    const contentBlock = buildContentBlock(contentParent);

    trackContentInteraction({
      contentInteraction: 'click',
      contentName: contentBlock.name,
      contentPiece: contentBlock.piece,
      contentTarget: contentBlock.target,
    });
  };

  const trackContentInteraction = (params: TrackContentInteractionParams) => {
    return tracker.send({
      c_i: params.contentInteraction,
      c_n: params.contentName,
      c_p: params.contentPiece,
      c_t: params.contentTarget,
    });
  };

  return {
    isEnabled: () => isEnabled,

    enable: () => {
      document.addEventListener('click', clickHandler);
      isEnabled = true;
    },

    disable: () => {
      document.removeEventListener('click', clickHandler);
      isEnabled = false;
    },

    trackContentInteraction,
  };
}
