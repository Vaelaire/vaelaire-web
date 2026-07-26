export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

export interface PropertyAddress {
  street: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PropertyContent {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  address: PropertyAddress;
  hero: {
    headline: string;
    subheadline: string;
    media: MediaAsset;
  };
  about: {
    title: string;
    intro: string;
    story: string[];
  };
}

export interface RoomCategory {
  slug: string;
  name: string;
  description: string;
  features: string[];
  priceFrom?: number;
  currency?: string;
  capacity: {
    adults: number;
    children?: number;
  };
  size: {
    value: number;
    unit: "sqm" | "sqft";
  };
  media: {
    featured: MediaAsset;
    gallery: MediaAsset[];
  };
  amenities: string[];
}

export interface DiningVenue {
  slug: string;
  name: string;
  type: "restaurant" | "bar" | "cafe" | "terrace";
  tagline: string;
  description: string;
  cuisine?: string;
  hours?: {
    days: string;
    time: string;
  }[];
  media: {
    featured: MediaAsset;
    gallery: MediaAsset[];
  };
}

export interface Experience {
  slug: string;
  title: string;
  category: "wellness" | "culture" | "adventure" | "culinary";
  tagline: string;
  description: string;
  duration?: string;
  price?: {
    amount: number;
    currency: string;
    per: string;
  };
  media: MediaAsset;
}

export interface ExperiencePillar {
  id: string;
  title: string;
  description: string;
  icon?: string;
  media: MediaAsset;
  link?: {
    label: string;
    href: string;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    title?: string;
    location?: string;
  };
  source?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SiteContent {
  property: PropertyContent;
  rooms: RoomCategory[];
  dining: DiningVenue[];
  experiences: Experience[];
  pillars: ExperiencePillar[];
  testimonials: Testimonial[];
  faq: FAQItem[];
}
