/**
 * @example
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
/*

import {analyticsProps} from './types.js';
const gaTrackingId = analyticsProps.gaTrackingId;
const pixelTrackingId = analyticsProps.pixelTrackingId;
const gtmTrackingId = analyticsProps.gtmTrackingId;

export const pageview = (url, trackingId) => {
  if (!window.gtag) {
    console.warn(
      'window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet.',
    );
    return;
  }
  window.gtag('config', trackingId, {
    page_path: url,
  });
};
*/

/**
 * @example
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
/*
export const event = ({ action, category, label, value }) => {
  if (!window.gtag) {
    console.warn(
      'window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet.',
    );
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const gtag = {
  pageview,
  event,
};
*/