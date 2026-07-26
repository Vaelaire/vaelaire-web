import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface SEOParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: SEOParams): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || "/brand/Vaelaire_Logo_Primary.svg";

  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for the hotel
 */
export function generateHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.property.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.property.address.street,
      addressLocality: siteConfig.property.address.city,
      addressRegion: siteConfig.property.address.region,
      postalCode: siteConfig.property.address.postalCode,
      addressCountry: siteConfig.property.address.country,
    },
    sameAs: [siteConfig.social.instagram],
  };
}

/**
 * Generate JSON-LD structured data for a room
 */
export function generateRoomSchema(room: {
  name: string;
  description: string;
  priceFrom?: number;
  currency?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    url: `${siteConfig.url}/rooms/${room.slug}`,
    ...(room.priceFrom && {
      priceRange: `From €${room.priceFrom}`,
      offers: {
        "@type": "Offer",
        price: room.priceFrom,
        priceCurrency: room.currency || "EUR",
      },
    }),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
