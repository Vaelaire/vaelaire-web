"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui";
import { Logo } from "@/components/brand";
import { currentLaunchConfig } from "@/config/launch-mode";
import { propertyContent } from "@/content";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-midnight"
      >
        {/* Placeholder gradient - replace with actual hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-charcoal to-midnight" />
        <div className="absolute inset-0 bg-[url('/images/hero/lagos-exterior.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-midnight/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Logo variant="white" width={200} height={80} linkToHome={false} className="mx-auto mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-editorial text-display-lg lg:text-display-xl text-ivory"
        >
          {propertyContent.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-body-lg lg:text-xl text-ivory/80 max-w-2xl mx-auto"
        >
          {propertyContent.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            href={currentLaunchConfig.primaryCTA.href}
            variant="champagne"
            size="lg"
          >
            {currentLaunchConfig.primaryCTA.label}
          </Button>
          <Button
            href={currentLaunchConfig.secondaryCTA.href}
            variant="white"
            size="lg"
          >
            {currentLaunchConfig.secondaryCTA.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-ivory/50 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-ivory/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
