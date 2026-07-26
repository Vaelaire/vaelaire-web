import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Maximize, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { SectionEyebrow } from "@/components/content";
import { Button } from "@/components/ui";
import { roomCategories, getRoomBySlug } from "@/content";
import { currentLaunchConfig } from "@/config/launch-mode";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return roomCategories.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    return { title: "Room Not Found" };
  }

  return {
    title: room.name,
    description: room.description,
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Back link */}
        <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-ui-md text-stone hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Rooms
          </Link>
        </div>

        {/* Hero Image */}
        <section className="relative aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src={room.media.featured.src}
            alt={room.media.featured.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>

        {/* Room Details */}
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <SectionEyebrow className="mb-4">
                  {room.size.value} {room.size.unit}
                </SectionEyebrow>

                <h1 className="font-editorial text-display-lg text-charcoal">
                  {room.name}
                </h1>

                <div className="mt-4 flex items-center gap-6 text-body-md text-stone">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Up to {room.capacity.adults} adults
                    {room.capacity.children && ` + ${room.capacity.children} child`}
                  </span>
                  <span className="flex items-center gap-2">
                    <Maximize className="w-5 h-5" />
                    {room.size.value} {room.size.unit}
                  </span>
                </div>

                <p className="mt-8 text-body-lg text-stone">
                  {room.description}
                </p>

                {/* Features */}
                <div className="mt-12">
                  <h2 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-6">
                    Room Highlights
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {room.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-body-md text-charcoal"
                      >
                        <Check className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Amenities */}
                <div className="mt-12">
                  <h2 className="text-ui-lg font-functional uppercase tracking-wider text-charcoal mb-6">
                    Amenities
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {room.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="text-body-sm text-stone"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="mt-12 lg:mt-0">
                <div className="sticky top-24 bg-stone/10 p-6 lg:p-8">
                  {room.priceFrom && (
                    <div className="mb-6">
                      <p className="text-ui-sm text-stone">From</p>
                      <p className="font-editorial text-display-md text-charcoal">
                        €{room.priceFrom}
                        <span className="text-body-md text-stone font-functional">
                          /night
                        </span>
                      </p>
                    </div>
                  )}

                  <Button
                    href={currentLaunchConfig.primaryCTA.href}
                    className="w-full"
                    size="lg"
                  >
                    {currentLaunchConfig.primaryCTA.label}
                  </Button>

                  <Button
                    href="/contact"
                    variant="secondary"
                    className="w-full mt-3"
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {room.media.gallery.length > 0 && (
          <section className="py-section bg-stone/10">
            <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-editorial text-display-sm text-charcoal mb-8">
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {room.media.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
