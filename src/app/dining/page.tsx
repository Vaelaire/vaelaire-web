import { Metadata } from "next";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { SectionEyebrow } from "@/components/content";
import { diningVenues } from "@/content";

export const metadata: Metadata = {
  title: "Dining",
  description: "Experience the flavors of the Algarve at Vaelaire. From contemporary Portuguese cuisine at Mesa to sunset cocktails on Terraço.",
};

export default function DiningPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-ui-sm font-functional uppercase tracking-widest text-champagne">
              Culinary
            </span>
            <h1 className="mt-4 font-editorial text-display-lg lg:text-display-xl">
              Dining at Vaelaire
            </h1>
            <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
              The Algarve&apos;s culinary heritage meets contemporary craft.
              Each meal is an exploration of local flavors, seasonal ingredients,
              and the simple pleasure of gathering around a table.
            </p>
          </div>
        </section>

        {/* Venues */}
        {diningVenues.map((venue, index) => (
          <section
            key={venue.slug}
            id={venue.slug}
            className={`py-section ${index % 2 === 0 ? "bg-ivory" : "bg-stone/10"}`}
          >
            <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}>
                {/* Image */}
                <div className={`relative aspect-[4/5] overflow-hidden ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}>
                  <Image
                    src={venue.media.featured.src}
                    alt={venue.media.featured.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="mt-8 lg:mt-0">
                  <SectionEyebrow className="mb-4">
                    {venue.type.charAt(0).toUpperCase() + venue.type.slice(1)}
                  </SectionEyebrow>

                  <h2 className="font-editorial text-display-md lg:text-display-lg text-charcoal">
                    {venue.name}
                  </h2>

                  <p className="mt-2 text-body-lg text-champagne font-editorial italic">
                    {venue.tagline}
                  </p>

                  <p className="mt-6 text-body-lg text-stone">
                    {venue.description}
                  </p>

                  {venue.cuisine && (
                    <p className="mt-4 text-body-md text-charcoal">
                      <span className="text-stone">Cuisine:</span> {venue.cuisine}
                    </p>
                  )}

                  {venue.hours && (
                    <div className="mt-6 space-y-2">
                      <p className="text-ui-sm font-functional uppercase tracking-wider text-charcoal">
                        Hours
                      </p>
                      {venue.hours.map((hours, idx) => (
                        <p key={idx} className="text-body-md text-stone">
                          <span className="text-charcoal">{hours.days}:</span>{" "}
                          {hours.time}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Philosophy */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-editorial text-display-md text-ivory">
              Our Approach
            </h2>
            <p className="mt-6 text-body-lg text-stone">
              We believe the best meals begin with conversation—with fishermen
              at the Lagos marina, farmers in the Monchique hills, and the
              generations who have shaped these recipes. Our kitchens honor
              their craft while adding our own perspective.
            </p>
            <p className="mt-4 text-body-lg text-stone">
              Every menu changes with the seasons. Every ingredient has a story.
              Every meal is an invitation to slow down.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
