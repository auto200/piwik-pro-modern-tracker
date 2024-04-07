[Packages Example](../README.md) / [Exports](../modules.md) / @pp-tracker-client/content-impression

# Module: @pp-tracker-client/content-impression

## Table of contents

### Type Aliases

- [ContentImpression](pp_tracker_client_content_impression.md#contentimpression)
- [ContentImpressionConfig](pp_tracker_client_content_impression.md#contentimpressionconfig)

### Functions

- [ContentImpression](pp_tracker_client_content_impression.md#contentimpression-1)

## Type Aliases

### ContentImpression

Ƭ **ContentImpression**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `disable` | () => `void` |
| `enable` | (`config?`: [`ContentImpressionConfig`](pp_tracker_client_content_impression.md#contentimpressionconfig)) => `void` |
| `isEnabled` | () => `boolean` |
| `trackContentImpression` | (`contentBlock`: [`ContentBlock`](pp_tracker_client_content_tracking_utils.md#contentblock)) => `unknown` |
| `trackContentImpressions` | (`contentBlock`: [`ContentBlock`](pp_tracker_client_content_tracking_utils.md#contentblock)[]) => `unknown` |
| `trackPageContentImpressions` | () => `unknown` |

#### Defined in

[index.ts:31](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-impression/src/index.ts#L31)

[index.ts:12](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-impression/src/index.ts#L12)

___

### ContentImpressionConfig

Ƭ **ContentImpressionConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `trackOnlyVisible` | `boolean` |
| `watchIntervalMs` | `number` |

#### Defined in

[index.ts:21](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-impression/src/index.ts#L21)

## Functions

### ContentImpression

▸ **ContentImpression**(`tracker`): [`ContentImpression`](pp_tracker_client_content_impression.md#contentimpression)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracker` | [`TrackerService`](pp_tracker_client_core.md#trackerservice) |

#### Returns

[`ContentImpression`](pp_tracker_client_content_impression.md#contentimpression)

#### Defined in

[index.ts:31](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-impression/src/index.ts#L31)
