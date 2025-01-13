// NavBar.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // For navigation after sign out

const NavBar = ({ onSignOut }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checking login status only on the client-side
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    // Clear localStorage, sessionStorage, and cookies (if you're using any)
    localStorage.clear(); // Removes all localStorage data
    sessionStorage.clear(); // Removes all sessionStorage data

    // Clear cookies (if you are using cookies to store authentication info)
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Call any additional sign-out logic passed in as a prop
    if (onSignOut) {
      onSignOut();
    }

    // Optionally redirect user after sign out
    router.push("/auth/login"); // Redirect to login page or homepage
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white text-3xl font-bold">
          Tenapedia
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/courses"
            className="text-white text-lg hover:text-gray-200 transition-all duration-300"
          >
            Courses
          </Link>
          <Link
            href="/profile"
            className="text-white text-lg hover:text-gray-200 transition-all duration-300"
          >
            Profile
          </Link>

          {/* Sign-Out Button (Only visible if user is logged in) */}
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="text-white text-lg hover:text-gray-200 transition-all duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="text-white text-lg hover:text-gray-200 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
