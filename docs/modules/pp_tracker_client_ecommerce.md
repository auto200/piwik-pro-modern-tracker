[Packages Example](../README.md) / [Exports](../modules.md) / @pp-tracker-client/ecommerce

# Module: @pp-tracker-client/ecommerce

## Table of contents

### Type Aliases

- [Ecommerce](pp_tracker_client_ecommerce.md#ecommerce)
- [Product](pp_tracker_client_ecommerce.md#product)

### Functions

- [Ecommerce](pp_tracker_client_ecommerce.md#ecommerce-1)
- [parseProducts](pp_tracker_client_ecommerce.md#parseproducts)

## Type Aliases

### Ecommerce

Ƭ **Ecommerce**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ecommerceAddToCart` | (`products`: [`Product`](pp_tracker_client_ecommerce.md#product)[]) => `unknown` |
| `ecommerceCartUpdate` | (`products`: [`Product`](pp_tracker_client_ecommerce.md#product)[], `grandTotal`: `number`) => `unknown` |
| `ecommerceOrder` | (`products`: [`Product`](pp_tracker_client_ecommerce.md#product)[], `paymentInfo`: `PaymentInformation`) => `unknown` |
| `ecommerceProductDetailView` | (`products`: [`Product`](pp_tracker_client_ecommerce.md#product)[]) => `unknown` |
| `ecommerceRemoveFromCart` | (`products`: [`Product`](pp_tracker_client_ecommerce.md#product)[]) => `unknown` |

#### Defined in

[index.ts:36](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/ecommerce/src/index.ts#L36)

[index.ts:28](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/ecommerce/src/index.ts#L28)

___

### Product

Ƭ **Product**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `brand?` | `string` |
| `category?` | `string` \| `string`[] |
| `customDimensions?` | [`Dimensions`](pp_tracker_client_core.md#dimensions) |
| `name?` | `string` |
| `price?` | `number` |
| `quantity?` | `number` |
| `sku` | `string` |
| `variant?` | `string` |

#### Defined in

[index.ts:8](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/ecommerce/src/index.ts#L8)

## Functions

### Ecommerce

▸ **Ecommerce**(`apiClient`): [`Ecommerce`](pp_tracker_client_ecommerce.md#ecommerce)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiClient` | `ApiClient` |

#### Returns

[`Ecommerce`](pp_tracker_client_ecommerce.md#ecommerce)

#### Defined in

[index.ts:36](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/ecommerce/src/index.ts#L36)

___

### parseProducts

▸ **parseProducts**(`products`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](pp_tracker_client_ecommerce.md#product)[] |

#### Returns

`string`

#### Defined in

[index.ts:94](https://github.com/auto200/piwik-pro-modern-tracker/blob/7f54ce8/packages/ecommerce/src/index.ts#L94)
