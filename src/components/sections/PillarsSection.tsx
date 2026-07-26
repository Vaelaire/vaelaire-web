"use client";

import { EditorialSection } from "@/components/content";
import { PillarCard } from "@/components/content/PillarCard";
import { experiencePillars } from "@/content";

export function PillarsSection() {
  return (
    <EditorialSection
      eyebrow="Experience"
      title="Your Story, Your Way"
      subtitle="At Vaelaire, every moment is an opportunity. How you spend your time is entirely yours."
      variant="dark"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {experiencePillars.map((pillar, index) => (
          <PillarCard key={pillar.id} pillar={pillar} index={index} />
        ))}
      </div>
    </EditorialSection>
  );
}
