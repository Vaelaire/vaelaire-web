import { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Vaelaire privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-editorial text-display-lg lg:text-display-xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-body-lg text-stone">
              Last updated: January 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-section bg-ivory">
          <div className="max-w-content-narrow mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-stone max-w-none">
              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Introduction
              </h2>
              <p className="text-body-md text-stone mb-6">
                Vaelaire (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                and safeguard your personal information when you visit our website
                or use our services.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Information We Collect
              </h2>
              <p className="text-body-md text-stone mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-body-md text-stone space-y-2 mb-6">
                <li>Name, email address, and phone number</li>
                <li>Billing and payment information</li>
                <li>Reservation details and preferences</li>
                <li>Communications you send to us</li>
              </ul>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-body-md text-stone mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-body-md text-stone space-y-2 mb-6">
                <li>Process and manage your reservations</li>
                <li>Communicate with you about your stay</li>
                <li>Send promotional materials (with your consent)</li>
                <li>Improve our services and website</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Data Security
              </h2>
              <p className="text-body-md text-stone mb-6">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Your Rights
              </h2>
              <p className="text-body-md text-stone mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-body-md text-stone space-y-2 mb-6">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Cookies
              </h2>
              <p className="text-body-md text-stone mb-6">
                We use cookies and similar technologies to enhance your experience
                on our website. You can manage your cookie preferences through
                your browser settings.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Contact Us
              </h2>
              <p className="text-body-md text-stone mb-6">
                If you have questions about this Privacy Policy or our data
                practices, please contact us at hello@stayatvaelaire.com.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
