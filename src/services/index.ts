export { getBookingAdapter, MockBookingAdapter } from "./booking";
export type { BookingAdapter, BookingSearchParams, RoomAvailability, BookingResult } from "./booking";

export { getNewsletterService, MockNewsletterService } from "./newsletter";
export type { NewsletterService, NewsletterSubscription, SubscriptionResult } from "./newsletter";

export { getAnalytics, trackEvent, useAnalytics, ConsoleAnalyticsAdapter } from "./analytics";
export type { AnalyticsEvent, AnalyticsAdapter } from "./analytics";
