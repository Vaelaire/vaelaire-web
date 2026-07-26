"use client";

import { EditorialSection } from "@/components/content";
import { propertyContent } from "@/content";

export function IntroSection() {
  return (
    <EditorialSection
      eyebrow="Welcome"
      title={propertyContent.about.title}
      subtitle={propertyContent.about.intro}
    >
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        {propertyContent.about.story.map((paragraph, index) => (
          <p key={index} className="text-body-lg text-stone">
            {paragraph}
          </p>
        ))}
      </div>
    </EditorialSection>
  );
}
