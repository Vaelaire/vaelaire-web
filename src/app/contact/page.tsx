import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { SectionEyebrow } from "@/components/content";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vaelaire Lagos. We're here to help with reservations, special requests, or any questions about your stay.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-ui-sm font-functional uppercase tracking-widest text-champagne">
              Get in Touch
            </span>
            <h1 className="mt-4 font-editorial text-display-lg lg:text-display-xl">
              Contact Us
            </h1>
            <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
              Whether you have a question about reservations, a special request,
              or simply want to learn more about Vaelaire, we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-section bg-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Form */}
              <div>
                <SectionEyebrow className="mb-4">Send a Message</SectionEyebrow>
                <h2 className="font-editorial text-display-sm text-charcoal mb-8">
                  How Can We Help?
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="mt-12 lg:mt-0">
                <SectionEyebrow className="mb-4">Contact Details</SectionEyebrow>
                <h2 className="font-editorial text-display-sm text-charcoal mb-8">
                  Reach Out Directly
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-champagne flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-ui-sm font-functional uppercase tracking-wider text-charcoal">
                        Email
                      </p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-body-md text-stone hover:text-charcoal transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <p className="mt-2 text-ui-sm text-stone">
                        For reservations:
                      </p>
                      <a
                        href={`mailto:${siteConfig.contact.reservations}`}
                        className="text-body-md text-stone hover:text-charcoal transition-colors"
                      >
                        {siteConfig.contact.reservations}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-champagne flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-ui-sm font-functional uppercase tracking-wider text-charcoal">
                        Phone
                      </p>
                      <p className="text-body-md text-stone">
                        {siteConfig.contact.phone}
                      </p>
                      <p className="mt-1 text-ui-sm text-stone">
                        Available daily, 9:00 - 21:00 WET
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-champagne flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-ui-sm font-functional uppercase tracking-wider text-charcoal">
                        Address
                      </p>
                      <p className="text-body-md text-stone">
                        {siteConfig.property.address.street}
                      </p>
                      <p className="text-body-md text-stone">
                        {siteConfig.property.address.postalCode}{" "}
                        {siteConfig.property.address.city}
                      </p>
                      <p className="text-body-md text-stone">
                        {siteConfig.property.address.region},{" "}
                        {siteConfig.property.address.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Preview */}
                <div id="faq" className="mt-12 pt-12 border-t border-stone/20">
                  <h3 className="font-editorial text-display-sm text-charcoal mb-6">
                    Frequently Asked
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <p className="text-body-md text-charcoal font-medium">
                        What are your check-in and check-out times?
                      </p>
                      <p className="mt-1 text-body-md text-stone">
                        Check-in is from 15:00 and check-out is by 11:00.
                        Early check-in and late check-out may be available
                        upon request.
                      </p>
                    </div>
                    <div>
                      <p className="text-body-md text-charcoal font-medium">
                        Do you offer airport transfers?
                      </p>
                      <p className="mt-1 text-body-md text-stone">
                        Yes, private transfers from Faro Airport can be
                        arranged. Please contact us in advance to book.
                      </p>
                    </div>
                    <div>
                      <p className="text-body-md text-charcoal font-medium">
                        Is parking available?
                      </p>
                      <p className="mt-1 text-body-md text-stone">
                        Valet parking is available for guests.
                        Please inform us if you&apos;ll be arriving by car.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
