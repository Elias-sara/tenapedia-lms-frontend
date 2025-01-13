"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative  py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a80b6] rounded-full mix-blend-overlay blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#fb3467] rounded-full mix-blend-overlay blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 
              bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467] text-center">
              የጤና ባለሙያዎችን በኢትዮጵያ ብቁ እንዲሆኑ ማድረግ
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto text-center">
            በሕክምና ትምህርት እና በፈተናዎች የላቀ ውጤት እንዲያመጡ የሚያግዙ አጠቃላይ የትምህርት መርጃዎች።
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/courses" 
                className="flex items-center px-6 py-3 bg-[#1a80b6] text-white rounded-lg 
                  hover:bg-[#2196f3] transition-colors duration-300 group"
              >                
ኮርሶችን ያግኙ
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 
                  rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                ተጨማሪ
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;