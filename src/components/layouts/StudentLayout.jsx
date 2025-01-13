import React from 'react';
import { useRouter } from 'next/router';
import { FaBook, FaChalkboardTeacher, FaUserGraduate, FaCog } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const StudentLayout = ({ children }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const navigationItems = [
    {
      icon: FaBook,
      text: 'Overview',
      path: '/students/dashboard',
      active: router.pathname === '/students/dashboard'
    },
    {
      icon: FaChalkboardTeacher,
      text: 'My Courses',
      path: '/students/courses',
      active: router.pathname === '/students/courses'
    },
    {
      icon: FaUserGraduate,
      text: 'Profile',
      path: '/students/profile',
      active: router.pathname === '/students/profile'
    },
    {
      icon: FaCog,
      text: 'Settings',
      path: '/students/settings',
      active: router.pathname === '/students/settings'
    }
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-600 to-blue-500">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800/95 text-white flex flex-col shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-center p-6 text-2xl font-extrabold border-b border-gray-700">
          <span className="text-yellow-400">Student</span>
          <span className="ml-2">Portal</span>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-200 group
                      ${item.active ? 'bg-blue-600/80' : 'hover:bg-blue-600/80'}`}
                  >
                    <Icon 
                      className={`w-5 h-5 mr-3 transition-colors
                        ${item.active ? 'text-yellow-400' : 'group-hover:text-yellow-400'}`}
                    />
                    <span className={`transition-transform ${!item.active && 'group-hover:translate-x-1'}`}>
                      {item.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/90 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default StudentLayout; 