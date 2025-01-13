import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaBell, FaLock, FaLanguage, FaPalette, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../../components/layouts/StudentLayout';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-blue-900 font-['Inter', sans-serif] text-gray-800 dark:text-gray-100 antialiased">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-3xl hover:scale-[1.01]">
            <div className="p-10 space-y-6">
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight leading-tight drop-shadow-md mb-10">
                Account Settings
              </h1>

              {/* Notifications Section */}
              <div className="mb-12 border-b border-gray-100 dark:border-gray-700 pb-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                  <FaBell className="mr-4 text-blue-500 dark:text-blue-400" />
                  Notifications
                </h2>
                <div className="space-y-6">
                  {Object.keys(notifications).map((key) => (
                    <div 
                      key={key} 
                      className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-4 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center">
                        <FaBell className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="ml-4 text-gray-700 dark:text-gray-300 font-medium capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {key.replace(/([A-Z])/g, ' $1')} Notifications
                        </span>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className="focus:outline-none transform active:scale-95 transition-transform"
                      >
                        {notifications[key] ? (
                          <FaToggleOn className="h-10 w-10 text-blue-600 dark:text-blue-500" />
                        ) : (
                          <FaToggleOff className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Section */}
              <div className="mb-12 border-b border-gray-100 dark:border-gray-700 pb-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                  <FaLock className="mr-4 text-blue-500 dark:text-blue-400" />
                  Privacy
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-4 rounded-xl transition-colors group">
                    <div className="flex items-center">
                      <FaLock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      <span className="ml-4 text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Profile Visibility
                      </span>
                    </div>
                    <select 
                      className="form-select w-48 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                    >
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                  <FaPalette className="mr-4 text-blue-500 dark:text-blue-400" />
                  Preferences
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-4 rounded-xl transition-colors group">
                    <div className="flex items-center">
                      <FaLanguage className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      <span className="ml-4 text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Language
                      </span>
                    </div>
                    <select 
                      className="form-select w-48 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-4 rounded-xl transition-colors group">
                    <div className="flex items-center">
                      <FaPalette className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      <span className="ml-4 text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Theme
                      </span>
                    </div>
                    <select 
                      className="form-select w-48 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                    >
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Settings;