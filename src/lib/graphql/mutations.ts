import { gql } from "urql";

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($bookingId: ID!) {
    createPaymentIntent(bookingId: $bookingId) {
      clientSecret
      paymentIntentId
    }
  }
`;

export const CREATE_PUBLIC_BOOKING = gql`
  mutation CreatePublicBooking($input: CreatePublicBookingInput!) {
    createPublicBooking(input: $input) {
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
      specialRequests
      createdAt
      guest {
        id
        firstName
        lastName
        email
        phone
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
        }
      }
    }
  }
`;
