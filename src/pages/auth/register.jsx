import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router"; // Import useRouter for navigation
import registerService from "../../services/register.service";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student"); // Default role is student
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerService.register({
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
      });

      if (response.message === "User registered successfully") {
        toast.success("Registration successful!");
        router.push("/auth/login"); // Navigate to the login page after successful registration
      } else {
        toast.error(response.error || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f4f7fa] to-[#e6f2ff] items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Registration Form Section */}
        <div className="p-12 flex items-center bg-white">
          <div className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-[#1a80b6] mb-4">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Join Tenapedia and start your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                  placeholder="+251 (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1a80b6] text-white rounded-lg hover:bg-[#2196f3] transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#1a80b6] focus:ring-opacity-50"
              >
                Create Account
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a 
                  href="/auth/login" 
                  className="text-[#1a80b6] font-semibold hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="hidden md:flex bg-[#1a80b6] text-white p-12 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Welcome to Tenapedia</h2>
            <p className="text-lg mb-4 opacity-80">
              Embark on a transformative learning journey where knowledge knows no boundaries. 
              Whether you're a student, instructor, or professional, Tenapedia is your gateway 
              to continuous growth and meaningful connections.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalized Learning Paths</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Expert-Led Courses</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Community Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
