[Packages Example](../README.md) / [Exports](../modules.md) / @pp-tracker-client/content-interaction

# Module: @pp-tracker-client/content-interaction

## Table of contents

### Type Aliases

- [ContentInteraction](pp_tracker_client_content_interaction.md#contentinteraction)
- [Interaction](pp_tracker_client_content_interaction.md#interaction)

### Functions

- [ContentInteraction](pp_tracker_client_content_interaction.md#contentinteraction-1)

## Type Aliases

### ContentInteraction

Ƭ **ContentInteraction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `disable` | () => `void` |
| `enable` | () => `void` |
| `isEnabled` | () => `boolean` |
| `trackContentInteraction` | (`interaction`: [`Interaction`](pp_tracker_client_content_interaction.md#interaction)) => `unknown` |

#### Defined in

[index.ts:16](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-interaction/src/index.ts#L16)

[index.ts:5](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-interaction/src/index.ts#L5)

___

### Interaction

Ƭ **Interaction**: [`ContentBlock`](pp_tracker_client_content_tracking_utils.md#contentblock) & \{ `interaction`: `string`  }

#### Defined in

[index.ts:12](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-interaction/src/index.ts#L12)

## Functions

### ContentInteraction

▸ **ContentInteraction**(`tracker`): [`ContentInteraction`](pp_tracker_client_content_interaction.md#contentinteraction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracker` | [`TrackerService`](pp_tracker_client_core.md#trackerservice) |

#### Returns

[`ContentInteraction`](pp_tracker_client_content_interaction.md#contentinteraction)

#### Defined in

[index.ts:16](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/content-interaction/src/index.ts#L16)
