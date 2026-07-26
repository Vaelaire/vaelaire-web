import { PropertyContent } from "../types";

export const propertyContent: PropertyContent = {
  slug: "lagos",
  name: "Vaelaire Lagos",
  tagline: "Where Heritage Meets Horizon",
  description:
    "Nestled in the historic heart of Lagos, Vaelaire offers an intimate retreat where centuries of Portuguese heritage converge with contemporary luxury. Our thoughtfully restored building embraces the Algarve's golden light while providing a sanctuary of calm sophistication.",
  address: {
    street: "Historic Center",
    city: "Lagos",
    region: "Algarve",
    country: "Portugal",
    postalCode: "8600",
    coordinates: {
      lat: 37.1028,
      lng: -8.6730,
    },
  },
  hero: {
    headline: "Where Heritage Meets Horizon",
    subheadline:
      "An intimate retreat in the heart of historic Lagos, where centuries of Portuguese tradition meet contemporary elegance.",
    media: {
      src: "/images/hero/lagos-exterior.jpg",
      alt: "Vaelaire Lagos exterior at golden hour with traditional Portuguese architecture",
      width: 1920,
      height: 1080,
    },
  },
  about: {
    title: "A Story Written in Stone",
    intro:
      "In the winding streets of Lagos, where the Algarve's golden cliffs meet the Atlantic, we discovered a building with stories in its walls.",
    story: [
      "What began as a passion project has become a living testament to the art of hospitality—a place where every detail has been considered, every moment crafted with intention.",
      "Our approach is simple: authentic experiences, genuine warmth, and the kind of thoughtful luxury that feels personal rather than performative.",
      "Vaelaire is not just where you stay. It's how you remember.",
    ],
  },
};
