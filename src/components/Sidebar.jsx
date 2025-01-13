// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";

// const Sidebar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear authentication data (Example: localStorage.removeItem("authToken"))
//     router.push("/instructor");
//   };

//   return (
//     <div className="h-screen flex bg-gray-800 text-white">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-600 p-6">
//         <h2 className="text-2xl font-semibold mb-6">Instructor Portal</h2>

//         {/* Sidebar Links */}
//         <nav className="flex flex-col space-y-4">
//           <Link href="/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-all">
//             Dashboard
//           </Link>
//           <Link href="/profile" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-all">
//             Profile
//           </Link>
//           <Link href="/settings" className="hover:bg-blue-700 px-4 py-2 rounded-md transition-all">
//             Settings
//           </Link>

//           {/* Mobile-friendly Logout Button */}
//           <button
//             className="mt-auto bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </nav>
//       </div>

//       {/* Main Content Area */}
//       {/* <div className="flex-1 p-6 bg-gray-100"> */}
//         {/* The content of the page goes here */}
//         {/* <h1 className="text-3xl font-semibold">Welcome to the Instructor Dashboard</h1> */}
//         {/* <p className="text-lg text-gray-700">Here you can manage courses, students, and more.</p> */}
//       {/* </div> */}
//     </div>
//   );
// };

// export default Sidebar;
