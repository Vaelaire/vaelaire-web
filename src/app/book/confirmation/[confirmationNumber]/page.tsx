"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { BookingConfirmation } from "@/components/booking";
import { graphqlClient } from "@/lib/graphql/client";
import { GET_BOOKING_BY_CONFIRMATION } from "@/lib/graphql/queries";
import type { Booking } from "@/lib/graphql/types";

export default function ConfirmationPage() {
  const params = useParams();
  const confirmationNumber = params.confirmationNumber as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        setIsLoading(true);
        const result = await graphqlClient
          .query(GET_BOOKING_BY_CONFIRMATION, { confirmationNumber })
          .toPromise();

        if (result.error) {
          console.error("Error fetching booking:", result.error);
          setError("Could not find your booking. Please check the confirmation number.");
          return;
        }

        if (!result.data?.bookingByConfirmation) {
          setError("Booking not found.");
          return;
        }

        setBooking(result.data.bookingByConfirmation);
      } catch (err) {
        console.error("Error:", err);
        setError("An error occurred while fetching your booking.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooking();
  }, [confirmationNumber]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main id="main-content" className="pt-20 min-h-screen bg-ivory">
          <section className="py-section">
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto animate-pulse">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-stone/20 mx-auto mb-4" />
                  <div className="h-8 w-64 bg-stone/20 mx-auto mb-4" />
                  <div className="h-4 w-48 bg-stone/20 mx-auto" />
                </div>
                <div className="h-24 bg-stone/20 mb-8" />
                <div className="h-64 bg-stone/20" />
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Error state
  if (error || !booking) {
    return (
      <>
        <SiteHeader />
        <main id="main-content" className="pt-20 min-h-screen bg-ivory">
          <section className="py-section">
            <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="font-editorial text-display-md text-charcoal">
                Booking Not Found
              </h1>
              <p className="mt-4 text-body-md text-stone">
                {error || "We couldn't find a booking with that confirmation number."}
              </p>
              <p className="mt-2 text-body-sm text-stone">
                Confirmation number: <span className="font-mono">{confirmationNumber}</span>
              </p>
              <a
                href="mailto:reservations@stayatvaelaire.com"
                className="inline-block mt-6 text-midnight underline"
              >
                Contact us for assistance
              </a>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Get room name from first booking room
  const roomName = booking.rooms?.[0]?.category?.name || "Room";

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-20 min-h-screen bg-ivory">
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <BookingConfirmation
              confirmationNumber={booking.confirmationNumber}
              roomName={roomName}
              checkIn={booking.checkInDate}
              checkOut={booking.checkOutDate}
              guests={booking.adultsCount + booking.childrenCount}
              totalAmount={booking.totalAmount}
              currency={booking.currency}
              guestEmail={booking.guest?.email || ""}
              guestName={
                booking.guest
                  ? `${booking.guest.firstName} ${booking.guest.lastName}`
                  : "Guest"
              }
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
