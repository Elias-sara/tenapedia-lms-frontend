// import axios from "axios";
// import { getToken } from "../../utils/auth";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // Backend URL
// });

// API.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;
const API_URL = "http://localhost:5000/api/auth";

const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error("Login service error:", error.message);
    return { error: error.message };
  }
};

export default { login };
