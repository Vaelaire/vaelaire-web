"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ExperiencePillar } from "@/content/types";

interface PillarCardProps {
  pillar: ExperiencePillar;
  index?: number;
}

export function PillarCard({ pillar, index = 0 }: PillarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={pillar.media.src}
          alt={pillar.media.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-editorial text-display-sm text-ivory">
            {pillar.title}
          </h3>
          <p className="mt-2 text-body-sm text-ivory/80 line-clamp-3">
            {pillar.description}
          </p>

          {pillar.link && (
            <Link
              href={pillar.link.href}
              className="mt-4 inline-flex items-center gap-2 text-ui-sm text-champagne hover:text-ivory transition-colors"
            >
              {pillar.link.label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
