"use client";

import React from "react";
import Link from "next/link";
import { 
  FaGraduationCap, 
  FaBookMedical, 
  FaUserMd 
} from 'react-icons/fa';

const Hero = () => {
  const image = "/images/hakim4.jpg";

  return (
    <section> 
      {/* className="relative bg-gradient-to-br from-[#f4f7fa] via-white to-[#e6f2ff] text-gray-900 py-16 md:py-20 lg:py-24 overflow-hidden"> */}
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a80b6] rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#fb3467] rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Section */}
        <div className="space-y-8 text-center md:text-left">
          <div className="space-y-5">
            <div className="inline-flex items-center space-x-3 bg-[#1a80b6]/10 px-4 py-2 rounded-full">
              <FaUserMd className="text-[#1a80b6] text-xl" />
              <span className="text-[#1a80b6] font-medium text-base tracking-wide">
              እንኴን ደህና መጡ !
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-gray-900 block mb-2">የሕክምና ትምህርት</span>
              <span className="text-[#1a80b6] block">ዎን  ከፍ አድርጉ!</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0">
          አዲስ እና ተሳታፊ ምንጮችን በመጠቀም የሕክምና ትምህርትን ለማሻሻል የተነደፈ፣ በባለሙያ የተመረጠ ደረጃ እና ሙሉ ትምህርት መድረክ።
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link
              href="/auth/register"
              className="flex items-center justify-center bg-[#fb3467] text-white 
                py-3 px-8 rounded-lg text-lg font-bold 
                hover:bg-[#1a80b6] transition duration-300 
                transform hover:scale-105 shadow-md hover:shadow-xl 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fb3467]"
            >
              <FaGraduationCap className="mr-2" /> በነጻ ይቀላቀሉ
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-center bg-white text-[#1a80b6] 
                border-2 border-[#1a80b6] py-3 px-8 
                rounded-lg text-lg font-bold 
                hover:bg-[#1a80b6] hover:text-white 
                transition duration-300 transform hover:scale-105 
                shadow-md hover:shadow-xl 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a80b6]"
            >
              <FaBookMedical className="mr-2" /> መፍትሄዎችን ያስሱ
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center md:justify-start space-x-8 mt-8 text-gray-700">
            <div className="text-center">
              <span className="block text-3xl font-bold text-[#1a80b6]">500+</span>
              <span className="text-sm">Learning Modules</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-[#fb3467]">50K+</span>
              <span className="text-sm">Learners Worldwide</span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div className="relative group max-w-md w-full">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#1a80b6] to-[#fb3467] 
              rounded-xl blur-lg opacity-30 group-hover:opacity-40 transition duration-300"></div>
            <img
              src={image}
              alt="Medical Education Resource"
              className="relative z-10 rounded-xl shadow-2xl transform transition-all duration-300 
                group-hover:scale-105 group-hover:rotate-1 w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
