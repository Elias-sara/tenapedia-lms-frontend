"use client"
import React, { useState } from "react";
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronUp, 
  FaSearch,
  FaLightbulb,
  FaBook,
  FaGraduationCap
} from "react-icons/fa";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = [
    {
      category: "Platform Overview",
      icon: FaLightbulb,
      questions: [
        {
          question: "What is Tenapedia?",
          answer: "Tenapedia is an advanced educational technology platform meticulously designed for healthcare professionals. We leverage cutting-edge pedagogical research and AI-driven personalization to provide comprehensive, adaptive learning resources that support continuous professional development."
        },
        {
          question: "How can Tenapedia help me with my studies?",
          answer: "Our platform delivers a holistic learning experience through personalized study guides, interactive practice questions, expert-curated content, adaptive learning paths, and real-time performance analytics. We transform complex medical education into an engaging, accessible, and scientifically-backed learning journey."
        }
      ]
    },
    {
      category: "Access and Pricing",
      icon: FaBook,
      questions: [
        {
          question: "Is Tenapedia free to use?",
          answer: "Tenapedia employs a strategic tiered access model. We provide essential resources free of charge, with advanced premium features available through subscription plans. Our mission is to democratize high-quality medical education while offering sophisticated tools for dedicated learners."
        },
        {
          question: "What devices can I use Tenapedia on?",
          answer: "Our platform is comprehensively responsive and optimized across all devices - smartphones, tablets, laptops, and desktops. Experience a seamless, synchronized learning environment with consistent progress tracking and adaptive interfaces."
        }
      ]
    },
    {
      category: "Learning Experience",
      icon: FaGraduationCap,
      questions: [
        {
          question: "Who can benefit from Tenapedia?",
          answer: "Tenapedia serves a diverse ecosystem of healthcare professionals: medical students, laboratory technicians, certification candidates, and practicing professionals seeking continuous education, skill enhancement, and professional growth."
        },
        {
          question: "Do you offer mentorship?",
          answer: "Absolutely! Our expert mentorship program connects you with seasoned healthcare professionals who provide personalized guidance, strategic career advice, and in-depth subject matter support through interactive sessions and dedicated communication channels."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="bg-[#f9fafb] min-h-screen antialiased">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7c]/95 to-[#1a80b6]/85 opacity-90 blur-sm"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="w-full px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-full mx-auto leading-relaxed px-4">
            Comprehensive answers to elevate your understanding of Tenapedia's 
            innovative healthcare education platform.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 w-full max-w-xl mx-auto px-4">
            <input 
              type="text" 
              placeholder="Search questions or topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1a80b6] transition-all duration-300 border-2 border-transparent focus:border-[#1a80b6]/50"
            />
            <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="w-full px-4 py-12 bg-transparent space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="w-full mx-auto">
              <div className="flex items-center mb-6 border-b pb-3 w-full px-4">
                <category.icon className="text-[#1a80b6] mr-3 text-2xl" />
                <h2 className="text-2xl font-bold text-[#0a2342] tracking-tight">
                  {category.category}
                </h2>
              </div>
              {category.questions.map((faq, questionIndex) => (
                <div 
                  key={questionIndex} 
                  className="w-full px-4 mb-4"
                >
                  <div 
                    className="w-full bg-white shadow-lg overflow-hidden border border-gray-100 rounded-3xl"
                  >
                    <div 
                      className="flex justify-between items-center p-6 cursor-default group"
                    >
                      <h3 className="text-xl font-semibold text-[#0a2342] transition-colors pr-4 w-full">
                        {faq.question}
                      </h3>
                      <FaChevronDown className="text-[#1a80b6] flex-shrink-0" />
                    </div>
                    <div className="p-6 bg-gray-50/50 text-gray-700 text-base leading-relaxed border-t border-gray-200">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 bg-white shadow-md rounded-3xl p-12 w-full mx-4">
            <FaQuestionCircle className="mx-auto text-5xl text-[#1a80b6] mb-6" />
            <p className="text-lg">No FAQs found matching your search criteria.</p>
            <p className="text-base mt-2 text-gray-400">Try different keywords or browse our categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
