// pages/medical.js
import React from "react";
import Link from "next/link";
import { 
  FaBook, 
  FaFlask, 
  FaUserMd, 
  FaChevronRight, 
  FaClipboardList, 
  FaVideo 
} from "react-icons/fa";

const Medical = () => {
  const featuredResources = [
    {
      icon: FaBook,
      title: "Medical Articles",
      description: "Stay updated with the latest research, breakthrough studies, and medical news from around the globe.",
      link: "/articles",
      color: "text-[#1a80b6]",
      bgColor: "bg-[#1a80b6]/10"
    },
    {
      icon: FaFlask,
      title: "Medical Tools",
      description: "Access comprehensive medical calculators, diagnostic aids, and professional reference tools.",
      link: "/tools",
      color: "text-[#fb3467]",
      bgColor: "bg-[#fb3467]/10"
    },
    {
      icon: FaClipboardList,
      title: "Case Studies",
      description: "Explore detailed medical case studies that enhance clinical reasoning and problem-solving skills.",
      link: "/case-studies",
      color: "text-[#2ecc71]",
      bgColor: "bg-[#2ecc71]/10"
    }
  ];

  const learningPaths = [
    {
      title: "Clinical Skills",
      description: "Comprehensive modules covering essential clinical competencies.",
      icon: FaUserMd,
      color: "text-[#1a80b6]"
    },
    {
      title: "Research Methodology",
      description: "Advanced training in medical research design and analysis.",
      icon: FaBook,
      color: "text-[#fb3467]"
    },
    {
      title: "Medical Technology",
      description: "Cutting-edge insights into medical innovations and digital health.",
      icon: FaFlask,
      color: "text-[#2ecc71]"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a80b6] to-[#2196f3] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Comprehensive Medical Resources
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            Your gateway to advanced medical knowledge, cutting-edge research, 
            and professional development tools designed for healthcare professionals.
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

      {/* Featured Resources Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 
              bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
              Featured Medical Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover a curated collection of resources to support your medical 
              learning and professional growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <div 
                key={index} 
                className={`${resource.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-2 
                  flex flex-col group`}
              >
                <div className="flex items-center mb-4">
                  <resource.icon 
                    className={`text-4xl mb-3 ${resource.color} 
                      group-hover:scale-110 transition-transform`} 
                  />
                </div>
                <h3 className={`text-xl font-bold ${resource.color} mb-3`}>
                  {resource.title}
                </h3>
                <p className="text-gray-700 mb-4 flex-grow">
                  {resource.description}
                </p>
                <Link 
                  href={resource.link} 
                  className={`flex items-center text-base font-semibold ${resource.color} 
                    hover:underline group-hover:translate-x-1 transition-transform`}
                >
                  Explore More 
                  <FaChevronRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 
              bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
              Specialized Learning Paths
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tailored educational tracks to elevate your medical expertise 
              and professional capabilities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-xl p-6 text-center 
                  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <path.icon 
                  className={`mx-auto text-5xl mb-4 ${path.color} 
                    group-hover:scale-110 transition-transform`} 
                />
                <h3 className={`text-xl font-bold ${path.color} mb-3`}>
                  {path.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {path.description}
                </p>
                <Link
                  href={`/learning-paths/${path.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`inline-flex items-center ${path.color} 
                    hover:underline group-hover:translate-x-1 transition-transform`}
                >
                  Explore Path
                  <FaChevronRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-[#1a80b6] to-[#2196f3] text-white py-16 md:py-24">
        <div className="container mx-auto text-center max-w-4xl px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Take Your Medical Knowledge to the Next Level
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            Join thousands of medical professionals who are transforming their 
            careers with our comprehensive learning platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/register"
              className="bg-[#fb3467] text-white py-3 px-8 rounded-lg text-lg font-semibold 
              hover:bg-white hover:text-[#1a80b6] transition duration-300 transform hover:scale-105 shadow-md"
            >
              Get Started
            </Link>
            <Link
              href="/courses"
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg 
              text-lg font-semibold hover:bg-white hover:text-[#1a80b6] 
              transition duration-300 transform hover:scale-105"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Medical;
