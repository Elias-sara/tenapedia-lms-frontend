import React from "react";
import Link from "next/link";

const AdminSectionButtons = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section, index) => (
        <Link key={index} href={section.link}>
          <div className="flex items-center justify-between p-6 border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className={`flex items-center ${section.color} space-x-4`}>
              <section.icon className="text-3xl" />
              <div>
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSectionButtons;
