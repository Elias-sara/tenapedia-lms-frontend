const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/auth";

const register = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  role,
}) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration service error:", error.message);
    return { error: error.message };
  }
};

export default { register };
