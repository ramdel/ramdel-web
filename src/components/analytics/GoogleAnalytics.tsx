'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Load immediately if already accepted in a previous visit
    if (localStorage.getItem('analytics-consent') === 'accepted') {
      setConsent(true);
    }

    // Load when the user accepts during this session
    const handler = () => setConsent(true);
    window.addEventListener('analytics-consent-granted', handler);
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
