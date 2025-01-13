import React from "react";
import { useRouter } from "next/router";
import {
  FaHome,
  FaBook,
  FaUserGraduate,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/user/dashboard" },
    { name: "Courses", icon: <FaBook />, path: "/courses" },
    { name: "Profile", icon: <FaUserGraduate />, path: "/user/Profile" },
    { name: "Settings", icon: <FaCog />, path: "/user/Setting" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white text-gray-800 shadow-lg flex flex-col pt-16 transition-all duration-300 border-r ${
        isOpen ? "w-48 rounded-r-3xl" : "w-14 rounded-r-full"
      }`}
    >
      <nav className="flex-1 overflow-y-auto mt-10 px-2">
        {menuItems.map(({ name, icon, path }) => (
          <Link
            key={name}
            href={path}
            className={`flex items-center mt-4 py-2 px-3 transition-all duration-200 ${
              router.pathname === path
                ? "bg-indigo-600 text-white shadow-lg rounded-full px-4 py-2" // Active link in oval shape
                : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600 rounded-lg px-3 py-2"
            }`}
          >
            <div
              className={`text-xl ${
                router.pathname === path
                  ? "text-yellow-300" // Highlighted color for active icon
                  : "text-gray-500 hover:text-indigo-500"
              } transition-colors duration-200`}
            >
              {icon}
            </div>
            <span className={`ml-4 text-sm ${!isOpen && "hidden"}`}>
              {name}
            </span>
          </Link>
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full py-2 text-gray-600 hover:text-red-500 rounded-lg transition-colors duration-200"
        >
          <FaSignOutAlt className="text-lg" />
          <span className={`${!isOpen && "hidden"} ml-4`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
