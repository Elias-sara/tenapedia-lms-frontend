// import React from "react";
// import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import Link from "next/link";

// const NavBar = ({ toggleSidebar }) => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="w-full bg-white shadow-sm fixed top-0 left-0 z-40">
//       <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 h-16">
//         {/* Align the hamburger menu (FaBars) with the sidebar */}
//         <button
//           onClick={toggleSidebar}
//           className="text-gray-600 hover:text-indigo-500 absolute left-4"
//         >
//           <FaBars className="w-6 h-6" />
//         </button>

//         {/* Logo/Text Section */}
//         <div className="flex items-center justify-center space-x-3 md:ml-0 w-full">
//           <img
//             src="/tenapedia.svg"
//             alt="Tenapedia Logo"
//             className="w-16 h-auto"
//           />
//         </div>

//         {/* Navigation links */}
//         <div className="hidden md:flex space-x-3">
//           <Link
//             href="/courses"
//             className="text-gray-600 hover:text-indigo-500 text-sm"
//           >
//             Courses
//           </Link>
//           <Link
//             href="/user/Profile"
//             className="text-gray-600 hover:text-indigo-500 text-sm"
//           >
//             Profile
//           </Link>
//         </div>

//         {/* Notification and User Profile Section with additional gap */}
//         <div className="flex items-center space-x-6 ml-6">
//           {" "}
//           {/* Added ml-6 for left margin */}
//           <FaBell className="w-5 h-5 text-gray-600 hover:text-indigo-500" />
//           <FaUserCircle className="w-5 h-5 text-gray-600 hover:text-indigo-500" />
//           {user && (
//             <button
//               onClick={logout}
//               className="text-gray-600 hover:text-red-500 text-sm"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;
import React, { useMemo } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Memoize the logout function to prevent unnecessary re-renders
  const memoizedLogout = useMemo(() => logout, [logout]);

  return (
    <div className="w-full bg-white shadow-lg fixed top-0 left-0 z-40 rounded-b-3xl ml-39">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 h-16">
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-indigo-500 rounded-full p-2 transition-all duration-300"
        >
          <FaBars className="w-6 h-6" />
        </button>

        {/* Logo Section with Link */}
        <div className="flex items-center justify-center space-x-3 md:ml-0 w-full">
          <Link href="/">
            <img
              src="/tenapedia.svg"
              alt="Tenapedia Logo"
              className="w-16 h-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 ml-6">
          <Link
            href="/courses"
            className={`text-sm flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              router.pathname === "/courses"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/user/Profile"
            className={`text-sm flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              router.pathname === "/user/Profile"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
            }`}
          >
            Profile
          </Link>
        </div>

        {/* Notification & User Profile Section */}
        <div className="flex items-center space-x-6 ml-6">
          <FaBell className="w-5 h-5 text-gray-600 hover:text-indigo-500 cursor-pointer rounded-full p-1 transition-all duration-300" />
          <FaUserCircle className="w-5 h-5 text-gray-600 hover:text-indigo-500 cursor-pointer rounded-full p-1 transition-all duration-300" />
          <div className="flex items-center">
            {user ? (
              <button
                onClick={memoizedLogout}
                className="text-gray-600 hover:text-red-500 text-sm rounded-full p-2 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 hover:text-indigo-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
