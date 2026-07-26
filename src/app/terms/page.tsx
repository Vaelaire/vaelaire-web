import { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Vaelaire terms and conditions. Important information about reservations, cancellations, and policies.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-editorial text-display-lg lg:text-display-xl">
              Terms & Conditions
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
                Reservations
              </h2>
              <p className="text-body-md text-stone mb-6">
                All reservations are subject to availability and confirmation.
                A valid credit card is required to guarantee your booking.
                We reserve the right to cancel reservations that appear
                fraudulent or made in bad faith.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Check-in & Check-out
              </h2>
              <p className="text-body-md text-stone mb-4">
                Standard check-in time: 15:00<br />
                Standard check-out time: 11:00
              </p>
              <p className="text-body-md text-stone mb-6">
                Early check-in and late check-out are available upon request
                and subject to availability. Additional charges may apply.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Cancellation Policy
              </h2>
              <p className="text-body-md text-stone mb-4">
                Standard cancellation terms:
              </p>
              <ul className="list-disc pl-6 text-body-md text-stone space-y-2 mb-6">
                <li>Free cancellation up to 7 days before arrival</li>
                <li>Cancellation within 7 days: first night charged</li>
                <li>No-show: full stay charged</li>
              </ul>
              <p className="text-body-md text-stone mb-6">
                Special rates and promotional offers may have different
                cancellation policies. Please review the specific terms
                at the time of booking.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Payment
              </h2>
              <p className="text-body-md text-stone mb-6">
                We accept major credit cards (Visa, MasterCard, American Express)
                and bank transfers. A deposit may be required at the time of
                booking. The remaining balance is due upon check-out unless
                otherwise arranged.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Guest Conduct
              </h2>
              <p className="text-body-md text-stone mb-6">
                Guests are expected to conduct themselves in a manner respectful
                to other guests and staff. We reserve the right to refuse service
                or terminate a reservation without refund in cases of inappropriate
                behavior or violation of hotel policies.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Liability
              </h2>
              <p className="text-body-md text-stone mb-6">
                Vaelaire is not responsible for loss or damage to guest property
                unless stored in the hotel safe. We recommend guests use in-room
                safes for valuables and maintain appropriate travel insurance.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Force Majeure
              </h2>
              <p className="text-body-md text-stone mb-6">
                We shall not be liable for any failure or delay in performing
                our obligations due to circumstances beyond our reasonable
                control, including but not limited to natural disasters,
                war, pandemic, or government restrictions.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Governing Law
              </h2>
              <p className="text-body-md text-stone mb-6">
                These terms and conditions are governed by the laws of Portugal.
                Any disputes shall be subject to the exclusive jurisdiction
                of the Portuguese courts.
              </p>

              <h2 className="font-editorial text-display-sm text-charcoal mt-12 mb-4">
                Contact
              </h2>
              <p className="text-body-md text-stone mb-6">
                For questions regarding these terms, please contact us at
                hello@stayatvaelaire.com.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
