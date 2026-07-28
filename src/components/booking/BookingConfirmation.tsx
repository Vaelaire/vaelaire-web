"use client";

import { CheckCircle, Calendar, Users, Bed, Mail, Printer, Download } from "lucide-react";
import { Button } from "@/components/ui";

interface BookingConfirmationProps {
  confirmationNumber: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  currency: string;
  guestEmail: string;
  guestName: string;
}

export function BookingConfirmation({
  confirmationNumber,
  roomName,
  checkIn,
  checkOut,
  guests,
  totalAmount,
  currency,
  guestEmail,
  guestName,
}: BookingConfirmationProps) {
  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const currencySymbol = currency === "EUR" ? "€" : currency;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-editorial text-display-md text-charcoal">
          Booking Confirmed
        </h1>
        <p className="mt-2 text-body-lg text-stone">
          Thank you, {guestName}! Your reservation is confirmed.
        </p>
      </div>

      {/* Confirmation Number */}
      <div className="bg-midnight text-ivory p-6 text-center mb-8">
        <p className="text-ui-sm uppercase tracking-widest text-champagne mb-2">
          Confirmation Number
        </p>
        <p className="font-editorial text-display-lg">{confirmationNumber}</p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white p-6 lg:p-8 shadow-sm mb-8">
        <h2 className="font-editorial text-display-sm text-charcoal mb-6">
          Reservation Details
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-stone/20">
            <Bed className="w-5 h-5 text-stone mt-0.5" />
            <div>
              <p className="text-ui-sm text-stone uppercase tracking-wider">
                Room
              </p>
              <p className="text-body-md text-charcoal font-medium">
                {roomName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-stone/20">
            <Calendar className="w-5 h-5 text-stone mt-0.5" />
            <div className="flex-1">
              <p className="text-ui-sm text-stone uppercase tracking-wider mb-2">
                Dates
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-body-sm text-stone">Check-in</p>
                  <p className="text-body-md text-charcoal">
                    {formatDate(checkIn)}
                  </p>
                  <p className="text-body-sm text-stone">From 15:00</p>
                </div>
                <div>
                  <p className="text-body-sm text-stone">Check-out</p>
                  <p className="text-body-md text-charcoal">
                    {formatDate(checkOut)}
                  </p>
                  <p className="text-body-sm text-stone">Until 11:00</p>
                </div>
              </div>
              <p className="mt-2 text-body-sm text-stone">
                {nights} night{nights > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-stone/20">
            <Users className="w-5 h-5 text-stone mt-0.5" />
            <div>
              <p className="text-ui-sm text-stone uppercase tracking-wider">
                Guests
              </p>
              <p className="text-body-md text-charcoal">
                {guests} guest{guests > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-5" />
            <div className="flex-1">
              <p className="text-ui-sm text-stone uppercase tracking-wider mb-2">
                Total
              </p>
              <p className="font-editorial text-display-sm text-charcoal">
                {currencySymbol}
                {totalAmount}
              </p>
              <p className="text-body-sm text-stone">Payment due at check-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <div className="bg-stone/10 p-6 mb-8 flex items-start gap-4">
        <Mail className="w-5 h-5 text-stone mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-body-md text-charcoal">
            A confirmation email has been sent to{" "}
            <span className="font-medium">{guestEmail}</span>
          </p>
          <p className="mt-1 text-body-sm text-stone">
            Please check your inbox (and spam folder) for your booking details.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="secondary" onClick={handlePrint}>
          <Printer className="mr-2 w-4 h-4" />
          Print Confirmation
        </Button>
        <Button href="/">Return to Homepage</Button>
      </div>

      {/* Contact Info */}
      <div className="mt-12 text-center text-body-sm text-stone">
        <p>
          Questions about your reservation?{" "}
          <a
            href="mailto:reservations@stayatvaelaire.com"
            className="text-midnight underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
