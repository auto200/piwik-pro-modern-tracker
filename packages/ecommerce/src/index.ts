import { Dimensions, SendPayload, removeEmptyEntries } from '@pp-tracker-client/core';

type ApiClient = {
  send: (data: SendPayload) => unknown;
  sendBatch: (data: SendPayload[]) => unknown;
};

export type Product = {
  sku: string;
  name?: string;
  category?: string | string[];
  price?: number;
  quantity?: number;
  brand?: string;
  variant?: string;
  customDimensions?: Dimensions;
};

type PaymentInformation = {
  orderId: number | string;
  grandTotal?: number | string;
  subTotal?: number | string;
  tax?: number | string;
  shipping?: number | string;
  discount?: number | string;
};

export type Ecommerce = {
  ecommerceProductDetailView: (products: Product[]) => unknown;
  ecommerceAddToCart: (products: Product[]) => unknown;
  ecommerceRemoveFromCart: (products: Product[]) => unknown;
  ecommerceCartUpdate: (products: Product[], grandTotal: number) => unknown;
  ecommerceOrder: (products: Product[], paymentInfo: PaymentInformation) => unknown;
};

export function Ecommerce(apiClient: ApiClient): Ecommerce {
  return {
    ecommerceProductDetailView: (products) => {
      apiClient.send({
        e_t: 'product-detail-view',
        ec_products: parseProducts(products),
      });
    },

    ecommerceAddToCart: (products) => {
      apiClient.send({
        e_t: 'add-to-cart',
        ec_products: parseProducts(products),
      });
    },

    ecommerceRemoveFromCart: (products) => {
      apiClient.send({
        e_t: 'remove-from-cart',
        ec_products: parseProducts(products),
      });
    },

    ecommerceCartUpdate: (products, grandTotal) => {
      apiClient.send({
        e_t: 'cart-update',
        ec_products: parseProducts(products),
        revenue: grandTotal,
      });
    },

    ecommerceOrder: (products, { orderId, discount, grandTotal, shipping, subTotal, tax }) => {
      apiClient.send({
        e_t: 'order',
        ec_products: parseProducts(products),
        ...removeEmptyEntries({
          ec_id: orderId?.toString(),
          ec_tx: tax?.toString(),
          ec_sh: shipping?.toString(),
          ec_dt: discount?.toString(),
          ec_st: subTotal?.toString(),
          revenue: grandTotal?.toString(),
        }),
      });
    },
  };
}
type ProductAsArray = [
  sku: Product['sku'],
  name: Product['name'],
  category: Product['category'],
  price: Product['price'],
  quantity: Product['quantity'],
  brand: Product['brand'],
  variant: Product['variant'],
  customDimensions: Product['customDimensions'],
];

export function parseProducts(products: Product[]) {
  const parsed = products.map((product) => {
    const {
      sku = '',
      name = '',
      category = '',
      price = 0,
      quantity = 1,
      brand = '',
      variant = '',
      customDimensions = {},
    } = product;
    // TODO: remove unnecessary empty values from the right, example: when only sku and name provided
    // rest of the params are not needed. Example 2: when only sku nad brand are provided, variant and
    // custom dimensions are not needed but previous parameters need to have the defaults set
    const productArray: ProductAsArray = [
      sku,
      name,
      category,
      price,
      quantity,
      brand,
      variant,
      customDimensions,
    ];

    return productArray;
  });

  return JSON.stringify(parsed);
}
