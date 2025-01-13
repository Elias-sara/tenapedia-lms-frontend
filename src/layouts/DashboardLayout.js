import React from "react";
import NavBar from "../components/common/NavBar";
import Sidebar from "../components/common/Sidebar"; // Assuming you have the Sidebar component

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* NavBar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
