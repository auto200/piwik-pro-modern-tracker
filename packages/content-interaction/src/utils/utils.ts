import { CONTENT } from '@pp-tracker-client/content-tracking-utils';

export function findContentParentFromClickedElement(clickedElement: Element) {
  return (
    clickedElement.closest(`[${CONTENT.PARENT.ATTR}]`) ||
    clickedElement.closest(`.${CONTENT.PARENT.CLASS}`)
  );
}
