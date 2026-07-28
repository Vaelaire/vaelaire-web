"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { AvailabilityResults, BookingBar } from "@/components/booking";
import { getBookingAdapter, type RoomAvailabilityResult } from "@/services/booking";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "2", 10);

  const [results, setResults] = useState<RoomAvailabilityResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      if (!checkIn || !checkOut) {
        setError("Please select check-in and check-out dates.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const adapter = getBookingAdapter();
        const availability = await adapter.searchAvailability({
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          guests,
        });
        setResults(availability);
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Failed to fetch room availability. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAvailability();
  }, [checkIn, checkOut, guests]);

  // Calculate nights
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // Format dates for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20 min-h-screen bg-stone/10">
        {/* Header */}
        <section className="bg-midnight text-ivory py-8">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-ui-sm text-champagne hover:text-ivory transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Dates
            </Link>

            <h1 className="font-editorial text-display-md lg:text-display-lg">
              Available Rooms
            </h1>

            {checkIn && checkOut && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-body-md">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-champagne" />
                  {formatDate(checkIn)} — {formatDate(checkOut)}
                  <span className="text-stone">
                    ({nights} night{nights > 1 ? "s" : ""})
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-champagne" />
                  {guests} guest{guests > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            {error ? (
              <div className="bg-white p-12 text-center">
                <h2 className="font-editorial text-display-sm text-charcoal">
                  Something went wrong
                </h2>
                <p className="mt-2 text-body-md text-stone">{error}</p>
                <div className="mt-8 max-w-xl mx-auto">
                  <BookingBar variant="standalone" />
                </div>
              </div>
            ) : (
              <AvailabilityResults
                results={results}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                isLoading={isLoading}
              />
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
