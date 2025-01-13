const API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',  // Important for CORS requests with cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();  // Contains token and user info

    // Store auth data
    if (data.token && data.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role || 'student'); // Default to student if no role
    }

    return data;
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error; // Re-throw to handle in the component
  }
};

export default { login };  // Export the function as an object
