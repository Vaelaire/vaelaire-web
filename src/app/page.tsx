import { AnnouncementBar, SiteHeader, SiteFooter } from "@/components/layout";
import {
  HeroSection,
  IntroSection,
  RoomsSection,
  PillarsSection,
  DiningSection,
  LocationSection,
  NewsletterSection,
  CtaSection,
} from "@/components/sections";
import { BookingBar } from "@/components/booking";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader transparent />

      <main id="main-content">
        <HeroSection />
        <BookingBar variant="hero" />
        <IntroSection />
        <RoomsSection />
        <PillarsSection />
        <DiningSection />
        <LocationSection />
        <NewsletterSection />
        <CtaSection />
      </main>

      <SiteFooter />
    </>
  );
}
