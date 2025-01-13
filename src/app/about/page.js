"use client"
import React from "react";
import { 
  FaShieldAlt, 
  FaBook, 
  FaUserMd, 
  FaGraduationCap, 
  FaChartLine, 
  FaLightbulb,
  FaAward,
  FaNetworkWired,
  FaChalkboardTeacher
} from "react-icons/fa";

const AboutUs = () => {
  const companyTimeline = [
    {
      year: 2018,
      title: "Strategic Inception",
      description: "Founded with a disruptive vision to transform medical education through technology-driven learning solutions.",
      impact: "Initial seed funding secured: $500,000"
    },
    {
      year: 2020,
      title: "Platform Evolution",
      description: "Launched comprehensive digital learning ecosystem, integrating AI-powered adaptive learning technologies.",
      impact: "Over 10,000 active users, 95% satisfaction rate"
    },
    {
      year: 2022,
      title: "Global Educational Impact",
      description: "Expanded international partnerships with leading medical institutions and educational networks.",
      impact: "Presence in 12 countries, 50+ institutional collaborations"
    }
  ];

  const professionalValues = [
    {
      icon: FaShieldAlt,
      title: "Academic Excellence",
      description: "Unwavering commitment to the highest standards of educational quality, content accuracy, and pedagogical innovation.",
      color: "text-[#0a2342]"
    },
    {
      icon: FaNetworkWired,
      title: "Collaborative Innovation",
      description: "Fostering a dynamic ecosystem of continuous learning, technological advancement, and interdisciplinary knowledge exchange.",
      color: "text-[#1a80b6]"
    },
    {
      icon: FaChalkboardTeacher,
      title: "Transformative Learning",
      description: "Pioneering adaptive, personalized educational experiences that empower healthcare professionals to excel in their careers.",
      color: "text-[#fb3467]"
    }
  ];

  const keyMetrics = [
    {
      icon: FaBook,
      number: "900+",
      label: "Comprehensive Study Guides"
    },
    {
      icon: FaAward,
      number: "95%",
      label: "User Satisfaction Rate"
    },
    {
      icon: FaUserMd,
      number: "50K+",
      label: "Healthcare Professionals Supported"
    }
  ];

  return (
    <div className="bg-[#f4f7f6] w-full">
      {/* Executive Header */}
      <section className="bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7c]/95 to-[#1a80b6]/85 opacity-90 blur-sm"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="w-full px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full shadow-lg mb-3 flex items-center justify-center">
              <FaGraduationCap className="text-3xl md:text-4xl text-white/90 opacity-90 transform transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight leading-tight">
            Tenapedia: Pioneering Medical Education Technology
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide">
            A visionary educational technology enterprise dedicated to revolutionizing 
            medical learning through cutting-edge, data-driven, and personalized 
            educational solutions that bridge knowledge, enhance clinical competence, 
            and accelerate professional growth.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-10 md:py-12 bg-white shadow-sm">
        <div className="w-full px-4">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-center">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <metric.icon className="text-3xl md:text-4xl text-[#1a80b6] mx-auto mb-3 md:mb-4 opacity-80" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#0a2342] mb-2 md:mb-3">{metric.number}</h3>
                <p className="text-xs md:text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-14 bg-[#f4f7f6]">
        <div className="w-full px-4 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a2342] mb-3 md:mb-4 tracking-tight">
              Our Mission
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              To empower healthcare professionals through innovative, technology-enhanced 
              learning platforms that provide comprehensive, adaptive, and personalized 
              educational experiences, driving continuous professional development 
              and clinical excellence.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a80b6] mb-3 md:mb-4 tracking-tight">
              Our Vision
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              To be the global leader in medical education technology, continuously 
              pushing the boundaries of learning innovation, and creating a worldwide 
              ecosystem that transforms how healthcare professionals acquire, 
              integrate, and apply critical knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Values */}
      <section className="py-12 md:py-14 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a2342] mb-3 tracking-tight">
              Core Professional Values
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              The strategic principles that define our approach to transformative 
              medical education technology.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {professionalValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-[#f4f7f6] rounded-2xl p-4 md:p-6 text-center border border-gray-200 
                  shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <value.icon className={`text-4xl md:text-5xl mx-auto mb-3 md:mb-4 ${value.color} opacity-80`} />
                <h3 className="text-lg md:text-xl font-bold text-[#0a2342] mb-2 md:mb-3">{value.title}</h3>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-12 md:py-14 bg-[#f4f7f6]">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a2342] mb-3 tracking-tight">
              Our Strategic Journey
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              A chronicle of strategic innovation, technological advancement, 
              and commitment to reshaping medical education.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>
            {companyTimeline.map((milestone, index) => (
              <div 
                key={index} 
                className={`flex items-center mb-8 md:mb-10 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-4 md:pl-6' : 'pr-4 md:pr-6'}`}>
                  <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a80b6] mb-2 md:mb-3">
                      {milestone.year}
                    </h3>
                    <h4 className="text-base md:text-lg font-semibold text-[#0a2342] mb-2 md:mb-3">
                      {milestone.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3 leading-relaxed">
                      {milestone.description}
                    </p>
                    <div className="text-xs text-gray-500 font-semibold">
                      Impact: {milestone.impact}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 relative">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-[#1a80b6] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-80"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Vision */}
      <section className="bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7c]/95 to-[#1a80b6]/85 opacity-90 blur-sm"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="w-full px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-tight leading-tight">
            Continuous Evolution, Uncompromising Excellence
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed tracking-wide mb-4 md:mb-6">
            We are relentlessly committed to pushing the boundaries of educational 
            technology, leveraging advanced pedagogical research, artificial intelligence, 
            and data-driven insights to create the most sophisticated, engaging, and 
            transformative learning experiences in medical education.
          </p>
          <div className="flex justify-center space-x-3">
            <button className="bg-white text-[#0a2342] px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 transition-colors">
              Explore Our Approach
            </button>
            <button className="border-2 border-white text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold hover:bg-white/20 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
