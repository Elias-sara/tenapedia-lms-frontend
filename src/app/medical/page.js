// app/medical/page.js
import React from "react";
import MedicalComponent from "../../components/common/medical"; // Import the component from components folder

const MedicalPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Use the MedicalComponent here */}
      <MedicalComponent />
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Medical Resources</h1>
          <p className="text-lg mb-6">
            Discover a wide range of medical resources to enhance your practice
            and knowledge.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MedicalPage;
