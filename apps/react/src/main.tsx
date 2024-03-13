import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { createTracker } from '@pp-tracker-client/core';
import { PageViewsTracker } from '@pp-tracker-client/page-view-tracker';
import { OutlinkTracker } from '@pp-tracker-client/outlink-tracker';
import { ContentInteraction } from '@pp-tracker-client/content-interaction';
import { config } from './config.ts';

const tracker = createTracker(config.VITE_TRACKER_BASE_URL, config.VITE_SITE_ID);
const pageViewsTracker = PageViewsTracker(tracker);
const outlinkTracker = OutlinkTracker(tracker);
const contentInteraction = ContentInteraction(tracker);

contentInteraction.enable();

outlinkTracker.enable();

pageViewsTracker.enable();
// pageViewsTracker.disable();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Link to="/asd">to /asd</Link>,
  },
  {
    path: '/asd',
    element: (
      <Link to="/" replace>
        to /
      </Link>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />

    <RouterProvider router={router} />
  </React.StrictMode>
);
