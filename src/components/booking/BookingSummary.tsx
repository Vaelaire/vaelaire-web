"use client";

import { Calendar, Users, Bed, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui";
import type { GuestFormData } from "./GuestDetailsForm";

interface BookingSummaryProps {
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  pricePerNight: number;
  currency: string;
  guestDetails: GuestFormData;
  onEdit?: () => void;
  onConfirm?: () => void;
  isConfirming?: boolean;
}

export function BookingSummary({
  roomName,
  checkIn,
  checkOut,
  guests,
  pricePerNight,
  currency,
  guestDetails,
  onEdit,
  onConfirm,
  isConfirming = false,
}: BookingSummaryProps) {
  // Calculate nights and total
  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const total = pricePerNight * nights;
  const currencySymbol = currency === "EUR" ? "€" : currency;

  // Format dates
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 lg:p-8 space-y-6">
      <h3 className="font-editorial text-display-sm text-charcoal">
        Booking Summary
      </h3>

      {/* Room Details */}
      <div className="pb-6 border-b border-stone/20">
        <h4 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-4">
          Your Stay
        </h4>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Bed className="w-5 h-5 text-stone mt-0.5" />
            <div>
              <p className="text-body-md text-charcoal font-medium">{roomName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-stone mt-0.5" />
            <div>
              <p className="text-body-md text-charcoal">
                {formatDate(checkIn)} — {formatDate(checkOut)}
              </p>
              <p className="text-body-sm text-stone">
                {nights} night{nights > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-stone" />
            <p className="text-body-md text-charcoal">
              {guests} guest{guests > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Guest Details */}
      <div className="pb-6 border-b border-stone/20">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal">
            Guest Details
          </h4>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="text-ui-sm text-midnight hover:underline"
            >
              Edit
            </button>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-body-md text-charcoal font-medium">
            {guestDetails.firstName} {guestDetails.lastName}
          </p>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-stone" />
            <p className="text-body-md text-charcoal">{guestDetails.email}</p>
          </div>

          {guestDetails.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-stone" />
              <p className="text-body-md text-charcoal">{guestDetails.phone}</p>
            </div>
          )}

          {guestDetails.specialRequests && (
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-stone mt-0.5" />
              <p className="text-body-sm text-stone">
                {guestDetails.specialRequests}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="pb-6 border-b border-stone/20">
        <h4 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-4">
          Price Details
        </h4>

        <div className="space-y-2">
          <div className="flex justify-between text-body-md">
            <span className="text-stone">
              {currencySymbol}
              {pricePerNight} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span className="text-charcoal">
              {currencySymbol}
              {total}
            </span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-body-lg text-charcoal font-medium">Total</span>
        <span className="font-editorial text-display-sm text-charcoal">
          {currencySymbol}
          {total}
        </span>
      </div>

      {/* Confirm Button */}
      {onConfirm && (
        <Button
          onClick={onConfirm}
          disabled={isConfirming}
          className="w-full"
          size="lg"
        >
          {isConfirming ? "Confirming..." : "Confirm Booking"}
        </Button>
      )}

      {/* Terms */}
      <p className="text-ui-xs text-stone text-center">
        By confirming, you agree to our{" "}
        <a href="/terms" className="underline hover:text-charcoal">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-charcoal">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
