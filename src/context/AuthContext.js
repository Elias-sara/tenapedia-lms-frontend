import React, { createContext, useState, useEffect, useContext } from "react";
import { setAuthToken, removeAuthData, getAuthData } from "../utils/auth";
import { useRouter } from "next/router";
import axios from "axios";
import axiosInstance from '../utils/axiosConfig';

// Create AuthContext to provide auth data and functions
export const AuthContext = createContext();

// AuthProvider component to wrap the app with the context
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: null,
    user: null,
    loading: true
  });
  const [profile, setProfile] = useState(null); // Added profile state
  const router = useRouter();

  // Load the token and user data from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (token && user && role) {
      setAuthData(prev => ({
        ...prev,
        token,
        user: JSON.parse(user),
        loading: false
      }));
      fetchProfile();
    } else {
      setAuthData(prev => ({
        ...prev,
        loading: false
      }));
    }
  }, []);

  // Fetch profile data when the component mounts
  const fetchProfile = async () => {
    try {
      // Get the role from localStorage
      const role = localStorage.getItem('role');
      const user = localStorage.getItem('user');
      
      if (!role && !user) {
        console.error('No authentication data found');
        logout(); // Logout if no auth data is found
        return;
      }

      // Parse user data to get role if not directly available
      const userRole = role || (user ? JSON.parse(user).role : null);
      
      if (!userRole) {
        console.error('No role found in auth data');
        logout();
        return;
      }

      // Log request details for debugging
      console.log('Fetching profile with role:', userRole);

      // Use the profile endpoint - axiosInstance will handle the correct URL
      const response = await axiosInstance.get('profile');
      
      if (response.data) {
        setAuthData(prev => ({
          ...prev,
          user: response.data,
          loading: false
        }));
        setProfile(response.data);
      } else {
        throw new Error('No profile data received');
      }
    } catch (error) {
      console.error('Error fetching profile:', {
        error,
        response: error.response,
        message: error.message,
        role: localStorage.getItem('role'),
        user: localStorage.getItem('user')
      });
      
      setAuthData(prev => ({
        ...prev,
        loading: false
      }));

      // Handle specific error cases
      if (error.response?.status === 403 || error.response?.status === 401) {
        logout();
      }
    }
  };

  // Logout function to clear the authentication data
  const logout = () => {
    setAuthData({ token: null, user: null, loading: false });
    setProfile(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ ...authData, profile, setAuthData, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context data
export const useAuth = () => useContext(AuthContext);
