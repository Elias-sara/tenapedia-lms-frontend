import React from "react";
import MainLayout from "../../../layouts/MainLayout";

const ApiAccessPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">API Access</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Manage API keys and integrations with third-party applications.
        </p>
        {/* Add your API Access components here */}
      </div>
    </MainLayout>
  );
};

export default ApiAccessPage;
