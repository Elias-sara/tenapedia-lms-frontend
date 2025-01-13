import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../components/Sidebar"; // Adjust path if needed
import NavBar from "../components/NavBar"; // Adjust path if needed

const DashboardLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-48" : "ml-16"
        }`}
      >
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavBar toggleSidebar={toggleSidebar} />
        </div>
        <main className="pt-16 p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
