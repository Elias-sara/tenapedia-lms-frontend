import React from "react";
import { 
  FaBook, 
  FaQuestionCircle, 
  FaNewspaper, 
  FaDownload, 
  FaCheckCircle 
} from "react-icons/fa";

const ResourceCard = ({ icon: Icon, title, description, items }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Icon className="text-4xl text-primary-500 mr-4" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      {items && (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FaCheckCircle className="mr-2 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const FreeResources = () => {
  const resourceSections = [
    {
      icon: FaBook,
      title: "Free Study Guides",
      description: "Comprehensive guides covering essential healthcare topics.",
      items: [
        "Microbiology Study Guide",
        "Clinical Chemistry Study Guide", 
        "Hematology Study Guide"
      ]
    },
    {
      icon: FaQuestionCircle,
      title: "Practice Questions",
      description: "Prepare for exams with our curated practice questions.",
      items: [
        "Medical Laboratory Science Exam Questions",
        "NCLEX-RN Practice Questions"
      ]
    },
    {
      icon: FaNewspaper,
      title: "Expert Insights",
      description: "Stay updated with the latest trends and professional advice.",
      items: [
        "Lab Safety Best Practices",
        "Medical Technology Innovations"
      ]
    },
    {
      icon: FaDownload,
      title: "Downloadable Resources",
      description: "Access professional templates and study aids.",
      items: [
        "Lab Report Templates",
        "Study Checklists"
      ]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#006aff] to-[#4d9cff]">
            Tenapedia Free Resources
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Empowering healthcare professionals with accessible, high-quality educational resources. 
            Expand your knowledge, enhance your skills, and advance your career with our comprehensive free materials.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resourceSections.map((section, index) => (
            <ResourceCard 
              key={index}
              icon={section.icon}
              title={section.title}
              description={section.description}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeResources;
