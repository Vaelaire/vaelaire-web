"use client";

import { EditorialSection } from "@/components/content";
import { RoomCard } from "@/components/content/RoomCard";
import { Button } from "@/components/ui";
import { roomCategories } from "@/content";

export function RoomsSection() {
  return (
    <EditorialSection
      eyebrow="Accommodations"
      title="Thoughtfully Crafted Spaces"
      subtitle="Each room is a sanctuary where Portuguese heritage meets contemporary comfort. Choose the retreat that speaks to you."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {roomCategories.map((room, index) => (
          <RoomCard key={room.slug} room={room} index={index} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/rooms" variant="secondary">
          View All Rooms
        </Button>
      </div>
    </EditorialSection>
  );
}
