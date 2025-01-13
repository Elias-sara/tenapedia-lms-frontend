'use client';

import React, { Suspense } from "react";
import dynamic from 'next/dynamic';

// Dynamically import components with advanced loading and error handling
const HeroSection = dynamic(() => import("../components/common/HeroSection").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading content...
    </div>
  ),
  ssr: false
});

const CallToAction = dynamic(() => import("../components/common/CallToAction").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading call to action...
    </div>
  ),
  ssr: false
});

const ContentSection = dynamic(() => import("../components/common/ContentSection").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading content...
    </div>
  ),
  ssr: false
});

const Testimonials = dynamic(() => import("../components/common/Testimonials").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading testimonials...
    </div>
  ),
  ssr: false
});

const FeaturesSection = dynamic(() => import("../components/common/FeaturesSection").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading features...
    </div>
  ),
  ssr: false
});

const ReinforceConceptsSection = dynamic(() => import("../components/common/ReinforceConceptsSection").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading reinforcement...
    </div>
  ),
  ssr: false
});

const CourseContentSection = dynamic(() => import("../components/common/CourseContentSection").catch(() => () => null), { 
  loading: () => (
    <div className="h-96 flex items-center justify-center text-primary-500">
      Loading course content...
    </div>
  ),
  ssr: false
});

const Hero = dynamic(() => import("../components/common/Hero").catch(() => () => null), { 
  loading: () => (
    <div className="h-screen flex items-center justify-center text-primary-500">
      Loading hero...
    </div>
  ),
  ssr: false
});

export default function Home() {
  const sections = [
    { Component: Hero, id: "hero-section", title: "Learning Overview" },
    { Component: HeroSection, id: "hero-details-section", title: "Course Overview" },
    { Component: ContentSection, id: "content-section", title: "Course Content" },
    { Component: Testimonials, id: "testimonials-section", title: "Student Success" },
    { Component: FeaturesSection, id: "features-section", title: "Key Features" },
    { Component: ReinforceConceptsSection, id: "reinforce-section", title: "Concept Reinforcement" },
    { Component: CourseContentSection, id: "course-content-section", title: "Detailed Curriculum" },
    { Component: CallToAction, id: "cta-section", title: "Get Started" }
  ];

  return (
    <div className="bg-white min-h-screen scroll-smooth antialiased">
      <a 
        href="#main-content" 
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-white focus:text-primary-600"
      >
        Skip to main content
      </a>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map(({ Component, id, title }, index) => (
          <section 
            key={id}
            id={id}
            aria-labelledby={`${id}-title`}
            className={`w-full min-h-screen flex items-center justify-center relative ${index === 0 ? 'pt-24 md:pt-32 lg:pt-40' : 'py-8'} scroll-mt-16 bg-white`}
          >
            <div className="w-full px-4 relative z-10 max-w-7xl mx-auto">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full text-primary-500">
                  Loading {title}...
                </div>
              }>
                <Component />
              </Suspense>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
