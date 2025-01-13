"use client";

import React from "react";
import Link from "next/link";
import { 
  FaVideo, 
  FaClipboardList, 
  FaBook, 
  FaChevronRight,
  FaCheckCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContentSection = () => {
  const contentItems = [
    {
      icon: FaVideo,
      title: "የፈተና ዝግጅት ቪዲዮዎች",
      description: "በህክምና ላብራቶሪ ሳይንስ ውስጥ አስፈላጊ እና ጠቃሚ  የሆኑ ርዕሶችን የሚሸፍኑ ከ1,200+ በላይ የሆኑ ቪዲዮዎችን ያገኛሉ፡ ቁልፍ ጽንሰ-ሀሳቦችን በእይታ ፣ ለመረዳት ቀላል በሆነ ቅርጸት ይማሩ።",
      features: [
        "1,200+ High-Quality Videos",
        "Expert-Led Explanations",
        "Comprehensive Topic Coverage"
      ],
      link: "/resources/videos",
      color: "text-[#1a80b6]",
      bgColor: "bg-[#1a80b6]"
    },
    {
      icon: FaClipboardList,
      title: "የተግባር ጥያቄዎች",
      description: "ከ4,000 በላይ የተግባር ጥያቄዎች እና ለህክምና ላብራቶሪ ፈተናዎች በተዘጋጁ ምክረ ሃሳቦች እውቀትዎን ያጠናክራሉ።",
      features: [
        "4,000+ Practice Questions",
        "Detailed Rationales",
        "Exam-Style Formatting"
      ],
      link: "/resources/questions",
      color: "text-[#fb3467]",
      bgColor: "bg-[#fb3467]"
    },
    {
      icon: FaBook,
      title: "ሊወርዱ የሚችሉ የጥናት መመሪያዎች",
      description: "የሕክምና የላቦራቶሪ ፈተናዎችዎን ለመጨረስ እንዲረዱዎት የተነደፉ 900+ አጠቃላይ የጥናት መመሪያዎችን ያውርዱ።",
      features: [
        "900+ Comprehensive Guides",
        "Printable PDF Formats",
        "Concise & Focused Content"
      ],
      link: "/resources/guides",
      color: "text-[#2ecc71]",
      bgColor: "bg-[#2ecc71]"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#f4f7fa] to-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a80b6] rounded-full mix-blend-overlay blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#fb3467] rounded-full mix-blend-overlay blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
            አጠቃላይ የጥናት መርጃዎች
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          የህክምና ላቦራቶሪ ተማሪዎችን በአካዳሚክ ጉዟቸው ለመደገፍ የተዘጋጀ የትምህርት ቁሳቁስ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {contentItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2, 
                type: "spring", 
                stiffness: 100 
              }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl 
                         transition-all duration-300 transform hover:-translate-y-2 
                         overflow-hidden group border border-gray-100 hover:border-[#1a80b6]/20"
            >
              <div className="p-6 pb-0 relative">
                <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <item.icon className={`text-6xl ${item.color}`} />
                </div>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${item.bgColor} bg-opacity-10 mb-3`}>
                    <item.icon 
                      className={`text-3xl ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} 
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <ul className="space-y-2 mb-4 text-sm text-gray-700">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheckCircle className={`mr-2 ${item.color} opacity-70`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0">
                <Link 
                  href={item.link} 
                  className={`flex items-center text-base font-semibold ${item.color} 
                    hover:underline group-hover:translate-x-1 transition-transform`}
                >
                  Explore Now 
                  <FaChevronRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
