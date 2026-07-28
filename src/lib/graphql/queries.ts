import { gql } from "urql";

export const GET_DEFAULT_PROPERTY = gql`
  query GetDefaultProperty {
    defaultProperty {
      id
      slug
      name
      currency
      description
      address
      city
      country
      timezone
      isLive
    }
  }
`;

export const GET_PROPERTY_BY_SLUG = gql`
  query GetPropertyBySlug($slug: String!) {
    propertyBySlug(slug: $slug) {
      id
      slug
      name
      currency
      description
      address
      city
      country
      timezone
      isLive
    }
  }
`;

export const GET_ROOM_CATEGORIES = gql`
  query GetRoomCategories($propertyId: ID!) {
    roomCategories(propertyId: $propertyId) {
      id
      propertyId
      name
      slug
      description
      shortDescription
      baseRate
      maxOccupancy
      bedCount
      bedType
      sizeSqm
      amenities
      imageUrls
      sortOrder
      isActive
    }
  }
`;

export const GET_ROOM_CATEGORY = gql`
  query GetRoomCategory($id: ID!) {
    roomCategory(id: $id) {
      id
      propertyId
      name
      slug
      description
      shortDescription
      baseRate
      maxOccupancy
      bedCount
      bedType
      sizeSqm
      amenities
      imageUrls
      sortOrder
      isActive
    }
  }
`;

export const GET_ROOM_CATEGORY_BY_SLUG = gql`
  query GetRoomCategoryBySlug($slug: String!) {
    roomCategoryBySlug(slug: $slug) {
      id
      propertyId
      name
      slug
      description
      shortDescription
      baseRate
      maxOccupancy
      bedCount
      bedType
      sizeSqm
      amenities
      imageUrls
      sortOrder
      isActive
    }
  }
`;

export const CHECK_ROOM_AVAILABILITY = gql`
  query CheckRoomAvailability(
    $propertyId: ID!
    $categoryId: ID!
    $checkIn: DateTime!
    $checkOut: DateTime!
  ) {
    checkRoomAvailability(
      propertyId: $propertyId
      categoryId: $categoryId
      checkIn: $checkIn
      checkOut: $checkOut
    ) {
      available
      availableCount
    }
  }
`;

export const GET_BOOKING_BY_CONFIRMATION = gql`
  query GetBookingByConfirmation($confirmationNumber: String!) {
    bookingByConfirmation(confirmationNumber: $confirmationNumber) {
      id
      confirmationNumber
      propertyId
      checkInDate
      checkOutDate
      adultsCount
      childrenCount
      status
      totalAmount
      currency
      paymentStatus
      amountPaid
      specialRequests
      bookingSource
      createdAt
      guest {
        id
        firstName
        lastName
        email
        phone
      }
      property {
        id
        name
        slug
        address
        city
        country
      }
      rooms {
        id
        categoryId
        ratePerNight
        subtotal
        category {
          id
          name
          slug
          description
          imageUrls
        }
      }
    }
  }
`;
