declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type ContactSource = 'menu' | 'contact_section';
export type ContactOutcome = 'sent' | 'local_only' | 'failed';

type ContactEvent = 'contact_open' | 'contact_submit';
type PendingContactEvent = { event: ContactEvent; source: ContactSource; outcome?: ContactOutcome };
const pendingEvents: PendingContactEvent[] = [];

function hasAnalyticsConsent() {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return false;
  try {
    return window.localStorage.getItem('analytics-consent') === 'accepted';
  } catch {
    return false;
  }
}

function dispatchContactEvent({ event, source, outcome }: PendingContactEvent) {
  window.gtag?.('event', event, {
    send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    contact_source: source,
    ...(event === 'contact_submit' && outcome ? { contact_outcome: outcome } : {}),
  });
}

/** Only fixed, non-identifying values may leave the contact flow. */
export function trackContactEvent(
  event: ContactEvent,
  source: ContactSource,
  outcome?: ContactOutcome,
) {
  if (!hasAnalyticsConsent()) return;
  const payload = { event, source, outcome };
  if (typeof window.gtag === 'function') {
    dispatchContactEvent(payload);
  } else {
    pendingEvents.push(payload);
  }
}

/** Flushes fixed-value events only after the consented GA script is initialized. */
export function flushPendingContactEvents() {
  if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') {
    pendingEvents.length = 0;
    return;
  }
  pendingEvents.splice(0).forEach(dispatchContactEvent);
}

export function clearPendingContactEvents() {
  pendingEvents.length = 0;
}
