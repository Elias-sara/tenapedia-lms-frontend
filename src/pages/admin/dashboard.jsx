// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import MainLayout from "../../layouts/MainLayout";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { FaUser, FaBook, FaChartBar, FaCogs, FaChalkboardTeacher, FaClipboardList, FaUserCog } from "react-icons/fa";
// import "../../styles/globals.css";

// const adminSections = [
//   { icon: FaUser, title: "Manage Users", description: "View and manage all registered users.", link: "/admin/users", color: "text-indigo-600" },
//   { icon: FaBook, title: "Manage Courses", description: "Create, update, or delete courses.", link: "/admin/courses", color: "text-green-500" },
//   { icon: FaChartBar, title: "Reports", description: "View performance and usage reports.", link: "/admin/reports", color: "text-purple-600" },
//   { icon: FaCogs, title: "Settings", description: "Configure platform settings and preferences.", link: "/admin/settings", color: "text-teal-600" },
//   { icon: FaChalkboardTeacher, title: "Manage Instructors", description: "Assign and manage instructors.", link: "/admin/instructors", color: "text-blue-600" },
//   { icon: FaClipboardList, title: "Manage Modules", description: "Create, update, or delete learning modules.", link: "/admin/modules", color: "text-orange-500" },
//   { icon: FaUserCog, title: "Manage Lessons", description: "Create, assign, and manage lessons.", link: "/admin/lessons", color: "text-teal-600" },
// ];

// const AdminDashboard = () => {
//   const { token, user } = useContext(AuthContext); // Access auth context
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       router.push("/auth/login"); // Redirect non-authenticated users
//     } else if (user?.role !== "admin") {
//       router.push("/auth/login"); // Redirect non-admin users
//     } else {
//       setLoading(false); // Allow admin to access the dashboard
//     }
//   }, [token, user, router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin border-t-4 border-blue-500 rounded-full h-12 w-12"></div> {/* Loading spinner */}
//       </div>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">Admin Dashboard</h1>
//         <p className="text-lg text-center text-gray-600 mb-8">
//           Welcome to the admin panel. Here you can manage users, courses, lessons, instructors, and more.
//         </p>
//         <nav>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
//             {adminSections.map(({ icon: Icon, title, description, link, color }, index) => (
//               <li
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
//               >
//                 <Link href={link} passHref>
//                   <div className="flex items-center justify-center space-x-2 text-2xl font-semibold text-blue-600 hover:text-blue-800">
//                     <Icon className={`text-3xl ${color}`} />
//                     <span>{title}</span>
//                   </div>
//                 </Link>
//                 <p className="text-gray-500 mt-2">{description}</p>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </MainLayout>
//   );
// };

// export default AdminDashboard;
import React, { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../../context/AuthContext";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { FaUser, FaBook, FaChartBar, FaCogs, FaChalkboardTeacher, FaClipboardList, FaUserCog, FaClipboard, FaBell, FaShieldAlt, FaDatabase, FaKey, FaCog, FaLock } from "react-icons/fa";
import AdminSectionButtons from "./components/AdminSectionButtons";
import "../../styles/globals.css";

const adminSections = [
  { icon: FaUser, title: "Manage Users", description: "View and manage all registered users.", link: "/admin/users", color: "text-indigo-600" },
  { icon: FaBook, title: "Manage Courses", description: "Create, update, or delete courses.", link: "/admin/courses", color: "text-green-500" },
  { icon: FaChartBar, title: "Reports", description: "View performance and usage reports.", link: "/admin/reports", color: "text-purple-600" },
  { icon: FaCogs, title: "Settings", description: "Configure platform settings and preferences.", link: "/admin/settings", color: "text-teal-600" },
  { icon: FaChalkboardTeacher, title: "Manage Instructors", description: "Assign and manage instructors.", link: "/admin/instructors", color: "text-blue-600" },
  { icon: FaClipboardList, title: "Manage Modules", description: "Create, update, or delete learning modules.", link: "/admin/modules", color: "text-orange-500" },
  { icon: FaUserCog, title: "Manage Lessons", description: "Create, assign, and manage lessons.", link: "/admin/lessons", color: "text-teal-600" },
  { icon: FaClipboard, title: "Audit Logs", description: "View logs of user actions and system changes.", link: "/admin/audit-logs", color: "text-gray-600" },
  { icon: FaUserCog, title: "Manage User Roles", description: "Assign and manage user roles and permissions.", link: "/admin/user-roles", color: "text-pink-600" },
  { icon: FaChartBar, title: "Advanced Reports", description: "Detailed reports on user engagement, performance, and usage.", link: "/admin/advanced-reports", color: "text-yellow-500" },
  { icon: FaBell, title: "Manage Notifications", description: "Create, update, or delete user notifications.", link: "/admin/notifications", color: "text-red-600" },
  { icon: FaShieldAlt, title: "Content Moderation", description: "Approve, reject, or flag user-submitted content.", link: "/admin/content-moderation", color: "text-blue-700" },
  { icon: FaDatabase, title: "Backup & Restore", description: "Take system backups or restore previous states.", link: "/admin/backup-restore", color: "text-teal-700" },
  { icon: FaKey, title: "API Access", description: "Manage API keys and integrations with third-party applications.", link: "/admin/api-access", color: "text-indigo-700" },
  { icon: FaCog, title: "System Configuration", description: "Configure platform settings, appearance, and preferences.", link: "/admin/system-settings", color: "text-gray-500" },
  { icon: FaLock, title: "Security Settings", description: "Manage platform security settings including 2FA and IP restrictions.", link: "/admin/security-settings", color: "text-red-700" },
];

const AdminDashboard = () => {
  const { token, user } = useContext(AuthContext); // Access auth context
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login"); // Redirect non-authenticated users
    } else if (user?.role !== "admin") {
      router.push("/auth/login"); // Redirect non-admin users
    } else {
      setLoading(false); // Allow admin to access the dashboard
    }
  }, [token, user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin border-t-4 border-blue-500 rounded-full h-12 w-12"></div> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Admin Dashboard</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Welcome to the admin panel. Here you can manage users, courses, lessons, instructors, and more. Get started by selecting a section below.
        </p>
        {/* Use the reusable AdminSectionButtons component */}
        <AdminSectionButtons sections={adminSections} />
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
