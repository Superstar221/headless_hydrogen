import {createElement} from 'react';
import {ANALYTICS_IDS} from './const';

export const AnalyticsBody = () => {
  const {gaTrackingId} = ANALYTICS_IDS;

  return createElement(
    'noscript',
    null,
    createElement('iframe', {
      src: `https://www.googletagmanager.com/ns.html?id=${gaTrackingId}`,
      height: '0',
      width: '0',
      style: 'display:none;visibility:hidden',
    }),
  );
};
