"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionEyebrow } from "@/components/content";
import { InterestForm } from "@/components/booking";
import { isPrelaunch } from "@/config/launch-mode";

export function NewsletterSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="opening-list"
      className="py-section bg-midnight"
    >
      <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow className="mb-4">
            {isPrelaunch ? "Opening Soon" : "Stay Connected"}
          </SectionEyebrow>

          <h2 className="font-editorial text-display-md lg:text-display-lg text-ivory">
            {isPrelaunch
              ? "Be Among the First"
              : "Join Our Journey"}
          </h2>

          <p className="mt-6 text-body-lg text-stone max-w-xl mx-auto">
            {isPrelaunch
              ? "Join our opening list for priority access to reservations and exclusive pre-opening offers."
              : "Receive curated travel inspiration, exclusive offers, and updates from Vaelaire."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-lg mx-auto"
        >
          <InterestForm variant="standalone" />
        </motion.div>
      </div>
    </section>
  );
}
