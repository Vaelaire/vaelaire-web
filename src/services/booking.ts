import { RoomCategory } from "@/content/types";
import { isLive } from "@/config/launch-mode";
import { graphqlClient } from "@/lib/graphql/client";
import {
  GET_DEFAULT_PROPERTY,
  GET_ROOM_CATEGORIES,
  CHECK_ROOM_AVAILABILITY,
  CREATE_PUBLIC_BOOKING,
} from "@/lib/graphql";
import type {
  Property,
  RoomCategoryGQL,
  Booking,
  CreatePublicBookingInput,
} from "@/lib/graphql/types";

export interface BookingSearchParams {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  propertySlug?: string;
}

export interface RoomAvailabilityResult {
  categoryId: string;
  categorySlug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  available: boolean;
  availableCount: number;
  price: number;
  currency: string;
  maxOccupancy: number;
  bedType?: string;
  sizeSqm?: number;
  amenities: string[];
  imageUrls: string[];
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  confirmationNumber?: string;
  totalAmount?: number;
  currency?: string;
  error?: string;
}

export interface BookingCreateParams {
  propertyId: string;
  categoryId: string;
  checkIn: Date;
  checkOut: Date;
  adultsCount?: number;
  childrenCount?: number;
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    marketingOptIn?: boolean;
  };
  specialRequests?: string;
}

export interface BookingAdapter {
  getDefaultProperty(): Promise<Property | null>;
  getRoomCategories(propertyId: string): Promise<RoomCategoryGQL[]>;
  searchAvailability(params: BookingSearchParams): Promise<RoomAvailabilityResult[]>;
  createBooking(params: BookingCreateParams): Promise<BookingResult>;
}

/**
 * GraphQL booking adapter for live mode.
 * Connects to the vaelaire-core-backend GraphQL API.
 */
export class GraphQLBookingAdapter implements BookingAdapter {
  /**
   * Convert a date (Date object or string) to ISO string format for GraphQL
   */
  private toISODateString(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString();
    }
    // Handle string dates like "2026-08-01"
    const dateStr = String(date);
    if (dateStr.includes("T")) {
      // Already has time component
      return new Date(dateStr).toISOString();
    }
    // Add time component for date-only strings
    return `${dateStr}T00:00:00.000Z`;
  }

  async getDefaultProperty(): Promise<Property | null> {
    const result = await graphqlClient.query(GET_DEFAULT_PROPERTY, {}).toPromise();
    if (result.error) {
      console.error("Error fetching default property:", result.error);
      return null;
    }
    return result.data?.defaultProperty || null;
  }

  async getRoomCategories(propertyId: string): Promise<RoomCategoryGQL[]> {
    const result = await graphqlClient
      .query(GET_ROOM_CATEGORIES, { propertyId })
      .toPromise();
    if (result.error) {
      console.error("Error fetching room categories:", result.error);
      return [];
    }
    return result.data?.roomCategories || [];
  }

  async searchAvailability(params: BookingSearchParams): Promise<RoomAvailabilityResult[]> {
    console.log("[GraphQL] searchAvailability called with:", {
      checkIn: params.checkIn,
      checkInType: typeof params.checkIn,
      checkInIsDate: params.checkIn instanceof Date,
      checkOut: params.checkOut,
      checkOutType: typeof params.checkOut,
      guests: params.guests,
    });

    // First, get the default property
    const property = await this.getDefaultProperty();
    console.log("[GraphQL] Default property:", property);

    if (!property) {
      console.error("[GraphQL] No default property found");
      return [];
    }

    // Get all room categories
    const categories = await this.getRoomCategories(property.id);
    console.log("[GraphQL] Room categories:", categories.length, "found");

    // Check availability for each category
    const results = await Promise.all(
      categories.map(async (category) => {
        // Ensure dates are proper ISO strings
        const checkInISO = this.toISODateString(params.checkIn);
        const checkOutISO = this.toISODateString(params.checkOut);

        const variables = {
          propertyId: property.id,
          categoryId: category.id,
          checkIn: checkInISO,
          checkOut: checkOutISO,
        };
        console.log("[GraphQL] CHECK_ROOM_AVAILABILITY variables:", JSON.stringify(variables, null, 2));

        const availResult = await graphqlClient
          .query(CHECK_ROOM_AVAILABILITY, variables)
          .toPromise();

        if (availResult.error) {
          console.error("[GraphQL] Availability error for", category.slug, ":", availResult.error.message);
        }

        const availability = availResult.data?.checkRoomAvailability || {
          available: false,
          availableCount: 0,
        };

        return {
          categoryId: category.id,
          categorySlug: category.slug,
          name: category.name,
          description: category.description,
          shortDescription: category.shortDescription,
          available: availability.available,
          availableCount: availability.availableCount,
          price: category.baseRate,
          currency: property.currency,
          maxOccupancy: category.maxOccupancy,
          bedType: category.bedType,
          sizeSqm: category.sizeSqm,
          amenities: category.amenities,
          imageUrls: category.imageUrls,
        };
      })
    );

    return results;
  }

  async createBooking(params: BookingCreateParams): Promise<BookingResult> {
    const input: CreatePublicBookingInput = {
      propertyId: params.propertyId,
      categoryId: params.categoryId,
      checkInDate: this.toISODateString(params.checkIn),
      checkOutDate: this.toISODateString(params.checkOut),
      adultsCount: params.adultsCount || 2,
      childrenCount: params.childrenCount || 0,
      guest: {
        firstName: params.guestDetails.firstName,
        lastName: params.guestDetails.lastName,
        email: params.guestDetails.email,
        phone: params.guestDetails.phone,
        marketingOptIn: params.guestDetails.marketingOptIn,
      },
      specialRequests: params.specialRequests,
    };

    const result = await graphqlClient
      .mutation(CREATE_PUBLIC_BOOKING, { input })
      .toPromise();

    if (result.error) {
      console.error("Error creating booking:", result.error);
      return {
        success: false,
        error: result.error.message || "Failed to create booking",
      };
    }

    const booking: Booking = result.data?.createPublicBooking;
    if (!booking) {
      return {
        success: false,
        error: "No booking data returned",
      };
    }

    return {
      success: true,
      bookingId: booking.id,
      confirmationNumber: booking.confirmationNumber,
      totalAmount: booking.totalAmount,
      currency: booking.currency,
    };
  }
}

/**
 * Mock booking adapter for development and pre-launch mode.
 */
export class MockBookingAdapter implements BookingAdapter {
  private readonly mockDelay = 500;

  async getDefaultProperty(): Promise<Property | null> {
    await this.delay();
    return {
      id: "mock-property-id",
      slug: "vaelaire",
      name: "Vaelaire",
      currency: "EUR",
      isLive: false,
    };
  }

  async getRoomCategories(): Promise<RoomCategoryGQL[]> {
    await this.delay();
    const { roomCategories } = await import("@/content/vaelaire/rooms");
    return roomCategories.map((room, index) => ({
      id: `mock-category-${index}`,
      propertyId: "mock-property-id",
      name: room.name,
      slug: room.slug,
      description: room.description,
      shortDescription: room.description.substring(0, 100),
      baseRate: room.priceFrom || 200,
      maxOccupancy: room.capacity.adults + (room.capacity.children || 0),
      bedCount: 1,
      bedType: "queen",
      sizeSqm: room.size.value,
      amenities: room.amenities,
      imageUrls: [room.media.featured.src],
      sortOrder: index,
      isActive: true,
    }));
  }

  async searchAvailability(params: BookingSearchParams): Promise<RoomAvailabilityResult[]> {
    await this.delay();

    const { roomCategories } = await import("@/content/vaelaire/rooms");

    if (process.env.NODE_ENV === "development") {
      console.log("Mock search params:", params);
    }

    return roomCategories.map((room, index) => ({
      categoryId: `mock-category-${index}`,
      categorySlug: room.slug,
      name: room.name,
      description: room.description,
      shortDescription: room.description.substring(0, 100),
      available: Math.random() > 0.2,
      availableCount: Math.floor(Math.random() * 3) + 1,
      price: room.priceFrom || 200,
      currency: room.currency || "EUR",
      maxOccupancy: room.capacity.adults + (room.capacity.children || 0),
      bedType: "queen",
      sizeSqm: room.size.value,
      amenities: room.amenities,
      imageUrls: [room.media.featured.src],
    }));
  }

  async createBooking(params: BookingCreateParams): Promise<BookingResult> {
    await this.delay();

    console.log("Mock booking created:", params);

    return {
      success: true,
      bookingId: `BK-${Date.now()}`,
      confirmationNumber: `VAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      totalAmount: 450,
      currency: "EUR",
    };
  }

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.mockDelay));
  }
}

// Singleton instance
let bookingAdapter: BookingAdapter | null = null;

export function getBookingAdapter(): BookingAdapter {
  if (!bookingAdapter) {
    // Use GraphQL adapter in live mode, mock adapter otherwise
    console.log("[BookingAdapter] isLive:", isLive, "- Using:", isLive ? "GraphQLBookingAdapter" : "MockBookingAdapter");
    bookingAdapter = isLive ? new GraphQLBookingAdapter() : new MockBookingAdapter();
  }
  return bookingAdapter;
}

// Re-export legacy types for backwards compatibility
export interface LegacyRoomAvailability {
  room: RoomCategory;
  available: boolean;
  price: number;
  currency: string;
}
