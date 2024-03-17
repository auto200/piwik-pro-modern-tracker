import { describe, test, expect, beforeEach } from 'vitest';
import { findContentParentFromClickedElement } from './utils';
import { CONTENT } from '@pp-tracker-client/content-tracking-utils';

describe('finding content parent from within parent', () => {
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

  test('should not find content parent', () => {
    document.documentElement.innerHTML = '';
    expect(findContentParentFromClickedElement(document.documentElement)).toBeNull();
  });

  test('should find content parent', () => {
    const img = document.querySelector('#img')!;
    expect(findContentParentFromClickedElement(img)!.id).toEqual('content-parent');
  });
});
