"use client";
import React, { useState } from "react";
import { 
  FaChalkboardTeacher, 
  FaBook, 
  FaQuestionCircle, 
  FaUserPlus, 
  FaEnvelope, 
  FaCheck 
} from "react-icons/fa";

const InstructorPage = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const openJoinModal = () => setShowJoinModal(true);
  const closeJoinModal = () => setShowJoinModal(false);

  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  return (
    <div className="bg-gray-50 w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7c]/95 to-[#1a80b6]/85 opacity-90 blur-sm"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="w-full px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full shadow-lg mb-4 flex items-center justify-center">
              <FaChalkboardTeacher className="text-4xl text-white/90 opacity-90 transform transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Empowering Educators, Transforming Learning
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed tracking-wide">
            Join a revolutionary platform designed to elevate medical education through innovative technology, 
            comprehensive resources, and data-driven teaching strategies.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-8 py-3 bg-white text-[#1a80b6] font-bold rounded-xl 
              hover:bg-[#0a4f7c] hover:text-white focus:outline-none focus:ring-2 
              focus:ring-[#1a80b6] transition-colors flex items-center space-x-2 
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ease-in-out duration-300 group"
              onClick={openJoinModal}
            >
              <FaUserPlus className="transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" /> 
              <span>Join for Free</span>
            </button>
            <button
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl 
              hover:bg-white hover:text-[#1a80b6] focus:outline-none focus:ring-2 
              focus:ring-white transition-colors flex items-center space-x-2 
              shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ease-in-out duration-300 group"
              onClick={openContactModal}
            >
              <FaEnvelope className="transition-transform group-hover:rotate-12 group-hover:translate-x-0.5" /> 
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Tenapedia */}
      <section className="py-16 bg-white">
        <div className="w-full px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 
                bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
                Why Choose Tenapedia?
              </h2>
              <p className="mt-4 text-lg text-gray-700 mb-8 leading-relaxed">
                We are committed to revolutionizing medical education by transforming complex knowledge 
                into engaging, visual, and impactful learning experiences that truly resonate with students.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: FaBook,
                    color: "text-[#1a80b6]",
                    title: "Comprehensive Study Guides",
                    description: "900+ meticulously crafted summaries with engaging visuals and key insights, designed to simplify complex medical concepts."
                  },
                  {
                    icon: FaQuestionCircle,
                    color: "text-[#fb3467]",
                    title: "Advanced Practice Questions",
                    description: "4,000+ comprehensive practice questions with detailed rationales, ensuring deep understanding and exam readiness."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-5 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300">
                    <feature.icon className={`${feature.color} text-4xl mt-1`} />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-[#1a80b6]/10 to-[#fb3467]/10 
                rounded-2xl p-8 shadow-lg transform hover:scale-105 transition duration-300 
                border border-gray-100 hover:border-[#1a80b6]/30">
                <FaChalkboardTeacher className="text-6xl text-[#1a80b6] mb-6 mx-auto" />
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Educator Empowerment
                </h3>
                <p className="text-center text-gray-600 leading-relaxed">
                  Unlock your potential to create transformative learning experiences 
                  that inspire, motivate, and effectively guide students through their 
                  medical education journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Tenapedia Can Offer Educators */}
      <section className="bg-gradient-to-br from-[#0a4f7c] to-[#1a80b6] text-white py-16 md:py-24">
        <div className="w-full px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Elevate Your Teaching Approach
          </h2>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tenapedia provides cutting-edge tools and resources designed to transform 
            your educational approach, enhance student engagement, and streamline 
            your teaching process with data-driven insights.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: FaBook, 
                title: "Comprehensive Resources", 
                desc: "Extensive, curated study materials and guides tailored for medical education.",
                color: "bg-white/10 hover:bg-white/20"
              },
              { 
                icon: FaQuestionCircle, 
                title: "Interactive Learning", 
                desc: "Engaging practice questions and scenarios that promote critical thinking.",
                color: "bg-white/10 hover:bg-white/20"
              },
              { 
                icon: FaChalkboardTeacher, 
                title: "Professional Development", 
                desc: "Advanced tools to enhance teaching effectiveness and student outcomes.",
                color: "bg-white/10 hover:bg-white/20"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`${item.color} p-6 rounded-xl transition duration-300 
                  transform hover:-translate-y-2 hover:shadow-lg`}
              >
                <item.icon className="text-4xl text-white mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white mb-2 text-center">{item.title}</h3>
                <p className="text-white/80 text-center leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-200">
            <button 
              onClick={closeJoinModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>
            <h3 className="text-3xl font-bold mb-6 text-[#1a80b6] text-center">
              Join Tenapedia Educators Network
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Professional Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                  placeholder="Enter your professional email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Institution</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a80b6]"
                  placeholder="Your medical institution or university"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#1a80b6] text-white py-3 rounded-full hover:bg-[#0a4f7c] 
                transition duration-300 font-bold flex items-center justify-center space-x-2"
              >
                <FaCheck className="mr-2" /> Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorPage;
