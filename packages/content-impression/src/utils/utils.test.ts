import { describe, expect, test } from 'vitest';
import {
  CONTENT_IMPRESSION_TRACKED_ATTR,
  ContentBlockInfo,
  buildContentBlockInfo,
  findAllContentParents,
  hashContentBlock,
  markContentParentsAsAlreadyTracked,
} from './utils';
import { CONTENT, ContentBlock } from '@pp-tracker-client/content-tracking-utils';

describe('finding content parents', () => {
  test('should not find any content parents', () => {
    document.documentElement.innerHTML = '';
    expect(findAllContentParents()).toEqual([]);
  });

  test('should find two content parents', () => {
    const template = `
        <div ${CONTENT.PARENT.ATTR}></div>
        <div class="${CONTENT.PARENT.CLASS}"></div>
        <div></div> <!-- make sure other elements are not picked up -->
    `;
    document.documentElement.innerHTML = template;

    expect(findAllContentParents().length).toEqual(2);
  });

  test('should not have duplicate entries if specified both data- attribute and class', () => {
    const template = `
        <div ${CONTENT.PARENT.ATTR} class="${CONTENT.PARENT.CLASS}"></div>
        <div class="${CONTENT.PARENT.CLASS}"></div>
    `;
    document.documentElement.innerHTML = template;

    expect(findAllContentParents().length).toEqual(2);
  });
});

test('hashing content block', () => {
  const block: ContentBlock = {
    name: 'name',
    piece: 'piece',
    target: 'target',
  };
  const hash = hashContentBlock(block);

  expect(hash).toEqual('name-piece-target');
});

test('marking content parent as tracked', () => {
  const parent = document.createElement('a');
  markContentParentsAsAlreadyTracked([parent]);

  expect(parent.getAttribute(CONTENT_IMPRESSION_TRACKED_ATTR)).toEqual('1');
});

test('building content block info', () => {
  const template = `
  <div id="content-parent" ${CONTENT.PARENT.ATTR} ${CONTENT.NAME.ATTR}="content-name">
      <div>title</div>
      <a href="https://piwik.pro" ${CONTENT.TARGET.ATTR}="https://piwik.pro/img">
          <img src="https://piwik.pro/img" ${CONTENT.PIECE.ATTR}="content-piece"/>
      </a>
  </div>
  `;
  document.documentElement.innerHTML = template;

  const parent = document.querySelector('#content-parent')!;
  const info = buildContentBlockInfo(parent);

  const expected: ContentBlockInfo = {
    parentEl: parent,
    block: {
      name: 'content-name',
      piece: 'content-piece',
      target: 'https://piwik.pro/img',
    },
    hash: 'content-name-content-piece-https://piwik.pro/img',
  };
  expect(info).toEqual(expected);
});
