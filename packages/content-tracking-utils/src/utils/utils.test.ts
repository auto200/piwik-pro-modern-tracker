import { beforeEach, describe, expect, test } from 'vitest';

import {
  CONTENT,
  buildContentBlock,
  findContentName,
  findContentPiece,
  findContentTarget,
} from './utils';

describe('content interaction utils', () => {
  beforeEach(() => {
    const baseTemplate = `
            <div id="content-parent" ${CONTENT.PARENT.ATTR} ${CONTENT.NAME.ATTR}="content-name">
                <div>title</div>
                <a href="https://piwik.pro" ${CONTENT.TARGET.ATTR}="https://piwik.pro/img">
                    <img src="https://piwik.pro/img" id="img" ${CONTENT.PIECE.ATTR}="content-piece"/>
                </a>
            </div>
            `;
    document.documentElement.innerHTML = baseTemplate;
  });

  describe('finding content name', () => {
    test('should not find any content name', () => {
      document.documentElement.innerHTML = '';
      expect(findContentName(document.documentElement)).toBeUndefined();
    });

    test('should find content name if defined on parent element', () => {
      const parent = document.querySelector('#content-parent')!;
      expect(findContentName(parent)).toBe('content-name');
    });

    test('should find content name if defined inside parent element', () => {
      const template = `
        <div id="content-parent" ${CONTENT.PARENT.ATTR}>
            <div ${CONTENT.NAME.ATTR}="content-name">title</div>
            <a href="https://piwik.pro" ${CONTENT.TARGET.ATTR}="https://piwik.pro/img">
                <img src="https://piwik.pro/img" id="img" ${CONTENT.PIECE.ATTR}="content-piece"/>
            </a>
        </div>
        `;
      document.documentElement.innerHTML = template;

      const parent = document.querySelector('#content-parent')!;
      expect(findContentName(parent)).toBe('content-name');
    });
  });

  describe('finding content piece', () => {
    test('should not find any content piece', () => {
      document.documentElement.innerHTML = '';
      expect(findContentPiece(document.documentElement)).toBeUndefined();
    });

    test('should find content piece if defined on parent element', () => {
      const template = `
        <div id="content-parent" ${CONTENT.PARENT.ATTR} ${CONTENT.PIECE.ATTR}="content-piece">
            <div>title</div>
            <a href="https://piwik.pro" ${CONTENT.TARGET.ATTR}="https://piwik.pro/img">
                <img src="https://piwik.pro/img" id="img"/>
            </a>
        </div>
        `;
      document.documentElement.innerHTML = template;

      const parent = document.querySelector('#content-parent')!;
      expect(findContentPiece(parent)).toBe('content-piece');
    });

    test('should find content piece if defined inside parent element', () => {
      const parent = document.querySelector('#content-parent')!;
      expect(findContentPiece(parent)).toBe('content-piece');
    });
  });

  describe('finding content target', () => {
    test('should not find any content target', () => {
      document.documentElement.innerHTML = '';
      expect(findContentTarget(document.documentElement)).toBeUndefined();
    });

    test('should find content target if defined on parent element', () => {
      const template = `
        <div id="content-parent" ${CONTENT.PARENT.ATTR} ${CONTENT.TARGET.ATTR}="https://piwik.pro/img">
            <div>title</div>
            <a href="https://piwik.pro">
                <img src="https://piwik.pro/img" id="img"/>
            </a>
        </div>
        `;
      document.documentElement.innerHTML = template;

      const parent = document.querySelector('#content-parent')!;
      expect(findContentTarget(parent)).toBe('https://piwik.pro/img');
    });

    test('should find content target if defined inside parent element', () => {
      const parent = document.querySelector('#content-parent')!;
      expect(findContentTarget(parent)).toBe('https://piwik.pro/img');
    });
  });

  describe('building content block', () => {
    test('should build default content block', () => {
      document.documentElement.innerHTML = '';

      expect(buildContentBlock(document.documentElement)).toStrictEqual({
        name: 'Unknown',
        piece: 'Unknown',
        target: '',
      });
    });

    test('should build proper block', () => {
      const parent = document.querySelector('#content-parent')!;

      expect(buildContentBlock(parent)).toStrictEqual({
        name: 'content-name',
        piece: 'content-piece',
        target: 'https://piwik.pro/img',
      });
    });
  });
});
