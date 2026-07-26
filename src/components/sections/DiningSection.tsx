"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/content";
import { Button } from "@/components/ui";
import { diningVenues } from "@/content";

export function DiningSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainVenue = diningVenues[0];

  return (
    <section ref={ref} className="py-section bg-ivory">
      <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={mainVenue.media.featured.src}
              alt={mainVenue.media.featured.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 lg:mt-0"
          >
            <SectionEyebrow className="mb-4">Dining</SectionEyebrow>

            <h2 className="font-editorial text-display-md lg:text-display-lg text-charcoal">
              {mainVenue.name}
            </h2>

            <p className="mt-2 text-body-lg text-champagne font-editorial italic">
              {mainVenue.tagline}
            </p>

            <p className="mt-6 text-body-lg text-stone">
              {mainVenue.description}
            </p>

            {mainVenue.hours && (
              <div className="mt-6 text-body-md text-stone">
                {mainVenue.hours.map((hours, index) => (
                  <p key={index}>
                    <span className="text-charcoal">{hours.days}:</span>{" "}
                    {hours.time}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/dining">
                Explore Dining
              </Button>
              {diningVenues.length > 1 && (
                <Link
                  href="/dining#terraco"
                  className="inline-flex items-center gap-2 text-ui-md text-midnight hover:text-champagne transition-colors"
                >
                  Discover {diningVenues[1].name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
