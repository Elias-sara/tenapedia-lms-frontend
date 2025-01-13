"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaCheckCircle 
} from "react-icons/fa";

const CallToAction = () => {
  const features = [
    "Comprehensive Curriculum",
    "Interactive Learning Modules",
    "Career-Focused Resources"
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="space-y-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 
                leading-tight tracking-tight text-center">
                Jumpstart Your Nursing Journey with Tenapedia
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 text-center">
              በባለሙያዎች የተዘጋጁ እንዲሁም የተመረጡ ቪዲዮዎች፣ የተግባር ጥያቄዎች፣ እና አጠቃላይ የጥናት መመሪያዎችን ጨምሮ የጥናት መርጃዎችን ያግኙ፤ የነርስ ፈተናዎችዎን ለመጨረስ እንዲያግዙዎ የተነደፉ።
              </p>
            </motion.div>

            {/* Feature List */}
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 mb-8 flex flex-col items-center"
            >
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-700 text-center"
                >
                  <FaCheckCircle className="text-green-500 mr-3 text-lg flex-shrink-0" />
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* Call-to-Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center space-x-4"
            >
              <Link 
                href="/auth/register" 
                className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg 
                  hover:bg-gray-800 transition-colors duration-300 group"
              >
                Start Learning
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 
                  rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
          {/* Image removed */}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
