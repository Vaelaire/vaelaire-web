import { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { EditorialSection, RoomCard } from "@/components/content";
import { roomCategories } from "@/content";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description: "Discover our thoughtfully designed accommodations at Vaelaire Lagos. From intimate Classic Rooms to expansive Signature Suites.",
};

export default function RoomsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-section bg-midnight text-ivory">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-ui-sm font-functional uppercase tracking-widest text-champagne">
              Accommodations
            </span>
            <h1 className="mt-4 font-editorial text-display-lg lg:text-display-xl">
              Rooms & Suites
            </h1>
            <p className="mt-6 text-body-lg text-stone max-w-2xl mx-auto">
              Each room at Vaelaire is a carefully composed retreat—where restored
              heritage details meet contemporary comfort and every window frames
              a piece of Lagos.
            </p>
          </div>
        </section>

        {/* Room Categories */}
        <EditorialSection
          title=""
          className="bg-ivory"
        >
          <div className="space-y-24">
            {roomCategories.map((room, index) => (
              <RoomCard
                key={room.slug}
                room={room}
                index={index}
                variant="featured"
              />
            ))}
          </div>
        </EditorialSection>

        {/* Amenities */}
        <section className="py-section bg-stone/10">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-editorial text-display-md text-charcoal text-center mb-12">
              In Every Room
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                "Premium Bed Linens",
                "Climate Control",
                "Complimentary Wi-Fi",
                "Daily Housekeeping",
                "In-Room Safe",
                "Mini Bar",
                "Artisan Toiletries",
                "Nespresso Machine",
              ].map((amenity) => (
                <div
                  key={amenity}
                  className="text-center py-4 border-b border-stone/20"
                >
                  <p className="text-body-md text-charcoal">{amenity}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
