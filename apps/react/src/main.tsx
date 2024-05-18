import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { TrackerService } from '@pp-tracker-client/core';
import { PageViewsTracker } from '@pp-tracker-client/page-view-tracker';
import { OutlinkTracker } from '@pp-tracker-client/outlink-tracker';
import { ContentInteraction } from '@pp-tracker-client/content-interaction';
import { ContentImpression } from '@pp-tracker-client/content-impression';
import { config } from './config.ts';

const tracker = TrackerService({
  baseUrl: config.VITE_TRACKER_BASE_URL,
  siteId: config.VITE_SITE_ID,
});
const pageViewsTracker = PageViewsTracker(tracker);
const outlinkTracker = OutlinkTracker(tracker);
const contentInteraction = ContentInteraction(tracker);
const contentImpression = ContentImpression(tracker);

contentImpression.enable();

contentInteraction.enable();

outlinkTracker.enable();

pageViewsTracker.enable();
// pageViewsTracker.disable();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <App />
        <Link to="/asd">to /asd</Link>
      </>
    ),
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
