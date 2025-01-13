import React from "react";
import Link from "next/link";
import { 
  FaBook, 
  FaClipboardList, 
  FaPuzzlePiece, 
  FaChevronRight 
} from "react-icons/fa";

const ReinforceConceptsSection = () => {
  const conceptFeatures = [
    {
      icon: FaBook,
      title: "900+ Medical Study Guides",
      description: "Visually engaging, comprehensive study guides that transform complex medical topics into digestible, easy-to-understand resources across multiple specialties.",
      color: "text-[#1a80b6]",
      bgColor: "bg-[#1a80b6]/10"
    },
    {
      icon: FaClipboardList,
      title: "4,000+ Practice Questions",
      description: "Extensive question bank meticulously designed to simulate real medical exams, with detailed rationales that help you understand and learn from each question.",
      color: "text-[#fb3467]",
      bgColor: "bg-[#fb3467]/10"
    },
    {
      icon: FaPuzzlePiece,
      title: "Adaptive Quiz Builder",
      description: "Personalized quiz creation tool that allows you to focus on specific medical topics, track progress, and continuously refine your exam preparation strategy.",
      color: "text-[#2ecc71]",
      bgColor: "bg-[#2ecc71]/10"
    }
  ];

  return (
    <section className="relative bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blurred Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a80b6] rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#fb3467] rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 
            bg-clip-text text-transparent bg-gradient-to-r from-[#1a80b6] to-[#fb3467]">
            የሕክምና ጽንሰ-ሀሳቦችን ማዳበር
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          የህክምና እውቀትዎን ለማጠናከር፣የፈተና ዝግጁነትን ለማሳደግ እና ሙያዊ እድገትዎን ለማፋጠን የተነደፉ አጠቃላይ የመማሪያ መሳሪያዎች
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {conceptFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-2 
                         flex flex-col group`}
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
                href="/resources" 
                className={`flex items-center text-base font-semibold ${feature.color} 
                  hover:underline group-hover:translate-x-1 transition-transform`}
              >
                Learn More 
                <FaChevronRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/auth/register"
            className="flex items-center justify-center mx-auto w-fit bg-[#fb3467] 
              text-white py-3 px-8 rounded-lg text-lg font-semibold 
              hover:bg-[#1a80b6] transition-colors duration-300 
              transform hover:scale-105 shadow-md group"
          >
            Start Building Your Quiz
            <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReinforceConceptsSection;
