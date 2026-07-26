"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { MobileNavigation } from "./MobileNavigation";
import { siteConfig } from "@/config/site";
import { currentLaunchConfig } from "@/config/launch-mode";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  transparent?: boolean;
}

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const showSolidBg = !transparent || isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          showSolidBg
            ? "bg-ivory/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Logo
              variant={showSolidBg ? "horizontal" : "white"}
              width={140}
              height={28}
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-ui-md font-functional transition-colors duration-200",
                    showSolidBg
                      ? "text-charcoal hover:text-midnight"
                      : "text-ivory hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                href={currentLaunchConfig.primaryCTA.href}
                variant={showSolidBg ? "primary" : "white"}
                size="sm"
              >
                {currentLaunchConfig.primaryCTA.label}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 -mr-2 transition-colors",
                showSolidBg ? "text-charcoal" : "text-ivory"
              )}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
