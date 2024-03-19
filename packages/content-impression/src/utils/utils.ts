import {
  CONTENT,
  ContentBlock,
  buildContentBlock,
} from '@pp-tracker-client/content-tracking-utils';

export const CONTENT_IMPRESSION_TRACKED_ATTR = 'data-content-impression-tracked';

export function findAllContentParents() {
  return [
    ...new Set([
      ...document.querySelectorAll(`[${CONTENT.PARENT.ATTR}]`),
      ...document.querySelectorAll(`.${CONTENT.PARENT.CLASS}`),
    ]),
  ];
}

export function filterOutTrackedContentParents(contentParents: Element[]) {
  return contentParents.filter((parent) => !parent.hasAttribute(CONTENT_IMPRESSION_TRACKED_ATTR));
}

export function filterOutNotVisibleContentParents(contentParents: Element[]) {
  return contentParents.filter((el) => !isInViewport(el));
}
// TODO: test
export function isInViewport(element: Element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function markContentParentsAsAlreadyTracked(contentParents: Element[]) {
  for (const parent of contentParents) {
    parent.setAttribute(CONTENT_IMPRESSION_TRACKED_ATTR, '1');
  }
}

export type ContentBlockHash = `${string}-${string}-${string}`;

export function hashContentBlock(block: ContentBlock): ContentBlockHash {
  return `${block.name}-${block.piece}-${block.target}`;
}

export type ContentBlockInfo = {
  parentEl: Element;
  block: ContentBlock;
  hash: ContentBlockHash;
};

export function buildContentBlockInfo(contentParent: Element): ContentBlockInfo {
  const block = buildContentBlock(contentParent);

  return {
    parentEl: contentParent,
    block,
    hash: hashContentBlock(block),
  };
}
