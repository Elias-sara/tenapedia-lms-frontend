import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-xl flex flex-col">
      {/* Logo or Brand */}
      <div className="flex items-center justify-center mt-8 mb-10">
        <h2 className="text-3xl font-semibold">Tenapedia</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 px-6">
        <a
          href="#"
          className="flex items-center text-lg font-medium hover:bg-blue-800 p-3 rounded-lg transition-all duration-300"
        >
          <FaHome className="mr-4 text-xl" />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center text-lg font-medium hover:bg-blue-800 p-3 rounded-lg transition-all duration-300"
        >
          <FaUser className="mr-4 text-xl" />
          Users
        </a>
        <a
          href="#"
          className="flex items-center text-lg font-medium hover:bg-blue-800 p-3 rounded-lg transition-all duration-300"
        >
          <FaChartBar className="mr-4 text-xl" />
          Reports
        </a>
        <a
          href="#"
          className="flex items-center text-lg font-medium hover:bg-blue-800 p-3 rounded-lg transition-all duration-300"
        >
          <FaCog className="mr-4 text-xl" />
          Settings
        </a>
        <a
          href="#"
          className="flex items-center text-lg font-medium hover:bg-blue-800 p-3 rounded-lg transition-all duration-300"
        >
          <FaSignOutAlt className="mr-4 text-xl" />
          Logout
        </a>
      </nav>

      {/* Bottom Footer (Optional) */}
      <div className="absolute bottom-6 left-6 text-sm opacity-70">
        <p>&copy; 2024 Tenapedia. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
