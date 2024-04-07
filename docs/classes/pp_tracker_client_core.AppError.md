[Packages Example](../README.md) / [Exports](../modules.md) / [@pp-tracker-client/core](../modules/pp_tracker_client_core.md) / AppError

# Class: AppError

[@pp-tracker-client/core](../modules/pp_tracker_client_core.md).AppError

## Hierarchy

- `Error`

  ↳ **`AppError`**

## Table of contents

### Constructors

- [constructor](pp_tracker_client_core.AppError.md#constructor)

### Properties

- [cause](pp_tracker_client_core.AppError.md#cause)
- [message](pp_tracker_client_core.AppError.md#message)
- [name](pp_tracker_client_core.AppError.md#name)
- [originalError](pp_tracker_client_core.AppError.md#originalerror)
- [stack](pp_tracker_client_core.AppError.md#stack)

## Constructors

### constructor

• **new AppError**(`name`, `originalError`, `message`): [`AppError`](pp_tracker_client_core.AppError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `originalError` | `unknown` |
| `message` | `string` |

#### Returns

[`AppError`](pp_tracker_client_core.AppError.md)

#### Overrides

Error.constructor

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:81](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L81)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/.pnpm/typescript@5.3.3/node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:84](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L84)

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:82](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L82)

___

### originalError

• **originalError**: `unknown`

#### Defined in

[packages/core/src/services/HttpService/HttpService.ts:83](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/core/src/services/HttpService/HttpService.ts#L83)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/.pnpm/typescript@5.3.3/node_modules/typescript/lib/lib.es5.d.ts:1077
