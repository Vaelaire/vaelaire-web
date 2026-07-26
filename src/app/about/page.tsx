import { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { SectionEyebrow } from "@/components/content";
import { propertyContent } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Vaelaire—where Portuguese heritage meets contemporary hospitality in the historic heart of Lagos, Algarve.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-ui-sm font-functional uppercase tracking-widest text-champagne">
              Our Story
            </span>
            <h1 className="mt-4 font-editorial text-display-lg lg:text-display-xl">
              About Vaelaire
            </h1>
            <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
              {propertyContent.tagline}
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-section bg-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/about/building.jpg"
                  alt="Vaelaire Lagos exterior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-8 lg:mt-0">
                <SectionEyebrow className="mb-4">The Beginning</SectionEyebrow>

                <h2 className="font-editorial text-display-md text-charcoal">
                  {propertyContent.about.title}
                </h2>

                <p className="mt-6 text-body-lg text-stone">
                  {propertyContent.about.intro}
                </p>

                <div className="mt-6 space-y-4">
                  {propertyContent.about.story.map((paragraph, index) => (
                    <p key={index} className="text-body-lg text-stone">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-section bg-stone/10">
          <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionEyebrow className="mb-4">Our Philosophy</SectionEyebrow>

            <h2 className="font-editorial text-display-md text-charcoal">
              Hospitality as an Art
            </h2>

            <div className="mt-8 space-y-6 text-left">
              <p className="text-body-lg text-stone">
                We believe hospitality is about presence—being attuned to what
                each guest needs, whether that&apos;s a thoughtful recommendation
                or simply the space to be.
              </p>
              <p className="text-body-lg text-stone">
                Every detail at Vaelaire has been considered. From the linens
                on your bed to the artwork on the walls, from the ingredients
                in our kitchen to the experiences we curate. Not for the sake
                of luxury, but for the sake of meaning.
              </p>
              <p className="text-body-lg text-stone">
                This is hospitality that values substance over spectacle,
                connection over transaction, memory over moment.
              </p>
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="py-section bg-ivory">
          <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionEyebrow className="mb-4">Location</SectionEyebrow>

              <h2 className="font-editorial text-display-md text-charcoal">
                In the Heart of Lagos
              </h2>

              <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
                Lagos sits at the western edge of the Algarve, where the
                Atlantic meets one of Europe&apos;s most dramatic coastlines.
                Our location in the historic center places you at the
                intersection of centuries of maritime heritage and
                contemporary Portuguese culture.
              </p>
            </div>

            <div className="relative aspect-video bg-stone/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-champagne mx-auto mb-4" />
                <p className="text-body-md text-charcoal">
                  {propertyContent.address.street}
                </p>
                <p className="text-body-md text-charcoal">
                  {propertyContent.address.postalCode} {propertyContent.address.city}
                </p>
                <p className="text-body-md text-charcoal">
                  {propertyContent.address.region}, {propertyContent.address.country}
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-editorial text-display-sm text-charcoal mb-2">
                  By Air
                </h3>
                <p className="text-body-md text-stone">
                  Faro Airport (FAO) is approximately 1 hour by car.
                  Private transfers can be arranged.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-editorial text-display-sm text-charcoal mb-2">
                  By Car
                </h3>
                <p className="text-body-md text-stone">
                  From Lisbon: 3 hours via the A2 motorway.
                  Valet parking available.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-editorial text-display-sm text-charcoal mb-2">
                  By Train
                </h3>
                <p className="text-body-md text-stone">
                  Lagos station is a 15-minute walk. Direct trains
                  from Lisbon via the Algarve line.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
