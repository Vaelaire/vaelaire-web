"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Maximize, Bed, Check, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { RoomAvailabilityResult } from "@/services/booking";

interface AvailabilityResultsProps {
  results: RoomAvailabilityResult[];
  checkIn: string;
  checkOut: string;
  guests: number;
  isLoading?: boolean;
}

export function AvailabilityResults({
  results,
  checkIn,
  checkOut,
  guests,
  isLoading,
}: AvailabilityResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 animate-pulse"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-64 h-48 bg-stone/20" />
              <div className="flex-1 space-y-4">
                <div className="h-6 w-48 bg-stone/20" />
                <div className="h-4 w-full bg-stone/20" />
                <div className="h-4 w-3/4 bg-stone/20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white p-12 text-center">
        <h3 className="font-editorial text-display-sm text-charcoal">
          No Rooms Available
        </h3>
        <p className="mt-2 text-body-md text-stone">
          Unfortunately, there are no rooms available for your selected dates.
          Please try different dates.
        </p>
        <Button href="/book" className="mt-6">
          Change Dates
        </Button>
      </div>
    );
  }

  // Calculate nights
  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      {results.map((result) => (
        <div
          key={result.categoryId}
          className={cn(
            "bg-white p-6 transition-shadow",
            result.available && "hover:shadow-lg"
          )}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="relative w-full lg:w-64 h-48 flex-shrink-0 bg-stone/10">
              {result.imageUrls[0] ? (
                <Image
                  src={result.imageUrls[0]}
                  alt={result.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone">
                  No image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-editorial text-display-sm text-charcoal">
                    {result.name}
                  </h3>
                  {result.available ? (
                    <span className="flex items-center gap-1 text-ui-sm text-green-700">
                      <Check className="w-4 h-4" />
                      {result.availableCount} available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-ui-sm text-red-600">
                      <X className="w-4 h-4" />
                      Unavailable
                    </span>
                  )}
                </div>

                <p className="mt-2 text-body-md text-stone line-clamp-2">
                  {result.shortDescription || result.description}
                </p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-4 text-ui-sm text-charcoal">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-stone" />
                    Up to {result.maxOccupancy} guests
                  </span>
                  {result.sizeSqm && (
                    <span className="flex items-center gap-1">
                      <Maximize className="w-4 h-4 text-stone" />
                      {result.sizeSqm} m²
                    </span>
                  )}
                  {result.bedType && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-stone" />
                      {result.bedType}
                    </span>
                  )}
                </div>

                {/* Amenities preview */}
                {result.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-ui-xs text-stone bg-stone/10 px-2 py-1"
                      >
                        {amenity}
                      </span>
                    ))}
                    {result.amenities.length > 4 && (
                      <span className="text-ui-xs text-stone">
                        +{result.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price and CTA */}
              <div className="mt-4 flex items-end justify-between border-t border-stone/20 pt-4">
                <div>
                  <p className="text-body-lg text-charcoal">
                    <span className="font-editorial text-display-sm">
                      {result.currency === "EUR" ? "€" : result.currency}
                      {result.price}
                    </span>
                    <span className="text-stone"> / night</span>
                  </p>
                  <p className="text-ui-sm text-stone">
                    {result.currency === "EUR" ? "€" : result.currency}
                    {result.price * nights} total for {nights} night
                    {nights > 1 ? "s" : ""}
                  </p>
                </div>

                {result.available ? (
                  <Button
                    href={`/book/${result.categorySlug}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                  >
                    Select Room
                  </Button>
                ) : (
                  <Button disabled variant="secondary">
                    Unavailable
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
