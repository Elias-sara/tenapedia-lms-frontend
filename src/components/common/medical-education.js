import React from "react";
import Link from "next/link";

const MedicalEducation = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a80b6] to-[#2196f3] text-white py-16 md:py-24">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Medical Education Hub
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            A comprehensive platform for medical students and professionals to
            enhance their learning through expert-curated resources and interactive content.
          </p>
          <Link
            href="/auth/register"
            className="bg-[#fb3467] text-white py-3 px-8 rounded-lg text-lg font-semibold 
            hover:bg-[#1a80b6] transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Join for Free
          </Link>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 
              bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
              Featured Courses in Medical Education
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our carefully designed courses that cover essential medical topics 
              with depth, clarity, and practical insights.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-2 
              border-t-4 border-[#1a80b6] group">
              <h3 className="text-xl font-bold mb-4 text-[#1a80b6] group-hover:text-[#fb3467] transition-colors">
                Anatomy Basics
              </h3>
              <p className="text-gray-700 mb-6">
                Learn the fundamentals of human anatomy with our engaging video
                lessons and interactive quizzes.
              </p>
              <Link
                href="/courses/anatomy"
                className="flex items-center text-[#1a80b6] hover:text-[#fb3467] 
                  font-semibold group-hover:translate-x-1 transition-all"
              >
                Start Anatomy Course
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-2 
              border-t-4 border-[#fb3467] group">
              <h3 className="text-xl font-bold mb-4 text-[#fb3467] group-hover:text-[#1a80b6] transition-colors">
                Pharmacology 101
              </h3>
              <p className="text-gray-700 mb-6">
                Dive deep into pharmacology and understand the mechanisms of
                different drugs with expert-led modules.
              </p>
              <Link
                href="/courses/pharmacology"
                className="flex items-center text-[#fb3467] hover:text-[#1a80b6] 
                  font-semibold group-hover:translate-x-1 transition-all"
              >
                Start Pharmacology Course
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-2 
              border-t-4 border-[#2ecc71] group">
              <h3 className="text-xl font-bold mb-4 text-[#2ecc71] group-hover:text-[#1a80b6] transition-colors">
                Pathophysiology
              </h3>
              <p className="text-gray-700 mb-6">
                Understand the underlying mechanisms of diseases with our
                comprehensive and clinically-focused pathophysiology course.
              </p>
              <Link
                href="/courses/pathophysiology"
                className="flex items-center text-[#2ecc71] hover:text-[#1a80b6] 
                  font-semibold group-hover:translate-x-1 transition-all"
              >
                Start Pathophysiology Course
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Ensure the default export
export default MedicalEducation;
