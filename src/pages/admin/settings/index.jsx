import React from "react";
import MainLayout from "../../../layouts/MainLayout";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Settings</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Configure platform settings and preferences.
        </p>
        {/* Add your Settings components here */}
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
