// Extend Window interface for Google Analytics
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('event', eventName, properties);
      }
      
      // Custom analytics tracking
      console.log('Analytics event:', eventName, properties);
    }
  };
  
  export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID!, {
          page_path: url,
        });
      }
    }
  };
  
  // Domain detection for analytics
  export const getDomainSource = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('ramdel.mx')) {
        return 'ramdel.mx';
      } else if (hostname.includes('ramdel.dev')) {
        return 'ramdel.dev';
      }
      return 'unknown';
    }
    return 'server';
  };