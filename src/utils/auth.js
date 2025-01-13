import axios from "axios";

// Set auth token to Axios headers and store it in localStorage
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Get auth data from localStorage (token and user)
export const getAuthData = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  // Ensure axios headers are set if token exists
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  return { token, user: user ? JSON.parse(user) : null };
};

// Store auth data (token and user) in localStorage
export const setAuthData = (token, user) => {
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Remove auth data (token and user) from localStorage
export const removeAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  delete axios.defaults.headers.common['Authorization'];
};
