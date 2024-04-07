[Packages Example](../README.md) / [Exports](../modules.md) / @pp-tracker-client/content-tracking-utils

# Module: @pp-tracker-client/content-tracking-utils

## Table of contents

### Type Aliases

- [ContentBlock](pp_tracker_client_content_tracking_utils.md#contentblock)

### Variables

- [CONTENT](pp_tracker_client_content_tracking_utils.md#content)

### Functions

- [buildContentBlock](pp_tracker_client_content_tracking_utils.md#buildcontentblock)

## Type Aliases

### ContentBlock

Ƭ **ContentBlock**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `piece` | `string` |
| `target` | `string` |

#### Defined in

[utils/utils.ts:51](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-tracking-utils/src/utils/utils.ts#L51)

## Variables

### CONTENT

• `Const` **CONTENT**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `IGNORE_INTERACTION` | \{ `ATTR`: ``"data-content-ignoreinteraction"`` = 'data-content-ignoreinteraction'; `CLASS`: ``"piwikContentIgnoreInteraction"`` = 'piwikContentIgnoreInteraction' } |
| `IGNORE_INTERACTION.ATTR` | ``"data-content-ignoreinteraction"`` |
| `IGNORE_INTERACTION.CLASS` | ``"piwikContentIgnoreInteraction"`` |
| `NAME` | \{ `ATTR`: ``"data-content-name"`` = 'data-content-name' } |
| `NAME.ATTR` | ``"data-content-name"`` |
| `PARENT` | \{ `ATTR`: ``"data-track-content"`` = 'data-track-content'; `CLASS`: ``"piwikTrackContent"`` = 'piwikTrackContent' } |
| `PARENT.ATTR` | ``"data-track-content"`` |
| `PARENT.CLASS` | ``"piwikTrackContent"`` |
| `PIECE` | \{ `ATTR`: ``"data-content-piece"`` = 'data-content-piece'; `CLASS`: ``"piwikContentPiece"`` = 'piwikContentPiece' } |
| `PIECE.ATTR` | ``"data-content-piece"`` |
| `PIECE.CLASS` | ``"piwikContentPiece"`` |
| `TARGET` | \{ `ATTR`: ``"data-content-target"`` = 'data-content-target'; `CLASS`: ``"piwikContentTarget"`` = 'piwikContentTarget' } |
| `TARGET.ATTR` | ``"data-content-target"`` |
| `TARGET.CLASS` | ``"piwikContentTarget"`` |

#### Defined in

[utils/utils.ts:3](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-tracking-utils/src/utils/utils.ts#L3)

## Functions

### buildContentBlock

▸ **buildContentBlock**(`contentParent`): [`ContentBlock`](pp_tracker_client_content_tracking_utils.md#contentblock)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentParent` | `Element` |

#### Returns

[`ContentBlock`](pp_tracker_client_content_tracking_utils.md#contentblock)

#### Defined in

[utils/utils.ts:57](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-tracking-utils/src/utils/utils.ts#L57)
