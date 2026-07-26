import { RoomCategory } from "../types";

export const roomCategories: RoomCategory[] = [
  {
    slug: "classic",
    name: "Classic Room",
    description:
      "Intimate retreats that capture the essence of Portuguese elegance. Each Classic Room features restored architectural details, curated artwork, and modern comforts wrapped in warm, natural materials.",
    features: [
      "Queen-sized bed with premium linens",
      "Restored period details",
      "Modern rainfall shower",
      "Curated local artwork",
    ],
    priceFrom: 280,
    currency: "EUR",
    capacity: {
      adults: 2,
    },
    size: {
      value: 22,
      unit: "sqm",
    },
    media: {
      featured: {
        src: "/images/rooms/classic-room.jpg",
        alt: "Classic Room with restored wooden beams and contemporary furnishings",
        width: 1200,
        height: 800,
      },
      gallery: [
        {
          src: "/images/rooms/classic-room-bed.jpg",
          alt: "Classic Room bed detail with premium linens",
          width: 1200,
          height: 800,
        },
        {
          src: "/images/rooms/classic-room-bath.jpg",
          alt: "Classic Room bathroom with modern fixtures",
          width: 1200,
          height: 800,
        },
      ],
    },
    amenities: [
      "Air conditioning",
      "Complimentary Wi-Fi",
      "Mini bar",
      "In-room safe",
      "Daily housekeeping",
      "Premium toiletries",
    ],
  },
  {
    slug: "superior",
    name: "Superior Room",
    description:
      "Generously proportioned spaces offering expanded comfort and enhanced amenities. Superior Rooms feature seating areas and select views of Lagos's historic streets or our tranquil courtyard.",
    features: [
      "King-sized bed with premium linens",
      "Seating area with armchair",
      "Historic or courtyard views",
      "Expanded bathroom with soaking tub",
    ],
    priceFrom: 380,
    currency: "EUR",
    capacity: {
      adults: 2,
    },
    size: {
      value: 30,
      unit: "sqm",
    },
    media: {
      featured: {
        src: "/images/rooms/superior-room.jpg",
        alt: "Superior Room with seating area and historic views",
        width: 1200,
        height: 800,
      },
      gallery: [
        {
          src: "/images/rooms/superior-room-view.jpg",
          alt: "Superior Room view of historic Lagos streets",
          width: 1200,
          height: 800,
        },
        {
          src: "/images/rooms/superior-room-bath.jpg",
          alt: "Superior Room bathroom with freestanding tub",
          width: 1200,
          height: 800,
        },
      ],
    },
    amenities: [
      "Air conditioning",
      "Complimentary Wi-Fi",
      "Mini bar",
      "In-room safe",
      "Daily housekeeping",
      "Premium toiletries",
      "Nespresso machine",
      "Bathrobe and slippers",
    ],
  },
  {
    slug: "signature-suite",
    name: "Signature Suite",
    description:
      "Our most distinguished accommodation, offering the pinnacle of Vaelaire luxury. Each Signature Suite is a private sanctuary with separate living spaces, premium appointments, and commanding views.",
    features: [
      "Separate living and sleeping areas",
      "King-sized bed with luxury linens",
      "Private terrace or balcony",
      "Dedicated concierge service",
    ],
    priceFrom: 580,
    currency: "EUR",
    capacity: {
      adults: 2,
      children: 1,
    },
    size: {
      value: 48,
      unit: "sqm",
    },
    media: {
      featured: {
        src: "/images/rooms/signature-suite.jpg",
        alt: "Signature Suite living area with panoramic views",
        width: 1200,
        height: 800,
      },
      gallery: [
        {
          src: "/images/rooms/signature-suite-bedroom.jpg",
          alt: "Signature Suite master bedroom",
          width: 1200,
          height: 800,
        },
        {
          src: "/images/rooms/signature-suite-terrace.jpg",
          alt: "Signature Suite private terrace overlooking Lagos",
          width: 1200,
          height: 800,
        },
        {
          src: "/images/rooms/signature-suite-bath.jpg",
          alt: "Signature Suite spa-inspired bathroom",
          width: 1200,
          height: 800,
        },
      ],
    },
    amenities: [
      "Air conditioning",
      "Complimentary Wi-Fi",
      "Premium mini bar",
      "In-room safe",
      "Twice-daily housekeeping",
      "Luxury toiletries",
      "Nespresso machine",
      "Bathrobe and slippers",
      "Private terrace",
      "Dedicated concierge",
      "Complimentary pressing service",
    ],
  },
];

export function getRoomBySlug(slug: string): RoomCategory | undefined {
  return roomCategories.find((room) => room.slug === slug);
}
