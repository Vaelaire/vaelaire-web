"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { currentLaunchConfig } from "@/config/launch-mode";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
    } else if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-midnight/80 z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-ivory z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-stone/20">
                <Logo variant="horizontal" width={120} height={24} linkToHome={false} />
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="p-2 -mr-2 text-charcoal hover:text-midnight transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-6" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {siteConfig.navigation.main.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-3 text-display-sm font-editorial text-charcoal hover:text-midnight transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-stone/20 space-y-4">
                <Button
                  href={currentLaunchConfig.primaryCTA.href}
                  variant="primary"
                  className="w-full"
                  onClick={onClose}
                >
                  {currentLaunchConfig.primaryCTA.label}
                </Button>
                <Button
                  href={currentLaunchConfig.secondaryCTA.href}
                  variant="secondary"
                  className="w-full"
                  onClick={onClose}
                >
                  {currentLaunchConfig.secondaryCTA.label}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
