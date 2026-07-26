"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { Logo } from "@/components/brand";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-ivory" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo variant="white" width={160} height={64} linkToHome={false} />
            <p className="mt-6 text-body-sm text-stone leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-champagne transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-ui-sm font-functional uppercase tracking-wider text-champagne mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {siteConfig.navigation.footer.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-stone hover:text-ivory transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="text-ui-sm font-functional uppercase tracking-wider text-champagne mb-6">
              Information
            </h3>
            <ul className="space-y-3">
              {siteConfig.navigation.footer.information.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-stone hover:text-ivory transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-body-sm text-stone hover:text-ivory transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-start gap-2 text-body-sm text-stone">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  {siteConfig.property.address.city},{" "}
                  {siteConfig.property.address.region},{" "}
                  {siteConfig.property.address.country}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-ui-sm font-functional uppercase tracking-wider text-champagne mb-6">
              Stay Connected
            </h3>
            <p className="text-body-sm text-stone mb-4">
              Receive news, exclusive offers, and travel inspiration.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone/20">
        <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-ui-sm text-stone">
              &copy; {currentYear} Vaelaire. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex items-center gap-6">
                {siteConfig.navigation.footer.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ui-sm text-stone hover:text-ivory transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
