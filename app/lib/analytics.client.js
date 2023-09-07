import {useEffect} from 'react';
import {useLocation} from '@remix-run/react';
import ReactPixel from 'react-facebook-pixel';

import {ANALYTICS_IDS} from './const';

const useAnalyticsHead = ({pixelTrackingId}) => {
  const location = useLocation();

  useEffect(() => {
    if (pixelTrackingId) {
      ReactPixel.pageView();
    }
  }, [location.pathname, pixelTrackingId]);
  return;
};

export const AnalyticsHead = () => {
  const {pixelTrackingId} = ANALYTICS_IDS;
  useAnalyticsHead(ANALYTICS_IDS);
  ReactPixel.init(pixelTrackingId);

  // useEffectOnce(() => {
  //   const headHtml = `
  //     <script id="gtm-analytics" async src="https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}"}></script>
  //     <script async src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=WbQS8Z"></script>
  //     <script id="gtm-analytics-body">
  //       window.dataLayer = window.dataLayer || [];
  //       function gtag(){dataLayer.push(arguments);}
  //       gtag('js', new Date());

  //       gtag('config', '${gaTrackingId}');
  //     </script>
  //   `;

  //   const slotHtml = document.createRange().createContextualFragment(headHtml);
  //   document.head.appendChild(slotHtml);
  // });

  return null;
};
