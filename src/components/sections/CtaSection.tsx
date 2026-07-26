"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui";
import { currentLaunchConfig } from "@/config/launch-mode";

export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-section-lg bg-champagne/20"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-editorial text-display-md lg:text-display-lg text-charcoal">
            Your Story Begins Here
          </h2>

          <p className="mt-6 text-body-lg text-stone max-w-xl mx-auto">
            Whether for a romantic escape, a moment of solitude, or an adventure
            along the Algarve coast—we look forward to welcoming you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={currentLaunchConfig.primaryCTA.href}
              size="lg"
            >
              {currentLaunchConfig.primaryCTA.label}
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
