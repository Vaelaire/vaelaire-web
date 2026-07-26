export const siteConfig = {
  name: "Vaelaire",
  tagline: "Where Heritage Meets Horizon",
  description: "Curated hospitality experiences in Lagos, Portugal.",
  url: "https://stayatvaelaire.com",
  contact: {
    email: process.env.NEXT_PUBLIC_VAELAIRE_CONTACT_EMAIL || "hello@stayatvaelaire.com",
    reservations: process.env.NEXT_PUBLIC_VAELAIRE_RESERVATIONS_EMAIL || "reservations@stayatvaelaire.com",
    phone: "+351 282 XXX XXX",
  },
  social: {
    instagram: "https://instagram.com/vaelaire",
  },
  property: {
    slug: process.env.NEXT_PUBLIC_VAELAIRE_PROPERTY_SLUG || "lagos",
    name: "Vaelaire Lagos",
    location: "Lagos, Algarve, Portugal",
    address: {
      street: "Historic Center",
      city: "Lagos",
      region: "Algarve",
      country: "Portugal",
      postalCode: "8600",
    },
  },
  navigation: {
    main: [
      { label: "Rooms", href: "/rooms" },
      { label: "Dining", href: "/dining" },
      { label: "Experiences", href: "/experiences" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    footer: {
      explore: [
        { label: "Our Rooms", href: "/rooms" },
        { label: "Dining", href: "/dining" },
        { label: "Experiences", href: "/experiences" },
        { label: "About Vaelaire", href: "/about" },
      ],
      information: [
        { label: "Contact", href: "/contact" },
        { label: "Location", href: "/about#location" },
        { label: "FAQ", href: "/contact#faq" },
      ],
      legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
