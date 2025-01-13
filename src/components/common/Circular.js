import React from "react";
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';  // For dynamic imports

const FaFileAlt = dynamic(() => import('react-icons/fa').then(mod => mod.FaFileAlt));
const FaCog = dynamic(() => import('react-icons/fa').then(mod => mod.FaCog));
const FaTools = dynamic(() => import('react-icons/fa').then(mod => mod.FaTools));
const FaLightbulb = dynamic(() => import('react-icons/fa').then(mod => mod.FaLightbulb));
const FaBook = dynamic(() => import('react-icons/fa').then(mod => mod.FaBook));
const FaStethoscope = dynamic(() => import('react-icons/fa').then(mod => mod.FaStethoscope));
const FaPills = dynamic(() => import('react-icons/fa').then(mod => mod.FaPills));
const FaHeart = dynamic(() => import('react-icons/fa').then(mod => mod.FaHeart));
const FaChild = dynamic(() => import('react-icons/fa').then(mod => mod.FaChild));
const FaPhone = dynamic(() => import('react-icons/fa').then(mod => mod.FaPhone));

const HexagonItem = ({ icon: Icon, title, description }) => (
  <div className="relative group">
    <svg viewBox="0 0 200 173" className="w-full h-auto">
      <polygon
        points="100,0 190,50 190,150 100,200 10,150 10,50"
        fill="white"
        stroke="#003366"
        strokeWidth="2"
        className="group-hover:fill-[#FFE6B3] transition-colors duration-300"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
      <Icon className="text-3xl text-[#003366] mb-2 group-hover:text-[#FFA500] transition-colors" aria-label={title} />
      <h3 className="text-lg font-semibold text-[#003366] group-hover:text-[#FFA500]">
        {title}
      </h3>
      <p className="text-sm text-gray-800 mt-1">{description}</p>
    </div>
  </div>
);

HexagonItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4 border border-blue-100/20 hover:border-yellow-400 transition-all duration-300">
    <Icon className="text-4xl text-blue-500" aria-label={title} />
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  </div>
);

ServiceCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const App = () => {
  const hexagonItems = [
    { icon: FaFileAlt, title: "PTIN", description: "Professional Documentation" },
    { icon: FaCog, title: "VAT", description: "Verification & Training" },
    { icon: FaTools, title: "Support", description: "Technical Assistance" },
    { icon: FaLightbulb, title: "Ideas", description: "Innovative Solutions" },
    { icon: FaBook, title: "Resources", description: "Study Materials" },
  ];

  const services = [
    { 
      icon: FaStethoscope, 
      title: 'Test-Taking Strategies', 
      description: 'Master exam techniques and approaches' 
    },
    { 
      icon: FaPills, 
      title: 'Pharmacology', 
      description: 'Comprehensive drug knowledge' 
    },
    { 
      icon: FaHeart, 
      title: 'Medical-Surgical Nursing', 
      description: 'Advanced clinical skills' 
    },
    { 
      icon: FaChild, 
      title: 'Pediatrics', 
      description: 'Specialized child healthcare' 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-white">
      {/* Left Section: Hero Section */}
      <div className="relative md:w-1/2 flex items-center justify-center bg-[#F9F9F9] p-6">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#003366] opacity-20 rounded-full blur-3xl z-0"
        ></div>

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full border-4 border-[#003366] shadow-lg flex items-center justify-center z-10"
        >
          <h1 className="text-3xl font-bold text-[#003366] text-center">
            አስፈላጊ<br />መረጃዎች
          </h1>
        </div>

        {/* Hexagon Layout */}
        <div className="relative w-full h-full">
          {hexagonItems.map((item, index) => {
            const angle = (index * (360 / hexagonItems.length)) * (Math.PI / 180);
            const radius = 220; // Adjusted radius to avoid overlap
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: "translate(-50%, -50%)",
                  width: "140px",
                }}
              >
                <HexagonItem {...item} />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center z-20"
          style={{ marginTop: "10px" }}
        >
          <div className="inline-flex items-center space-x-4 bg-[#FFA500]/10 px-6 py-3 rounded-full shadow-md">
            <FaPhone className="text-[#003366] text-2xl" aria-label="Phone" />
            <span className="text-lg font-semibold text-[#003366]">
              Call: +251-913-577-685
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Battle */}
      <div className="relative md:w-1/2 flex items-center justify-center p-6">
        <div className="container mx-auto px-6 z-10 grid gap-12 items-center">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-red-500 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-white border-4 border-yellow-400 text-center rounded-full p-8 shadow-2xl">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">
                  ETHIO-NCLEX
                </h1>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
              ለ አለም አቀፍ እንቅስቃሴ ዝግጅት!
            </h2>

            <div className="grid gap-4">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center space-x-2">
                <span>Get Started</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-700">
                <FaPhone className="text-blue-500" aria-label="Phone" />
                <span>Call: +251-913-577-685</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
