"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { InterestForm } from "./InterestForm";
import { currentLaunchConfig, isPrelaunch } from "@/config/launch-mode";
import { cn } from "@/lib/utils";

interface BookingBarProps {
  variant?: "hero" | "sticky" | "standalone";
  className?: string;
}

export function BookingBar({ variant = "hero", className }: BookingBarProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = currentLaunchConfig.bookingBar;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;

    setIsSubmitting(true);
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/book/search?${params.toString()}`);
  };

  // Get tomorrow's date for min check-in
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minCheckIn = tomorrow.toISOString().split("T")[0];

  // Get day after check-in for min check-out
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : minCheckIn;

  // Pre-launch: Show interest form
  if (isPrelaunch) {
    return (
      <div
        className={cn(
          "bg-white p-6 lg:p-8 shadow-lg",
          variant === "hero" && "max-w-3xl mx-auto -mt-12 relative z-10",
          className
        )}
      >
        <div className="text-center mb-6">
          <h2 className="font-editorial text-display-sm text-charcoal">
            {config.heading}
          </h2>
          <p className="mt-2 text-body-md text-stone">{config.description}</p>
        </div>
        <InterestForm variant="inline" />
      </div>
    );
  }

  // Live: Show booking form
  return (
    <div
      className={cn(
        "bg-white p-6 shadow-lg",
        variant === "hero" && "max-w-4xl mx-auto -mt-12 relative z-10",
        variant === "sticky" && "fixed bottom-0 left-0 right-0 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      <form
        className="flex flex-col lg:flex-row gap-4 lg:items-end"
        onSubmit={handleSubmit}
      >
        {/* Check-in */}
        <div className="flex-1">
          <label
            htmlFor="check-in"
            className="block text-ui-sm text-charcoal mb-1"
          >
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <input
              id="check-in"
              type="date"
              name="checkIn"
              value={checkIn}
              min={minCheckIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-stone/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-champagne"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1">
          <label
            htmlFor="check-out"
            className="block text-ui-sm text-charcoal mb-1"
          >
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <input
              id="check-out"
              type="date"
              name="checkOut"
              value={checkOut}
              min={minCheckOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-stone/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-champagne"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 lg:max-w-[160px]">
          <label
            htmlFor="guests"
            className="block text-ui-sm text-charcoal mb-1"
          >
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <select
              id="guests"
              name="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-stone/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-champagne appearance-none bg-white"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="lg:px-8" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              Check Availability
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
