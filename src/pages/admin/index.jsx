import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUser, FaBook, FaChartBar, FaCogs, FaChalkboardTeacher, FaClipboardList, FaUserCog } from "react-icons/fa";
import "../../styles/globals.css";

const adminSections = [
  {
    icon: FaUser,
    title: "Manage Users",
    description: "View and manage all registered users.",
    link: "/admin/users",
    color: "text-indigo-600",
  },
  {
    icon: FaBook,
    title: "Manage Courses",
    description: "Create, update, or delete courses.",
    link: "/admin/courses",
    color: "text-green-500",
  },
  {
    icon: FaChartBar,
    title: "Reports",
    description: "View performance and usage reports.",
    link: "/admin/reports",
    color: "text-purple-600",
  },
  {
    icon: FaCogs,
    title: "Settings",
    description: "Configure platform settings and preferences.",
    link: "/admin/settings",
    color: "text-teal-600",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Manage Instructors",
    description: "Assign and manage instructors.",
    link: "/admin/instructors",
    color: "text-blue-600",
  },
  {
    icon: FaClipboardList,
    title: "Manage Modules",
    description: "Create, update, or delete learning modules.",
    link: "/admin/modules",
    color: "text-orange-500",
  },
  {
    icon: FaUserCog,
    title: "Manage Lessons",
    description: "Create, assign, and manage lessons.",
    link: "/admin/lessons",
    color: "text-teal-600",
  },
];

const AdminDashboard = () => {
  const { authData } = useContext(AuthContext); // Access auth context
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is not authenticated or does not have the admin role
    if (!authData?.token || authData?.user?.role !== "admin") {
      router.push("/auth/login"); // Redirect non-admin users to login
    } else {
      setLoading(false); // Allow admin to access the dashboard
    }
  }, [authData, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">Admin Dashboard</h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Welcome to the admin panel. Here you can manage users, courses, lessons, instructors, and more.
          </p>
          <nav>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {adminSections.map(({ icon: Icon, title, description, link, color }, index) => (
                <li
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  {/* Updated Link usage without the <a> tag inside */}
                  <Link href={link} passHref>
                    <div className="flex items-center justify-center space-x-2 text-2xl font-semibold text-blue-600 hover:text-blue-800">
                      <Icon className={`text-3xl ${color}`} />
                      <span>{title}</span>
                    </div>
                  </Link>
                  <p className="text-gray-500 mt-2">{description}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </MainLayout>
    </DashboardLayout>
  );
};

export default AdminDashboard;
