export function findFirstElementWithAttribute(element: Element, attribute: string) {
  if (element.hasAttribute(attribute)) {
    return element;
  }
  // find in children
  return element.querySelector(`[${attribute}]`);
}
