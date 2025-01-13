import React from "react";
import Link from "next/link";
import { 
  FaVideo, 
  FaClipboardList, 
  FaBook, 
  FaUserGraduate, 
  FaChevronRight,
  FaCheckCircle,
  FaChartLine,
  FaMedal
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: FaVideo,
      title: "1,200+ Animated Videos",
      description: "Cutting-edge video content that transforms complex medical topics into engaging, visually compelling learning experiences.",
      color: "text-[#1a80b6]",
      bgColor: "bg-[#1a80b6]/10",
      hoverColor: "hover:bg-[#1a80b6]/20"
    },
    {
      icon: FaClipboardList,
      title: "4,000+ Practice Questions",
      description: "Comprehensive, adaptive question bank meticulously designed to simulate real-world medical examination scenarios.",
      color: "text-[#fb3467]",
      bgColor: "bg-[#fb3467]/10",
      hoverColor: "hover:bg-[#fb3467]/20"
    },
    {
      icon: FaBook,
      title: "900+ Study Guides",
      description: "Expertly crafted, visually rich study materials that distill complex medical concepts into clear, actionable insights.",
      color: "text-[#2ecc71]",
      bgColor: "bg-[#2ecc71]/10",
      hoverColor: "hover:bg-[#2ecc71]/20"
    },
    {
      icon: FaUserGraduate,
      title: "1M+ Students Supported",
      description: "A trusted, globally recognized platform empowering medical professionals to excel in their academic and career journeys.",
      color: "text-[#f39c12]",
      bgColor: "bg-[#f39c12]/10",
      hoverColor: "hover:bg-[#f39c12]/20"
    }
  ];

  const featureHighlights = [
    {
      icon: FaMedal,
      text: "Accredited by Leading Medical Institutions",
      color: "text-[#1a80b6]"
    },
    {
      icon: FaChartLine,
      text: "Personalized Learning Paths",
      color: "text-[#fb3467]"
    },
    {
      icon: FaCheckCircle,
      text: "Comprehensive Medical Laboratory Coverage",
      color: "text-[#2ecc71]"
    },
    {
      icon: FaVideo,
      text: "Interactive Multimedia Content",
      color: "text-[#f39c12]"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a80b6] rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#fb3467] rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 
            bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
            Transform Your Medical Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          የሕክምና የላቦራቶሪ ትምህርትን በባለሙያዎች በተመረኮዙ፣ በተለምዷዊ የመማር ልምዶች ከፍ ለማድረግ በጥንቃቄ የተነደፉ አዳዲስ፣ ሁሉን አቀፍ ግብዓቶች።
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`
                ${feature.bgColor} ${feature.hoverColor}
                rounded-xl p-6 shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-2 
                flex flex-col group border-t-4 ${feature.color.replace('text-', 'border-')}
              `}
            >
              <div className="flex items-center mb-4">
                <feature.icon 
                  className={`text-4xl mb-3 ${feature.color} 
                    group-hover:scale-110 transition-transform`} 
                />
              </div>
              <h3 className={`text-xl font-bold ${feature.color} mb-3`}>
                {feature.title}
              </h3>
              <p className="text-gray-700 mb-4 flex-grow">
                {feature.description}
              </p>
              <Link 
                href="/features" 
                className={`flex items-center text-base font-semibold ${feature.color} 
                  hover:underline group-hover:translate-x-1 transition-transform`}
              >
                Learn More 
                <FaChevronRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="bg-white rounded-xl p-10 shadow-xl border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ለምን Tenapedia ተመራጭ ያደርገዋል?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featureHighlights.map((highlight, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <highlight.icon 
                  className={`text-2xl ${highlight.color}`} 
                />
                <span className="text-base text-gray-800 font-medium">
                  {highlight.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            href="/resources"
            className="flex items-center justify-center mx-auto w-fit 
              bg-[#fb3467] text-white py-3 px-8 rounded-lg 
              text-lg font-semibold hover:bg-[#1a80b6] 
              transition-colors duration-300 transform hover:scale-105 
              shadow-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fb3467]"
          >
            Explore All Resources
            <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
