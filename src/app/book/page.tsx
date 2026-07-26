import { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { SectionEyebrow } from "@/components/content";
import { BookingBar } from "@/components/booking";
import { InterestForm } from "@/components/booking";
import { isPrelaunch } from "@/config/launch-mode";
import { roomCategories } from "@/content";
import { Button } from "@/components/ui";
import Link from "next/link";

export const metadata: Metadata = {
  title: isPrelaunch ? "Join the Opening List" : "Book Your Stay",
  description: isPrelaunch
    ? "Be among the first to stay at Vaelaire Lagos. Join our opening list for priority access."
    : "Reserve your room at Vaelaire Lagos. Check availability and book your stay in the Algarve.",
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-ui-sm font-functional uppercase tracking-widest text-champagne">
              {isPrelaunch ? "Opening Soon" : "Reservations"}
            </span>
            <h1 className="mt-4 font-editorial text-display-lg lg:text-display-xl">
              {isPrelaunch ? "Be Among the First" : "Book Your Stay"}
            </h1>
            <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
              {isPrelaunch
                ? "Vaelaire Lagos is preparing to welcome guests. Join our opening list for priority access to reservations and exclusive offers."
                : "Select your dates and discover available rooms for your stay at Vaelaire Lagos."}
            </p>
          </div>
        </section>

        {/* Booking/Interest Form */}
        <section className="py-section bg-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            {isPrelaunch ? (
              <div className="max-w-lg mx-auto">
                <div className="bg-stone/10 p-8 lg:p-12">
                  <h2 className="font-editorial text-display-sm text-charcoal text-center mb-6">
                    Join the Opening List
                  </h2>
                  <p className="text-body-md text-stone text-center mb-8">
                    Be the first to know when reservations open. Receive
                    exclusive pre-opening offers and priority booking access.
                  </p>
                  <InterestForm variant="standalone" />
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <BookingBar variant="standalone" />
              </div>
            )}
          </div>
        </section>

        {/* Room Preview */}
        <section className="py-section bg-stone/10">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionEyebrow className="mb-4">Accommodations</SectionEyebrow>
              <h2 className="font-editorial text-display-md text-charcoal">
                Our Rooms
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roomCategories.map((room) => (
                <Link
                  key={room.slug}
                  href={`/rooms/${room.slug}`}
                  className="group block bg-ivory p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-editorial text-display-sm text-charcoal group-hover:text-midnight transition-colors">
                    {room.name}
                  </h3>
                  <p className="mt-2 text-body-sm text-stone">
                    {room.size.value} {room.size.unit} • Up to {room.capacity.adults} guests
                  </p>
                  {room.priceFrom && (
                    <p className="mt-4 text-body-md text-charcoal">
                      From <span className="font-editorial">€{room.priceFrom}</span>/night
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button href="/rooms" variant="secondary">
                View All Rooms
              </Button>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-section bg-ivory">
          <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-editorial text-display-md text-charcoal text-center mb-12">
              Good to Know
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-3">
                  Check-in & Check-out
                </h3>
                <p className="text-body-md text-stone">
                  Check-in from 15:00 • Check-out by 11:00
                </p>
                <p className="text-body-sm text-stone mt-1">
                  Early check-in and late check-out available upon request.
                </p>
              </div>

              <div>
                <h3 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-3">
                  Cancellation Policy
                </h3>
                <p className="text-body-md text-stone">
                  Free cancellation up to 7 days before arrival.
                </p>
                <p className="text-body-sm text-stone mt-1">
                  See full terms for specific room policies.
                </p>
              </div>

              <div>
                <h3 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-3">
                  Children & Extra Beds
                </h3>
                <p className="text-body-md text-stone">
                  Children of all ages welcome. Cots and extra beds available
                  in select room categories.
                </p>
              </div>

              <div>
                <h3 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-3">
                  Payment
                </h3>
                <p className="text-body-md text-stone">
                  We accept all major credit cards. A deposit may be required
                  to confirm your reservation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
