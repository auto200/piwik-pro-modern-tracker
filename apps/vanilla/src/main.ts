import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { createTracker } from '@pp-tracker-client/core';
import { Ecommerce, Product } from '@pp-tracker-client/ecommerce';
import { PageViewsTracker } from '@pp-tracker-client/page-view-tracker';
import { config } from './config';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const tracker = createTracker(config.VITE_TRACKER_BASE_URL, config.VITE_SITE_ID);

const ecommerce = Ecommerce(tracker);

const products: Product[] = [{ sku: 'qwe', brand: 'mcd', quantity: 123 }];

// ecommerce.ecommerceProductDetailView(products);
// ecommerce.ecommerceAddToCart(products);
// ecommerce.ecommerceRemoveFromCart(products);
// ecommerce.ecommerceCartUpdate(products, 123);
// ecommerce.ecommerceOrder(products, { orderId: 231 });

const pageViewsTracker = PageViewsTracker(tracker);

pageViewsTracker.enable();
