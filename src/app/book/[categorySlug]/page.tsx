"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import {
  GuestDetailsForm,
  BookingSummary,
  type GuestFormData,
} from "@/components/booking";
import { getBookingAdapter, type RoomAvailabilityResult } from "@/services/booking";

type Step = "details" | "review";

export default function RoomBookingPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = parseInt(searchParams.get("guests") || "2", 10);

  const [step, setStep] = useState<Step>("details");
  const [guestData, setGuestData] = useState<GuestFormData | null>(null);
  const [roomData, setRoomData] = useState<RoomAvailabilityResult | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch room data
  useEffect(() => {
    async function fetchRoomData() {
      try {
        setIsLoading(true);
        const adapter = getBookingAdapter();

        // Get property first
        const property = await adapter.getDefaultProperty();
        if (!property) {
          setError("Property not found");
          return;
        }
        setPropertyId(property.id);

        // Search availability to get room details
        const results = await adapter.searchAvailability({
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          guests,
        });

        const room = results.find((r) => r.categorySlug === categorySlug);
        if (!room) {
          setError("Room not found");
          return;
        }

        if (!room.available) {
          setError("This room is no longer available for the selected dates");
          return;
        }

        setRoomData(room);
      } catch (err) {
        console.error("Error fetching room data:", err);
        setError("Failed to load room details");
      } finally {
        setIsLoading(false);
      }
    }

    if (checkIn && checkOut) {
      fetchRoomData();
    } else {
      setError("Missing booking dates");
      setIsLoading(false);
    }
  }, [categorySlug, checkIn, checkOut, guests]);

  const handleGuestSubmit = async (data: GuestFormData) => {
    setGuestData(data);
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmBooking = async () => {
    if (!guestData || !roomData || !propertyId) return;

    try {
      setIsSubmitting(true);
      const adapter = getBookingAdapter();

      const result = await adapter.createBooking({
        propertyId,
        categoryId: roomData.categoryId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        adultsCount: guests,
        childrenCount: 0,
        guestDetails: {
          firstName: guestData.firstName,
          lastName: guestData.lastName,
          email: guestData.email,
          phone: guestData.phone,
          marketingOptIn: guestData.marketingOptIn,
        },
        specialRequests: guestData.specialRequests,
      });

      if (result.success && result.confirmationNumber) {
        router.push(`/book/confirmation/${result.confirmationNumber}`);
      } else {
        setError(result.error || "Failed to create booking");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("An error occurred while creating your booking");
      setIsSubmitting(false);
    }
  };

  const handleEditDetails = () => {
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main id="main-content" className="pt-20 min-h-screen bg-stone/10">
          <section className="py-section">
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-64 bg-stone/20" />
                <div className="h-4 w-48 bg-stone/20" />
                <div className="h-96 bg-stone/20" />
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Error state
  if (error || !roomData) {
    return (
      <>
        <SiteHeader />
        <main id="main-content" className="pt-20 min-h-screen bg-stone/10">
          <section className="py-section">
            <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="font-editorial text-display-md text-charcoal">
                {error || "Room Not Found"}
              </h1>
              <p className="mt-4 text-body-md text-stone">
                Please try selecting a different room or dates.
              </p>
              <Link
                href={`/book/search?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                className="inline-flex items-center gap-2 mt-6 text-midnight hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to search results
              </Link>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20 min-h-screen bg-stone/10">
        {/* Header */}
        <section className="bg-midnight text-ivory py-8">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/book/search?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
              className="inline-flex items-center gap-2 text-ui-sm text-champagne hover:text-ivory transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to results
            </Link>

            <h1 className="font-editorial text-display-md lg:text-display-lg">
              {roomData.name}
            </h1>

            {/* Progress Steps */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-ui-xs font-medium ${
                    step === "details"
                      ? "bg-champagne text-midnight"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {step === "review" ? <Check className="w-4 h-4" /> : "1"}
                </span>
                <span className="text-ui-sm">Guest Details</span>
              </div>
              <div className="w-8 h-px bg-stone/40" />
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-ui-xs font-medium ${
                    step === "review"
                      ? "bg-champagne text-midnight"
                      : "bg-stone/40 text-stone"
                  }`}
                >
                  2
                </span>
                <span
                  className={`text-ui-sm ${
                    step === "review" ? "text-ivory" : "text-stone"
                  }`}
                >
                  Review & Confirm
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === "details" ? (
                  <div className="bg-white p-6 lg:p-8">
                    <h2 className="font-editorial text-display-sm text-charcoal mb-6">
                      Guest Details
                    </h2>
                    <GuestDetailsForm
                      onSubmit={handleGuestSubmit}
                      defaultValues={guestData || undefined}
                    />
                  </div>
                ) : (
                  <div className="bg-white p-6 lg:p-8">
                    <h2 className="font-editorial text-display-sm text-charcoal mb-6">
                      Review Your Booking
                    </h2>
                    <p className="text-body-md text-stone mb-8">
                      Please review your booking details below. Click
                      &quot;Confirm Booking&quot; to complete your reservation.
                    </p>
                    {guestData && (
                      <BookingSummary
                        roomName={roomData.name}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        guests={guests}
                        pricePerNight={roomData.price}
                        currency={roomData.currency}
                        guestDetails={guestData}
                        onEdit={handleEditDetails}
                        onConfirm={handleConfirmBooking}
                        isConfirming={isSubmitting}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar - Room Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 sticky top-24">
                  <h3 className="font-editorial text-display-xs text-charcoal mb-4">
                    Your Selection
                  </h3>

                  {/* Room image */}
                  {roomData.imageUrls[0] && (
                    <div className="aspect-[4/3] bg-stone/10 mb-4 relative overflow-hidden">
                      <img
                        src={roomData.imageUrls[0]}
                        alt={roomData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <h4 className="font-editorial text-body-lg text-charcoal">
                    {roomData.name}
                  </h4>

                  <div className="mt-4 space-y-2 text-body-sm text-stone">
                    <p>
                      {new Date(checkIn).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      —{" "}
                      {new Date(checkOut).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      {nights} night{nights > 1 ? "s" : ""}, {guests} guest
                      {guests > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone/20">
                    <div className="flex justify-between items-center">
                      <span className="text-body-md text-stone">Total</span>
                      <span className="font-editorial text-display-xs text-charcoal">
                        {roomData.currency === "EUR" ? "€" : roomData.currency}
                        {roomData.price * nights}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
