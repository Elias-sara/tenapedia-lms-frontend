"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa"; // Import an icon for the dropdown
import "../../styles/globals.css";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef(null); // Reference to the dropdown for detecting clicks outside

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if click is outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle link click to refresh the page
  const handleLinkClick = (href) => {
    window.location.href = href; // Change the location and trigger a page refresh
  };

  return (
    <header className="w-full bg-white text-gray-800 shadow-lg">
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/tenapedia.svg"
              alt="Tenapedia Logo"
              width="100"
              height="50"
              className="mr-2"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg font-normal">
          <li>
            <Link href="/medical-education" className="hover:text-purple-500">
              Medical Education
            </Link>
          </li>
          <li>
            <Link href="/medical" className="hover:text-purple-500">
              Medical®
            </Link>
          </li>

          {/* More Links Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:text-purple-500"
            >
              <span>More Links</span>
              <FaCaretDown /> {/* Icon for dropdown */}
            </button>
            {isDropdownOpen && (
              <ul className=" absolute bg-white shadow-lg  text-left">
                <li>
                  <button
                    onClick={() => handleLinkClick("/reviews")}
                    className="block px-3 py-1"
                  >
                    Review
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/about")}
                    className="block px-3 py-1"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/contact")}
                    className="block px-3 py-1"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/faq")}
                    className="block px-3 py-1"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/blog")}
                    className="block px-3 py-1"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marketing-materials")}
                    className="block px-3 py-1"
                  >
                    Materials
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/resources" className="hover:text-purple-500">
              Resources
            </Link>
          </li>
          <li>
            <Link href="/instructors" className="hover:text-purple-500">
              Instructors
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-purple-500">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/testimonials" className="hover:text-purple-500">
              Testimonials
            </Link>
          </li>

          <li>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="border-2 border-[#1a80b6] text-[#1a80b6] py-1 px-4 rounded-full text-sm font-normal hover:bg-[#fb3466] hover:text-white transition duration-300"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="bg-[#fb3466] text-white py-2 px-6 rounded-full text-sm font-extrabold hover:bg-[#1a80b6] transition duration-300 transform hover:scale-105"
              >
                Join for Free
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
