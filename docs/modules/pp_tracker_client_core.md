[Packages Example](../README.md) / [Exports](../modules.md) / @pp-tracker-client/core

# Module: @pp-tracker-client/core

## Table of contents

### Enumerations

- [PingLevel](../enums/pp_tracker_client_core.PingLevel.md)

### Classes

- [AppError](../classes/pp_tracker_client_core.AppError.md)

### Type Aliases

- [Dimensions](pp_tracker_client_core.md#dimensions)
- [HttpService](pp_tracker_client_core.md#httpservice)
- [RequestParams](pp_tracker_client_core.md#requestparams)
- [SendPayload](pp_tracker_client_core.md#sendpayload)
- [TrackerApiClient](pp_tracker_client_core.md#trackerapiclient)
- [TrackerService](pp_tracker_client_core.md#trackerservice)
- [TrackingData](pp_tracker_client_core.md#trackingdata)

### Functions

- [HttpService](pp_tracker_client_core.md#httpservice-1)
- [TrackerApiClient](pp_tracker_client_core.md#trackerapiclient-1)
- [TrackerService](pp_tracker_client_core.md#trackerservice-1)
- [createTracker](pp_tracker_client_core.md#createtracker)
- [isArray](pp_tracker_client_core.md#isarray)
- [mapDimensions](pp_tracker_client_core.md#mapdimensions)
- [paramsToQueryString](pp_tracker_client_core.md#paramstoquerystring)
- [removeEmptyEntries](pp_tracker_client_core.md#removeemptyentries)
- [toArray](pp_tracker_client_core.md#toarray)

## Type Aliases

### Dimensions

Ƭ **Dimensions**: `Record`\<`number`, `string`\>

#### Defined in

[packages/core/src/types.ts:1](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/types.ts#L1)

___

### HttpService

Ƭ **HttpService**: `ReturnType`\<typeof [`HttpService`](pp_tracker_client_core.md#httpservice-1)\>

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:9](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L9)

[packages/core/src/services/HttpService/HttpService.ts:32](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L32)

___

### RequestParams

Ƭ **RequestParams**: `Omit`\<`RequestInit`, ``"body"``\> & \{ `body?`: `PayloadBody` ; `query?`: `QueryParams`  }

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:4](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L4)

___

### SendPayload

Ƭ **SendPayload**: [`TrackingData`](pp_tracker_client_core.md#trackingdata) & \{ `dimensions?`: [`Dimensions`](pp_tracker_client_core.md#dimensions)  }

#### Defined in

[packages/core/src/services/TrackerApiClient/TrackerApiClient.ts:581](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerApiClient/TrackerApiClient.ts#L581)

___

### TrackerApiClient

Ƭ **TrackerApiClient**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ping` | (`level`: [`PingLevel`](../enums/pp_tracker_client_core.PingLevel.md)) => `unknown` |
| `send` | (`data`: [`SendPayload`](pp_tracker_client_core.md#sendpayload)) => `unknown` |
| `sendBatch` | (`data`: [`SendPayload`](pp_tracker_client_core.md#sendpayload)[]) => `unknown` |
| `trackEvent` | (`props`: \{ `action`: `string` ; `category`: `string` ; `dimensions?`: [`Dimensions`](pp_tracker_client_core.md#dimensions) ; `name?`: `string` ; `value?`: `number`  }) => `unknown` |
| `trackGoal` | (`props`: \{ `conversionValue?`: `number` ; `dimensions?`: [`Dimensions`](pp_tracker_client_core.md#dimensions) ; `goalId`: `number` \| `string`  }) => `unknown` |
| `trackPageView` | (`props`: `TrackPageViewProps`) => `unknown` |
| `trackSiteSearch` | (`props`: \{ `category?`: `string` \| `string`[] ; `dimensions?`: [`Dimensions`](pp_tracker_client_core.md#dimensions) ; `keyword`: `string` ; `searchCount?`: `number`  }) => `unknown` |

#### Defined in

[packages/core/src/services/TrackerApiClient/TrackerApiClient.ts:612](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerApiClient/TrackerApiClient.ts#L612)

[packages/core/src/services/TrackerApiClient/TrackerApiClient.ts:583](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerApiClient/TrackerApiClient.ts#L583)

___

### TrackerService

Ƭ **TrackerService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ping` | (`level?`: [`PingLevel`](../enums/pp_tracker_client_core.PingLevel.md)) => `unknown` |
| `send` | (`data`: [`SendPayload`](pp_tracker_client_core.md#sendpayload)) => `unknown` |
| `sendBatch` | (`data`: [`SendPayload`](pp_tracker_client_core.md#sendpayload)[]) => `unknown` |
| `trackEvent` | (`props`: \{ `action`: `string` ; `category`: `string` ; `dimensions?`: [`Dimensions`](pp_tracker_client_core.md#dimensions) ; `name?`: `string` ; `value?`: `number`  }) => `unknown` |
| `trackGoal` | (`props`: \{ `conversionValue?`: `number` ; `dimensions?`: [`Dimensions`](pp_tracker_client_core.md#dimensions) ; `goalId`: `number` \| `string`  }) => `unknown` |
| `trackPageView` | (`props`: `TrackPageViewProps`) => `unknown` |
| `trackSiteSearch` | (`props`: \{ `category?`: `string` \| `string`[] ; `dimensions`: [`Dimensions`](pp_tracker_client_core.md#dimensions) ; `keyword`: `string` ; `searchCount?`: `number`  }) => `unknown` |

#### Defined in

[packages/core/src/services/TrackerService.ts:32](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerService.ts#L32)

[packages/core/src/services/TrackerService.ts:7](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerService.ts#L7)

___

### TrackingData

Ƭ **TrackingData**: `Partial`\<\{ `_cvar`: `string` ; `_ects`: `string` ; `_id`: `string` ; `_idts`: `string` ; `_idvc`: `string` ; `_viewts`: `string` ; `action_name`: `string` ; `ag`: `string` ; `c_i`: `string` ; `c_n`: `string` ; `c_p`: `string` ; `c_t`: `string` ; `cdt`: `string` ; `cid`: `string` ; `cip`: `string` ; `city`: `string` ; `cookie`: `string` ; `country`: `string` ; `cs`: `string` ; `dimensionID`: `string` ; `dir`: `string` ; `download`: `string` ; `e_a`: `string` ; `e_c`: `string` ; `e_n`: `string` ; `e_t`: ``"order"`` \| ``"cart-update"`` \| ``"product-detail-view"`` \| ``"add-to-cart"`` \| ``"remove-from-cart"`` ; `e_v`: `string` ; `ec_dt`: `string` \| `number` ; `ec_id`: `string` ; `ec_products`: `string` ; `ec_sh`: `string` \| `number` ; `ec_st`: `string` \| `number` ; `ec_tx`: `string` \| `number` ; `fla`: `string` ; `gears`: `string` ; `gt_ms`: `string` ; `h`: `string` ; `idgoal`: `string` \| `number` ; `idsite`: `string` ; `java`: `string` ; `lang`: `string` ; `lat`: `string` ; `link`: `string` ; `lon`: `string` ; `m`: `string` ; `new_visit`: ``0`` \| ``1`` ; `pdf`: `string` ; `ping`: `string` ; `pv_id`: `string` ; `qt`: `string` ; `r`: `number` ; `realp`: `string` ; `rec`: ``0`` \| ``1`` ; `region`: `string` ; `res`: `string` ; `revenue`: `string` \| `number` ; `rmip`: ``0`` \| ``1`` ; `s`: `string` ; `search`: `string` ; `search_cats`: `string`[] ; `search_count`: `number` ; `send_image`: `string` ; `sh`: ``0`` \| ``1`` ; `t_ae`: `string` ; `t_as`: `string` ; `t_ce`: `string` ; `t_cs`: `string` ; `t_dc`: `string` ; `t_di`: `string` ; `t_dl`: `string` ; `t_ds`: `string` ; `t_ee`: `string` ; `t_fs`: `string` ; `t_le`: `string` ; `t_ls`: `string` ; `t_qs`: `string` ; `t_re`: `string` ; `t_rs`: `string` ; `t_ss`: `string` ; `t_ue`: `string` ; `t_us`: `string` ; `ts_n`: `string` ; `ts_v`: `string` ; `ua`: `string` ; `uia`: `string` ; `uid`: `string` ; `url`: `string` ; `urlref`: `string` ; `wma`: `string`  }\>

#### Defined in

[packages/core/src/services/TrackerApiClient/TrackerApiClient.ts:5](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerApiClient/TrackerApiClient.ts#L5)

## Functions

### HttpService

▸ **HttpService**(`fetcher?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fetcher` | (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`\<`Response`\> | `fetch` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `get` | (`url`: `string`, `params`: [`RequestParams`](pp_tracker_client_core.md#requestparams)) => `Promise`\<`void`\> |
| `post` | (`url`: `string`, `params`: [`RequestParams`](pp_tracker_client_core.md#requestparams)) => `Promise`\<`void`\> |

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:9](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L9)

___

### TrackerApiClient

▸ **TrackerApiClient**(`http`, `baseUrl`, `siteId`): [`TrackerApiClient`](pp_tracker_client_core.md#trackerapiclient)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `Object` |
| `http.get` | (`url`: `string`, `params`: [`RequestParams`](pp_tracker_client_core.md#requestparams)) => `Promise`\<`void`\> |
| `http.post` | (`url`: `string`, `params`: [`RequestParams`](pp_tracker_client_core.md#requestparams)) => `Promise`\<`void`\> |
| `baseUrl` | `string` |
| `siteId` | `string` |

#### Returns

[`TrackerApiClient`](pp_tracker_client_core.md#trackerapiclient)

#### Defined in

[packages/core/src/services/TrackerApiClient/TrackerApiClient.ts:612](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerApiClient/TrackerApiClient.ts#L612)

___

### TrackerService

▸ **TrackerService**(`trackerApiClient`): [`TrackerService`](pp_tracker_client_core.md#trackerservice)

#### Parameters

| Name | Type |
| :------ | :------ |
| `trackerApiClient` | [`TrackerApiClient`](pp_tracker_client_core.md#trackerapiclient) |

#### Returns

[`TrackerService`](pp_tracker_client_core.md#trackerservice)

#### Defined in

[packages/core/src/services/TrackerService.ts:32](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerService.ts#L32)

___

### createTracker

▸ **createTracker**(`baseUrl`, `siteId`): [`TrackerService`](pp_tracker_client_core.md#trackerservice)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `string` |
| `siteId` | `string` |

#### Returns

[`TrackerService`](pp_tracker_client_core.md#trackerservice)

#### Defined in

[packages/core/src/index.ts:11](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/index.ts#L11)

___

### isArray

▸ **isArray**\<`T`\>(`input`): input is T[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` \| `T`[] |

#### Returns

input is T[]

#### Defined in

[packages/core/src/utils/index.ts:18](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/utils/index.ts#L18)

___

### mapDimensions

▸ **mapDimensions**(`dimensions`): `MappedDimensions`

Maps dimensions from `{1: "value"}`

to

`{dimension1: "value"}`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dimensions` | [`Dimensions`](pp_tracker_client_core.md#dimensions) |

#### Returns

`MappedDimensions`

#### Defined in

[packages/core/src/services/TrackerApiClient/TrackerApiClient.ts:690](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/TrackerApiClient/TrackerApiClient.ts#L690)

___

### paramsToQueryString

▸ **paramsToQueryString**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `QueryParams` |

#### Returns

`string`

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:40](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L40)

___

### removeEmptyEntries

▸ **removeEmptyEntries**\<`T`\>(`input`): `WithoutNullableKeys`\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, `unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` |

#### Returns

`WithoutNullableKeys`\<`T`\>

#### Defined in

[packages/core/src/utils/index.ts:1](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/utils/index.ts#L1)

___

### toArray

▸ **toArray**\<`T`\>(`input`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` \| `T`[] |

#### Returns

`T`[]

#### Defined in

[packages/core/src/utils/index.ts:14](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/utils/index.ts#L14)
