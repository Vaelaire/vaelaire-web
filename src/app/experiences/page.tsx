import { Metadata } from "next";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { SectionEyebrow } from "@/components/content";
import { Button } from "@/components/ui";
import { experiences, experiencePillars } from "@/content";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Curated adventures and moments of discovery in Lagos and the Algarve. From coastal kayaking to wine tastings and wellness rituals.",
};

export default function ExperiencesPage() {
  const categories = [
    { key: "adventure", label: "Adventure" },
    { key: "culinary", label: "Culinary" },
    { key: "wellness", label: "Wellness" },
    { key: "culture", label: "Culture" },
  ] as const;

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-ui-sm font-functional uppercase tracking-widest text-champagne">
              Discover
            </span>
            <h1 className="mt-4 font-editorial text-display-lg lg:text-display-xl">
              Experiences
            </h1>
            <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
              The Algarve reveals itself in many ways—through its dramatic coastline,
              its culinary traditions, its quiet moments of beauty. We&apos;ve curated
              experiences that invite deeper connection with this remarkable region.
            </p>
          </div>
        </section>

        {/* Pillars Overview */}
        <section className="py-section bg-ivory">
          <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {experiencePillars.map((pillar) => (
                <div key={pillar.id} className="text-center">
                  <div className="relative aspect-square w-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={pillar.media.src}
                      alt={pillar.media.alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-editorial text-display-sm text-charcoal">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-stone">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Categories */}
        {categories.map((category) => {
          const categoryExperiences = experiences.filter(
            (exp) => exp.category === category.key
          );

          if (categoryExperiences.length === 0) return null;

          return (
            <section
              key={category.key}
              id={category.key}
              className="py-section bg-stone/10"
            >
              <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
                <SectionEyebrow className="mb-4">{category.label}</SectionEyebrow>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {categoryExperiences.map((experience) => (
                    <article
                      key={experience.slug}
                      className="group bg-ivory overflow-hidden"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={experience.media.src}
                          alt={experience.media.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-editorial text-display-sm text-charcoal">
                          {experience.title}
                        </h3>
                        <p className="mt-1 text-body-sm text-champagne italic">
                          {experience.tagline}
                        </p>
                        <p className="mt-4 text-body-md text-stone">
                          {experience.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-ui-sm text-stone">
                            {experience.duration && (
                              <span>{experience.duration}</span>
                            )}
                            {experience.price && (
                              <span className="ml-4">
                                €{experience.price.amount}/{experience.price.per}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="py-section bg-champagne/20">
          <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-editorial text-display-md text-charcoal">
              Something Special in Mind?
            </h2>
            <p className="mt-6 text-body-lg text-stone">
              Our team can arrange bespoke experiences tailored to your interests.
              From private boat charters to exclusive winery visits, we&apos;re here
              to make your stay extraordinary.
            </p>
            <div className="mt-8">
              <Button href="/contact">Get in Touch</Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
