import React from "react";
import ResourceSection from "../../components/common/ResourceSection"; // Resource section
import CallToAction from "../../components/common/CallToAction"; // Optional footer call-to-action

export default function ResourcesPage() {
  return (
    <div>
      {/* Resource Section */}
      <ResourceSection />

      {/* Optional Call to Action Section */}
      <CallToAction />
    </div>
  );
}
