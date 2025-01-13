import React from "react";
import MainLayout from "../../../layouts/MainLayout";

const NotificationsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Manage Notifications</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Create, update, or delete user notifications.
        </p>
        {/* Add your Notifications management components here */}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
