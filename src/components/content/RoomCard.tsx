"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Maximize } from "lucide-react";
import { RoomCategory } from "@/content/types";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: RoomCategory;
  index?: number;
  variant?: "default" | "featured";
}

export function RoomCard({ room, index = 0, variant = "default" }: RoomCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group",
        isFeatured && "lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
      )}
    >
      {/* Image */}
      <Link
        href={`/rooms/${room.slug}`}
        className={cn(
          "block relative overflow-hidden aspect-[4/3]",
          isFeatured && "lg:aspect-[3/2]"
        )}
      >
        <div className="absolute inset-0 bg-midnight/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          src={room.media.featured.src}
          alt={room.media.featured.alt}
          fill
          sizes={isFeatured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className={cn("mt-6", isFeatured && "lg:mt-0")}>
        <h3 className="font-editorial text-display-sm text-charcoal group-hover:text-midnight transition-colors">
          <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
        </h3>

        <p className="mt-3 text-body-md text-stone line-clamp-3">
          {room.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-6 text-ui-sm text-stone">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            Up to {room.capacity.adults} guests
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            {room.size.value} {room.size.unit}
          </span>
        </div>

        {/* Price & Link */}
        <div className="mt-6 flex items-center justify-between">
          {room.priceFrom && (
            <p className="text-body-md text-charcoal">
              From{" "}
              <span className="font-editorial text-display-sm">
                €{room.priceFrom}
              </span>
              <span className="text-stone">/night</span>
            </p>
          )}

          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-2 text-ui-md text-midnight hover:text-champagne transition-colors"
          >
            View Room
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
