'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Register listener first — setConsent only ever runs inside this callback
    const handler = () => setConsent(true);
    window.addEventListener('analytics-consent-granted', handler);

    // If already accepted in a previous visit, fire through the same event path
    // so setState is always called from a callback, never directly in the effect body
    if (localStorage.getItem('analytics-consent') === 'accepted') {
      window.dispatchEvent(new Event('analytics-consent-granted'));
    }

    return () => window.removeEventListener('analytics-consent-granted', handler);
  }, []);

  // Don't render anything if no consent or env var missing
  if (!consent || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
