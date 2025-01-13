import React from "react";
import { 
  FaBook, 
  FaUserTie, 
  FaChartLine, 
  FaLightbulb, 
  FaUserGraduate, 
  FaClipboardList 
} from "react-icons/fa";

const MarketingMaterials = () => {
  const keyFeatures = [
    {
      icon: FaBook,
      title: "Comprehensive Study Resources",
      description: "Meticulously curated study guides covering microbiology, clinical chemistry, hematology, and more. Designed to transform complex medical knowledge into digestible, engaging content.",
      color: "text-[#1a80b6]"
    },
    {
      icon: FaUserTie,
      title: "Expert Mentorship",
      description: "Direct access to seasoned healthcare professionals who provide personalized guidance, strategic insights, and real-world perspectives to accelerate your learning journey.",
      color: "text-[#fb3467]"
    },
    {
      icon: FaChartLine,
      title: "Adaptive Learning Technology",
      description: "Intelligent learning pathways that dynamically adjust to your performance, ensuring targeted improvement and maximizing your study efficiency.",
      color: "text-[#4caf50]"
    },
    {
      icon: FaLightbulb,
      title: "Interactive Case Studies",
      description: "Immersive, real-world medical scenarios that bridge theoretical knowledge with practical application, enhancing critical thinking and clinical reasoning skills.",
      color: "text-[#ff9800]"
    }
  ];

  const whyChooseTitles = [
    {
      title: "Interactive Learning",
      description: "Engage with dynamic, multimedia-rich content that transforms passive studying into an active, immersive learning experience.",
      icon: FaUserGraduate
    },
    {
      title: "Continuous Updates",
      description: "Stay at the forefront of medical education with content continuously refined by industry experts and aligned with the latest healthcare trends.",
      icon: FaClipboardList
    }
  ];

  return (
    <div className="bg-gray-50 w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7c]/95 to-[#1a80b6]/85 opacity-90 blur-sm"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="w-full px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full shadow-lg mb-4 flex items-center justify-center">
              <FaBook className="text-4xl text-white/90 opacity-90 transform transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Elevate Your Medical Learning Journey
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide">
            Tenapedia is your comprehensive learning ecosystem, designed to transform medical education 
            through innovative technology, expert-curated content, and personalized learning strategies.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-8 py-3 bg-white text-[#1a80b6] font-bold rounded-xl 
              hover:bg-[#0a4f7c] hover:text-white focus:outline-none focus:ring-2 
              focus:ring-[#1a80b6] transition-colors flex items-center space-x-2 
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ease-in-out duration-300 group"
            >
              <FaUserGraduate className="transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" /> 
              <span>Start Learning</span>
            </button>
            <button
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl 
              hover:bg-white hover:text-[#1a80b6] focus:outline-none focus:ring-2 
              focus:ring-white transition-colors flex items-center space-x-2 
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ease-in-out duration-300 group"
            >
              <FaClipboardList className="transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" /> 
              <span>Explore Resources</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 
                bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
                Our Key Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Innovative learning solutions designed to accelerate your medical education
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-6 rounded-2xl border border-[#006aff]/20 
                  hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 
                  hover:border-[#006aff]/50"
                >
                  <div className="flex items-center mb-4">
                    <feature.icon className={`text-[#006aff] text-4xl mr-4`} />
                    <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Tenapedia Section */}
      <section className="bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-16 md:py-24">
        <div className="w-full px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#4CAF50]">
            Why Choose Tenapedia?
          </h2>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            We're not just a learning platform; we're your strategic partner in medical education, 
            committed to your professional growth and success.
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Interactive Learning Card */}
            <div 
              className="bg-[#4CAF50]/10 p-6 rounded-xl hover:bg-[#4CAF50]/20 
              transition duration-300 transform hover:-translate-y-2 hover:shadow-lg 
              border border-[#4CAF50]/20 hover:border-[#4CAF50]/40"
            >
              <div className="flex items-center mb-4">
                <FaLightbulb className="text-[#4CAF50] text-4xl mr-4" />
                <h3 className="text-2xl font-bold text-black">Interactive Learning</h3>
              </div>
              <p className="text-white leading-relaxed">
                Engage with dynamic, multimedia-rich content that transforms passive studying 
                into an active, immersive learning experience.
              </p>
            </div>

            {/* Continuous Updates Card */}
            <div 
              className="bg-[#4CAF50]/10 p-6 rounded-xl hover:bg-[#4CAF50]/20 
              transition duration-300 transform hover:-translate-y-2 hover:shadow-lg 
              border border-[#4CAF50]/20 hover:border-[#4CAF50]/40"
            >
              <div className="flex items-center mb-4">
                <FaClipboardList className="text-[#4CAF50] text-4xl mr-4" />
                <h3 className="text-2xl font-bold text-black">Continuous Updates</h3>
              </div>
              <p className="text-white leading-relaxed">
                Stay at the forefront of medical education with content continuously refined 
                by industry experts and aligned with the latest healthcare trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Your Future Starts Here
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you're a medical student, healthcare professional, or aspiring clinician, 
            Tenapedia provides the tools, resources, and support to help you excel in your career.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-10 py-4 bg-[#1a80b6] text-white font-bold rounded-xl 
              hover:bg-[#0a4f7c] focus:outline-none focus:ring-2 focus:ring-[#1a80b6] 
              transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 
              ease-in-out duration-300 flex items-center space-x-2"
            >
              <FaUserGraduate className="mr-2" /> Get Started
            </button>
            <button
              className="px-10 py-4 border-2 border-[#1a80b6] text-[#1a80b6] font-bold rounded-xl 
              hover:bg-[#1a80b6] hover:text-white focus:outline-none focus:ring-2 
              focus:ring-[#1a80b6] transition-colors shadow-md hover:shadow-lg 
              transform hover:-translate-y-1 ease-in-out duration-300 flex items-center space-x-2"
            >
              <FaClipboardList className="mr-2" /> Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingMaterials;
