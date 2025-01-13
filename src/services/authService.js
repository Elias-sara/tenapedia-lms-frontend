// const login = async ({ email, password }) => {
//   try {
//     const response = await fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Login failed");
//     }

//     const data = await response.json();  // Contains token and user info
//     localStorage.setItem("token", data.token);  // Store token in localStorage
//     localStorage.setItem("user", JSON.stringify(data.user));  // Store user data

//     return data;
//   } catch (error) {
//     console.error("Login service error:", error.message);
//     setError(error.message);  // Call the setError function from context
//     return { error: error.message };  // Return error message
//   }
// };
