/**
 * Analytics event types for Vaelaire
 */
export type AnalyticsEvent =
  | { name: "page_view"; data: { path: string; title?: string } }
  | { name: "booking_search"; data: { checkIn: string; checkOut: string; guests: number } }
  | { name: "booking_start"; data: { roomSlug: string; checkIn: string; checkOut: string } }
  | { name: "booking_complete"; data: { bookingId: string; roomSlug: string; value: number } }
  | { name: "newsletter_signup"; data: { source: string } }
  | { name: "interest_signup"; data: { source: string } }
  | { name: "contact_form_submit"; data: { subject: string } }
  | { name: "room_view"; data: { roomSlug: string } }
  | { name: "experience_view"; data: { experienceSlug: string } }
  | { name: "cta_click"; data: { label: string; location: string } }
  | { name: "outbound_link"; data: { url: string } };

export interface AnalyticsAdapter {
  track(event: AnalyticsEvent): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  page(name?: string, properties?: Record<string, unknown>): void;
}

/**
 * Console-based analytics adapter for development.
 * Replace with real analytics integration (e.g., Google Analytics, Segment, Plausible)
 */
export class ConsoleAnalyticsAdapter implements AnalyticsAdapter {
  private readonly enabled: boolean;

  constructor() {
    this.enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
  }

  track(event: AnalyticsEvent): void {
    if (!this.enabled) return;

    console.log("[Analytics] Track:", event.name, event.data);
  }

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (!this.enabled) return;

    console.log("[Analytics] Identify:", userId, traits);
  }

  page(name?: string, properties?: Record<string, unknown>): void {
    if (!this.enabled) return;

    console.log("[Analytics] Page:", name, properties);
  }
}

// Singleton instance
let analytics: AnalyticsAdapter | null = null;

export function getAnalytics(): AnalyticsAdapter {
  if (!analytics) {
    analytics = new ConsoleAnalyticsAdapter();
  }
  return analytics;
}

/**
 * Helper function to track events
 */
export function trackEvent(event: AnalyticsEvent): void {
  getAnalytics().track(event);
}

/**
 * React hook for analytics (can be expanded with useEffect for page views)
 */
export function useAnalytics() {
  return {
    track: trackEvent,
    identify: (userId: string, traits?: Record<string, unknown>) =>
      getAnalytics().identify(userId, traits),
    page: (name?: string, properties?: Record<string, unknown>) =>
      getAnalytics().page(name, properties),
  };
}
