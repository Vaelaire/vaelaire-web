import { Experience, ExperiencePillar } from "../types";

export const experiencePillars: ExperiencePillar[] = [
  {
    id: "stay",
    title: "Stay",
    description:
      "Rest in thoughtfully designed spaces where heritage details meet modern comfort. Each room tells a story.",
    media: {
      src: "/images/pillars/stay.jpg",
      alt: "Luxurious room interior with restored architectural details",
      width: 600,
      height: 800,
    },
    link: {
      label: "Explore Rooms",
      href: "/rooms",
    },
  },
  {
    id: "taste",
    title: "Taste",
    description:
      "Discover the Algarve through its flavors—seasonal menus, local wines, and the simple pleasure of exceptional ingredients.",
    media: {
      src: "/images/pillars/taste.jpg",
      alt: "Beautifully plated Portuguese dish",
      width: 600,
      height: 800,
    },
    link: {
      label: "Discover Dining",
      href: "/dining",
    },
  },
  {
    id: "explore",
    title: "Explore",
    description:
      "Venture beyond our doors to discover hidden coves, historic villages, and the dramatic coastline that defines this region.",
    media: {
      src: "/images/pillars/explore.jpg",
      alt: "Dramatic Algarve coastline with golden cliffs",
      width: 600,
      height: 800,
    },
    link: {
      label: "Plan Adventures",
      href: "/experiences",
    },
  },
  {
    id: "restore",
    title: "Restore",
    description:
      "Find balance in moments of stillness—whether in our tranquil courtyard, through wellness rituals, or simply in quiet contemplation.",
    media: {
      src: "/images/pillars/restore.jpg",
      alt: "Peaceful courtyard with Mediterranean plants",
      width: 600,
      height: 800,
    },
    link: {
      label: "Wellness & Calm",
      href: "/experiences#wellness",
    },
  },
];

export const experiences: Experience[] = [
  {
    slug: "coastal-kayaking",
    title: "Ponta da Piedade by Kayak",
    category: "adventure",
    tagline: "Paddle through sea caves and grottoes",
    description:
      "Explore the iconic rock formations and hidden grottoes of Ponta da Piedade from the water. Our guided kayak excursions reveal caves and coves inaccessible by land, offering an intimate perspective on the Algarve's most dramatic coastline.",
    duration: "3 hours",
    price: {
      amount: 75,
      currency: "EUR",
      per: "person",
    },
    media: {
      src: "/images/experiences/kayaking.jpg",
      alt: "Kayakers exploring sea caves at Ponta da Piedade",
      width: 1200,
      height: 800,
    },
  },
  {
    slug: "wine-tasting",
    title: "Algarve Wine Discovery",
    category: "culinary",
    tagline: "Journey through local vineyards",
    description:
      "The Algarve's emerging wine scene offers delightful surprises. Visit family-run vineyards in the rolling hills behind Lagos, taste distinctive regional varietals, and learn how the unique terroir shapes each bottle.",
    duration: "Half day",
    price: {
      amount: 120,
      currency: "EUR",
      per: "person",
    },
    media: {
      src: "/images/experiences/wine.jpg",
      alt: "Wine tasting at an Algarve vineyard",
      width: 1200,
      height: 800,
    },
  },
  {
    slug: "sunrise-yoga",
    title: "Sunrise Yoga on the Rooftop",
    category: "wellness",
    tagline: "Begin the day in balance",
    description:
      "As the first light touches the Atlantic, join our instructor for a flowing yoga practice on Terraço. The combination of sea breeze, golden light, and mindful movement creates an unforgettable start to your day.",
    duration: "75 minutes",
    price: {
      amount: 35,
      currency: "EUR",
      per: "person",
    },
    media: {
      src: "/images/experiences/yoga.jpg",
      alt: "Morning yoga session on the rooftop terrace",
      width: 1200,
      height: 800,
    },
  },
  {
    slug: "historic-lagos-walk",
    title: "Secrets of Old Lagos",
    category: "culture",
    tagline: "Walk through centuries of history",
    description:
      "Lagos played a pivotal role in the Age of Discovery. This guided walk through the historic center reveals the stories behind the walls—from Moorish influences to maritime heritage—bringing the past vividly to life.",
    duration: "2 hours",
    price: {
      amount: 45,
      currency: "EUR",
      per: "person",
    },
    media: {
      src: "/images/experiences/historic-walk.jpg",
      alt: "Cobblestone streets of historic Lagos",
      width: 1200,
      height: 800,
    },
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((exp) => exp.slug === slug);
}

export function getExperiencesByCategory(category: Experience["category"]): Experience[] {
  return experiences.filter((exp) => exp.category === category);
}
