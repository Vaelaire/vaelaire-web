// GraphQL types matching the backend schema

export interface Property {
  id: string;
  slug: string;
  name: string;
  currency: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
  checkInTime?: string;
  checkOutTime?: string;
  isLive: boolean;
}

export interface RoomCategoryGQL {
  id: string;
  propertyId: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  baseRate: number;
  maxOccupancy: number;
  bedCount?: number;
  bedType?: string;
  sizeSqm?: number;
  amenities: string[];
  imageUrls: string[];
  sortOrder: number;
  isActive: boolean;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  marketingOptIn: boolean;
}

export interface BookingRoom {
  id: string;
  categoryId: string;
  roomId?: string;
  ratePerNight: number;
  subtotal: number;
  category?: RoomCategoryGQL;
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "CANCELLED"
  | "NO_SHOW";

export type PaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "REFUNDED";

export interface Booking {
  id: string;
  confirmationNumber: string;
  propertyId: string;
  guestId: string;
  checkInDate: string;
  checkOutDate: string;
  adultsCount: number;
  childrenCount: number;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  amountPaid: number;
  specialRequests?: string;
  bookingSource?: string;
  guest?: Guest;
  property?: Property;
  rooms?: BookingRoom[];
  createdAt: string;
}

export interface AvailabilityResult {
  available: boolean;
  availableCount: number;
}

// Input types

export interface GuestInfoInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  marketingOptIn?: boolean;
}

export interface CreatePublicBookingInput {
  propertyId: string;
  categoryId: string;
  checkInDate: string;
  checkOutDate: string;
  adultsCount?: number;
  childrenCount?: number;
  guest: GuestInfoInput;
  specialRequests?: string;
}
