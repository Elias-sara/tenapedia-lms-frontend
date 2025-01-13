"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaFileAlt, FaRegistered, FaLightbulb, FaTools } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useInView } from 'react-intersection-observer';

const Battle = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 500); // Delay for smooth entry effect
  }, []);

  const FeatureText = ({ text }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5, // Trigger animation when it's 50% in view
    });

    return (
      <p
        ref={ref}
        className={`transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
      >
        {text}
      </p>
    );
  };

  return (
    <div className={`bg-gray-100 relative transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Hexagonal Pattern */}
      <div className="absolute inset-0 bg-[url('/background/BG4.webp')] opacity-60"></div>


      <div className="py-16 relative z-10">
        <div className="container mx-auto px-6 flex items-center justify-between space-x-8">
          {/* Left Features */}
          <div className="space-y-12 relative w-1/3">
            {/* Connecting Lines */}
            <div className="absolute left-48 top-24 h-[calc(50%-3rem)] w-1 bg-orange-500 animate-pulse"></div>
            <div className="absolute left-48 top-[calc(50%+1rem)] h-[calc(50%-3rem)] w-1 bg-yellow-500 animate-pulse"></div>
            <div className="absolute left-48 top-[calc(100%-4rem)] h-[3rem] w-1 bg-blue-500 animate-pulse"></div>

            {/* Feature 1 */}
            <div className="relative group flex items-center space-x-6">
              <div className="w-16 h-16 bg-orange-500 text-white flex items-center justify-center rounded-full shadow-lg transform transition duration-300 group-hover:scale-110">
                <FaUser size={28} className="animate-bounce" />
              </div>
              <div className="bg-orange-500 text-white p-6 rounded-lg shadow-xl w-80 transition-transform group-hover:scale-105">
                <FeatureText text="በንግድነት የተያዩ መጠናቀቁና ሌላም ነገሮች ማስራት ከሚገባ" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group flex items-center space-x-6">
              <div className="w-16 h-16 bg-yellow-500 text-white flex items-center justify-center rounded-full shadow-lg transform transition duration-300 group-hover:scale-110">
                <FaFileAlt size={28} className="animate-bounce" />
              </div>
              <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-xl w-80 transition-transform group-hover:scale-105">
                <FeatureText text="PTIN መስር እና ፋይል ግምገማ መዝገብ ያስተምር" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg transform transition duration-300 group-hover:scale-110">
                <FaRegistered size={28} className="animate-bounce" />
              </div>
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow-xl w-80 transition-transform group-hover:scale-105">
                <FeatureText text="VAT መዝገቦችን ማረግ እና ያስተምር በቅኝም የማስጠን" />
              </div>
            </div>
          </div>

          {/* Center Circle */}
          <div className="relative flex items-center justify-center mx-8">
            <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white text-center rounded-full w-72 h-72 flex flex-col items-center justify-center shadow-xl z-10 border-4 border-orange-300">
              <MdDescription size={52} className="mb-6" />
              <h2 className="text-xl font-bold leading-tight">
                አስፈላጊ <br />መስራችነት
              </h2>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-1 h-12 bg-orange-500 animate-pulse"></div>
            <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-1 h-12 bg-yellow-500 animate-pulse"></div>
            <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-1 h-12 bg-blue-500 animate-pulse"></div>
          </div>

          {/* Right Features */}
          <div className="space-y-12 relative w-1/3">
            {/* Connecting Lines */}
            <div className="absolute right-48 top-24 h-[calc(50%-3rem)] w-1 bg-green-500 animate-pulse"></div>
            <div className="absolute right-48 top-[calc(50%+1rem)] h-[calc(50%-3rem)] w-1 bg-red-500 animate-pulse"></div>

            {/* Feature 4 */}
            <div className="relative group flex items-center space-x-6">
              <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full shadow-lg transform transition duration-300 group-hover:scale-110">
                <FaLightbulb size={28} className="animate-bounce" />
              </div>
              <div className="bg-green-500 text-white p-6 rounded-lg shadow-xl w-80 transition-transform group-hover:scale-105">
                <FeatureText text="አዲስ እንቅስቃሴ በሚጠኑ ቅጥር ከፍተኛ ዝርዝር ማረግ" />
              </div>
            </div>

            {/* Feature 5 */}
            <div className="relative group flex items-center space-x-6">
              <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full shadow-lg transform transition duration-300 group-hover:scale-110">
                <FaTools size={28} className="animate-bounce" />
              </div>
              <div className="bg-red-500 text-white p-6 rounded-lg shadow-xl w-80 transition-transform group-hover:scale-105">
                <FeatureText text="እንቅስቃሴ በልገባ በተለያዩ ነገሮች ማስማማት" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
