import { findFirstElementWithAttribute } from './selectors';

export const CONTENT = {
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

export function findContentName(contentParent: Element) {
  const nameNode = findFirstElementWithAttribute(contentParent, CONTENT.NAME.ATTR);

  return nameNode?.getAttribute(CONTENT.NAME.ATTR)?.trim();
}

export function findContentPiece(contentParent: Element) {
  const pieceNode = findFirstElementWithAttribute(contentParent, CONTENT.PIECE.ATTR);

  if (pieceNode) {
    return pieceNode.getAttribute(CONTENT.PIECE.ATTR)?.trim();
  }

  // TODO: find content piece by class and extract media url
}

export function findContentTarget(contentParent: Element) {
  const targetNodeFromAttr = findFirstElementWithAttribute(contentParent, CONTENT.TARGET.ATTR);

  if (targetNodeFromAttr) {
    return targetNodeFromAttr.getAttribute(CONTENT.TARGET.ATTR)?.trim();
  }

  // TODO: find content target by class and extract url
}

export type ContentBlock = {
  name: string;
  piece: string;
  target: string;
};

export function buildContentBlock(contentParent: Element): ContentBlock {
  const name = findContentName(contentParent);
  const piece = findContentPiece(contentParent);
  const target = findContentTarget(contentParent);

  return {
    name: name || 'Unknown',
    piece: piece || 'Unknown',
    target: target || '',
  };
}
