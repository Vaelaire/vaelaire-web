import { RoomCategory } from "@/content/types";

export interface BookingSearchParams {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  propertySlug?: string;
}

export interface RoomAvailability {
  room: RoomCategory;
  available: boolean;
  price: number;
  currency: string;
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  confirmationNumber?: string;
  error?: string;
}

export interface BookingAdapter {
  searchAvailability(params: BookingSearchParams): Promise<RoomAvailability[]>;
  createBooking(params: {
    roomSlug: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    guestDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
    };
  }): Promise<BookingResult>;
}

/**
 * Mock booking adapter for development and pre-launch mode.
 * Replace with a real booking system integration (e.g., Mews, Cloudbeds, SynXis)
 */
export class MockBookingAdapter implements BookingAdapter {
  private readonly mockDelay = 500;

  async searchAvailability(params: BookingSearchParams): Promise<RoomAvailability[]> {
    await this.delay();

    // Import rooms dynamically to avoid circular dependencies
    const { roomCategories } = await import("@/content/vaelaire/rooms");

    // In a real implementation, params would be used to query the booking engine
    // For now, we log them for debugging purposes
    if (process.env.NODE_ENV === "development") {
      console.log("Mock search params:", params);
    }

    // Mock availability - in reality, this would query a booking engine
    return roomCategories.map((room) => ({
      room,
      available: Math.random() > 0.2, // 80% availability
      price: room.priceFrom || 0,
      currency: room.currency || "EUR",
    }));
  }

  async createBooking(params: {
    roomSlug: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    guestDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
    };
  }): Promise<BookingResult> {
    await this.delay();

    // Mock booking creation
    console.log("Mock booking created:", params);

    return {
      success: true,
      bookingId: `BK-${Date.now()}`,
      confirmationNumber: `VAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
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
    // In the future, this could return a real adapter based on environment
    bookingAdapter = new MockBookingAdapter();
  }
  return bookingAdapter;
}
