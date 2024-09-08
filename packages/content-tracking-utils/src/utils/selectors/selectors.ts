/**
 * If the provided element has specified attribute it will return this element, otherwise it will
 * look in element's children
 */
export function findFirstElementWithAttribute(element: Element, attribute: string) {
  if (element.hasAttribute(attribute)) {
    return element;
  }
  // find in children
  return element.querySelector(`[${attribute}]`);
}
