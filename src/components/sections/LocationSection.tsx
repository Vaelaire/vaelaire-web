"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SectionEyebrow } from "@/components/content";
import { Button } from "@/components/ui";
import { propertyContent } from "@/content";

export function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { label: "Historic Old Town", distance: "Steps away" },
    { label: "Ponta da Piedade", distance: "5 min drive" },
    { label: "Lagos Marina", distance: "10 min walk" },
    { label: "Faro Airport", distance: "1 hour" },
  ];

  return (
    <section ref={ref} className="py-section bg-ivory">
      <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <SectionEyebrow className="mb-4">Location</SectionEyebrow>

            <h2 className="font-editorial text-display-md lg:text-display-lg text-charcoal">
              The Heart of Lagos
            </h2>

            <p className="mt-6 text-body-lg text-stone">
              Vaelaire sits within the ancient walls of Lagos&apos;s historic center,
              where cobblestone streets tell stories of maritime explorers and
              Mediterranean traditions. Step outside our doors to discover artisan
              shops, local restaurants, and the rhythm of authentic Portuguese life.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <MapPin className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-body-md text-charcoal">{item.label}</p>
                    <p className="text-ui-sm text-stone">{item.distance}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/about#location" variant="secondary">
                Getting Here
              </Button>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 lg:mt-0 relative aspect-square overflow-hidden bg-stone/10"
          >
            {/* Placeholder for map - replace with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-champagne mx-auto mb-4" />
                <p className="text-body-md text-charcoal">
                  {propertyContent.address.city},{" "}
                  {propertyContent.address.country}
                </p>
                <p className="mt-2 text-ui-sm text-stone">
                  Interactive map coming soon
                </p>
              </div>
            </div>
            {/* Could add actual image of location */}
            <Image
              src="/images/location/lagos-aerial.jpg"
              alt="Aerial view of Lagos historic center"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
