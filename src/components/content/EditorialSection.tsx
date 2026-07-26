"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "./SectionEyebrow";

interface EditorialSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "ivory";
  alignment?: "left" | "center";
  id?: string;
}

export function EditorialSection({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  variant = "default",
  alignment = "center",
  id,
}: EditorialSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bgClasses = {
    default: "bg-ivory",
    dark: "bg-midnight text-ivory",
    ivory: "bg-ivory",
  };

  const eyebrowVariant = variant === "dark" ? "default" : "default";

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "py-section",
        bgClasses[variant],
        className
      )}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            alignment === "center" && "text-center",
            alignment === "left" && "text-left"
          )}
        >
          {eyebrow && (
            <SectionEyebrow variant={eyebrowVariant} className="mb-4 block">
              {eyebrow}
            </SectionEyebrow>
          )}

          <h2
            className={cn(
              "font-editorial text-display-md lg:text-display-lg",
              variant === "dark" ? "text-ivory" : "text-charcoal",
              alignment === "center" && "max-w-3xl mx-auto"
            )}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={cn(
                "mt-6 text-body-lg",
                variant === "dark" ? "text-stone" : "text-stone",
                alignment === "center" && "max-w-2xl mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-12 lg:mt-16"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
