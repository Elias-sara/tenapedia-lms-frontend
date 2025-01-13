"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  FaBars, 
  FaTimes, 
  FaGraduationCap, 
  FaUserCircle, 
  FaSignInAlt,
  FaBook,
  FaChalkboardTeacher,
  FaQuestionCircle
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { 
      href: "/courses", 
      label: "Courses", 
      icon: FaBook,
      description: "Explore comprehensive medical learning modules"
    },
    { 
      href: "/instructors", 
      label: "Instructors", 
      icon: FaChalkboardTeacher,
      description: "Learn from expert medical professionals"
    },
    { 
      href: "/resources", 
      label: "Resources", 
      icon: FaQuestionCircle,
      description: "Access additional study materials"
    }
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled 
          ? 'bg-gradient-to-r from-white/95 via-white/90 to-[#f0f8ff]/95 shadow-lg backdrop-blur-md' 
          : 'bg-white/95 shadow-md backdrop-blur-md'}
      `}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-3 text-xl font-bold 
            text-[#1a80b6] hover:text-[#fb3467] transition-colors 
            group transform hover:scale-105 active:scale-95"
        >
          <FaGraduationCap 
            className="text-2xl group-hover:rotate-12 transition-transform duration-300" 
          />
          <span className="tracking-tight">Tenapedia</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-2xl text-[#1a80b6] 
            focus:outline-none focus:ring-2 focus:ring-[#1a80b6]/50 
            rounded-full p-2 transform hover:scale-110 active:scale-95 
            transition-transform duration-300
            hover:bg-[#1a80b6]/10 
            flex items-center justify-center
            w-10 h-10"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <nav 
          className={`
            fixed md:static top-16 left-0 w-full md:w-auto 
            bg-white/95 md:bg-transparent 
            shadow-lg md:shadow-none 
            transition-all duration-300 ease-in-out
            ${isMenuOpen 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-full md:opacity-100 md:translate-x-0'}
            md:flex md:items-center md:space-x-6
            rounded-b-xl md:rounded-none
          `}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="group relative"
              >
                <Link 
                  href={item.href} 
                  className="
                    flex items-center gap-2 py-2 px-3 rounded-lg 
                    hover:bg-[#1a80b6]/10 
                    hover:text-[#1a80b6] transition-all duration-300
                    group-hover:text-[#fb3467]
                    transform hover:scale-105 active:scale-95
                  "
                >
                  <item.icon className="text-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="font-medium">{item.label}</span>
                </Link>
                <div 
                  className="
                    hidden md:block absolute left-0 top-full 
                    mt-2 w-64 bg-white/95 shadow-lg rounded-lg 
                    p-4 opacity-0 group-hover:opacity-100 
                    transition-all duration-300 
                    pointer-events-none group-hover:pointer-events-auto
                    border border-gray-100 backdrop-blur-sm
                    transform origin-top scale-95 group-hover:scale-100
                  "
                >
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Mobile Action Buttons */}
          <div className="md:hidden flex flex-col space-y-3 p-4 border-t border-gray-100">
            <Link 
              href="/auth/login" 
              className="
                flex items-center justify-center gap-2 
                bg-transparent border-2 border-[#1a80b6] 
                text-[#1a80b6] px-4 py-2 rounded-lg 
                hover:bg-[#1a80b6] hover:text-white 
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-[#1a80b6]
                transform hover:scale-105 active:scale-95
                hover:shadow-md
                group
              "
            >
              <FaSignInAlt className="text-lg group-hover:animate-pulse" />
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="
                flex items-center justify-center gap-2 
                bg-[#fb3467] text-white 
                px-4 py-2 rounded-lg 
                hover:bg-[#1a80b6] 
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-[#fb3467]
                shadow-md hover:shadow-lg
                transform hover:scale-105 active:scale-95
                group
              "
            >
              <FaUserCircle className="text-lg group-hover:animate-pulse" />
              Register
            </Link>
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/auth/login" 
            className="
              flex items-center gap-2 
              bg-transparent border-2 border-[#1a80b6] 
              text-[#1a80b6] px-4 py-2 rounded-lg 
              hover:bg-[#1a80b6] hover:text-white 
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-[#1a80b6]
              transform hover:scale-105 active:scale-95
              hover:shadow-md
              group
            "
          >
            <FaSignInAlt className="group-hover:animate-pulse" />
            Login
          </Link>
          <Link 
            href="/auth/register" 
            className="
              flex items-center gap-2 
              bg-[#fb3467] text-white 
              px-4 py-2 rounded-lg 
              hover:bg-[#1a80b6] 
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-[#fb3467]
              shadow-md hover:shadow-lg
              transform hover:scale-105 active:scale-95
              group
            "
          >
            <FaUserCircle className="group-hover:animate-pulse" />
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
