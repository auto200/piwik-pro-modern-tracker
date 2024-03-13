import { TrackerService } from '@pp-tracker-client/core';

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

const CONTENT = {
  PARENT: {
    ATTR: 'data-track-content',
    CLASS: 'piwikTrackContent',
  },
  NAME: {
    ATTR: 'data-content-name',
  },
  PIECE: {
    ATTR: 'data-content-piece',
    CLASS: 'piwikContentPiece',
  },
  TARGET: {
    ATTR: 'data-content-target',
    CLASS: 'piwikContentTarget',
  },
  IGNORE_INTERACTION: {
    ATTR: 'data-content-ignoreinteraction',
    CLASS: 'piwikContentIgnoreInteraction',
  },
} as const;

/**
 * Find content parent form clicked element
 */
function findContentParent(clickedElement: Element) {
  return (
    clickedElement.closest(`[${CONTENT.PARENT.ATTR}]`) ||
    clickedElement.closest(`.${CONTENT.PARENT.CLASS}`)
  );
}

function findFirstElementWithAttribute(element: Element, attribute: string) {
  if (element.hasAttribute(attribute)) {
    return element;
  }
  // find in children
  return element.querySelector(`[${attribute}]`);
}

function findContentName(contentParent: Element) {
  const nameNode = findFirstElementWithAttribute(contentParent, CONTENT.NAME.ATTR);

  return nameNode?.getAttribute(CONTENT.NAME.ATTR)?.trim();
}

function findContentPiece(contentParent: Element) {
  const pieceNode = findFirstElementWithAttribute(contentParent, CONTENT.PIECE.ATTR);

  if (pieceNode) {
    return pieceNode.getAttribute(CONTENT.NAME.ATTR)?.trim();
  }

  // TODO: find content piece by class and extract media url
}

function findContentTarget(contentParent: Element) {
  const targetNodeFromAttr = findFirstElementWithAttribute(contentParent, CONTENT.TARGET.ATTR);

  if (targetNodeFromAttr) {
    return targetNodeFromAttr.getAttribute(CONTENT.TARGET.ATTR)?.trim();
  }

  // TODO: find content target by class and extract url
}

function buildContentBlock(contentParent: Element) {
  const name = findContentName(contentParent);
  const piece = findContentPiece(contentParent);
  const target = findContentTarget(contentParent);

  return {
    name: name || 'Unknown',
    piece: piece || 'Unknown',
    target: target || '',
  };
}

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
