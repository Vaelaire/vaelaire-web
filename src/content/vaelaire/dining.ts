import { DiningVenue } from "../types";

export const diningVenues: DiningVenue[] = [
  {
    slug: "mesa",
    name: "Mesa",
    type: "restaurant",
    tagline: "Rooted in Tradition, Refined by Curiosity",
    description:
      "Our signature restaurant celebrates the Algarve's rich culinary heritage through a contemporary lens. Seasonal menus showcase the finest local produce—fresh catch from Lagos's fishing boats, organic vegetables from nearby farms, and traditional recipes reimagined with modern technique.",
    cuisine: "Contemporary Portuguese",
    hours: [
      { days: "Daily", time: "7:30 AM - 10:30 AM" },
      { days: "Wednesday - Sunday", time: "7:00 PM - 10:00 PM" },
    ],
    media: {
      featured: {
        src: "/images/dining/mesa-interior.jpg",
        alt: "Mesa restaurant interior with warm ambient lighting",
        width: 1200,
        height: 800,
      },
      gallery: [
        {
          src: "/images/dining/mesa-dish.jpg",
          alt: "Signature dish at Mesa featuring fresh local seafood",
          width: 1200,
          height: 800,
        },
        {
          src: "/images/dining/mesa-courtyard.jpg",
          alt: "Mesa courtyard dining during golden hour",
          width: 1200,
          height: 800,
        },
      ],
    },
  },
  {
    slug: "terraço",
    name: "Terraço",
    type: "terrace",
    tagline: "Elevated Moments",
    description:
      "Perched above the rooftops of historic Lagos, Terraço offers panoramic views from the Atlantic to the Serra de Monchique. An ideal setting for sunset cocktails, light plates, and unhurried conversation.",
    hours: [
      { days: "Daily", time: "4:00 PM - 11:00 PM" },
    ],
    media: {
      featured: {
        src: "/images/dining/terraco-sunset.jpg",
        alt: "Terraço rooftop bar at sunset with ocean views",
        width: 1200,
        height: 800,
      },
      gallery: [
        {
          src: "/images/dining/terraco-cocktails.jpg",
          alt: "Signature cocktails at Terraço",
          width: 1200,
          height: 800,
        },
      ],
    },
  },
];

export function getDiningBySlug(slug: string): DiningVenue | undefined {
  return diningVenues.find((venue) => venue.slug === slug);
}
