import { describe, expect, test } from 'vitest';
import { findFirstElementWithAttribute } from './selectors';

describe('finding first element with attribute', () => {
  test('should not return any element', () => {
    const template = `
            <div id="first" data-attr="attr">
                <div id="second" data-attr="attr"></div>
            </div>
        `;
    document.documentElement.innerHTML = template;
    const parent = document.querySelector('#first')!;
    const foundElement = findFirstElementWithAttribute(parent, 'data-not-existent');

    expect(foundElement).toBeNull();
  });

  test('should return provided element', () => {
    const template = `
            <div id="first" data-attr="attr">
                <div id="second" data-attr="attr"></div>
            </div>
        `;
    document.documentElement.innerHTML = template;

    const parent = document.querySelector('#first')!;

    const foundElement = findFirstElementWithAttribute(parent, 'data-attr')!;
    expect(foundElement.id).toBe('first');
  });

  test('should return child of provided element', () => {
    const template = `
            <div id="first" data-attr="attr">
                <div id="second" data-attr="attr">
                    <div id="third" data-another-attr="attr"></div>
                </div>
            </div>
        `;
    document.documentElement.innerHTML = template;

    const parent = document.querySelector('#first')!;

    const foundElement = findFirstElementWithAttribute(parent, 'data-another-attr')!;
    expect(foundElement.id).toBe('third');
  });
});
