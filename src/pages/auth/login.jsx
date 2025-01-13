import React, { useState, useEffect, useContext } from "react"; 
import { useRouter } from "next/router"; 
import { toast } from "react-toastify"; 
import { setAuthToken } from "../../utils/auth"; 
import loginService from '../../services/login.service';  // Adjust path if necessary
import { AuthContext } from '../../context/AuthContext'; // Ensure correct import
import Cookies from 'js-cookie'; // Import js-cookie

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Accessing AuthContext, ensure it's wrapped properly and handle undefined context
  const { authData, setAuthContextData } = useContext(AuthContext) || {}; 

  useEffect(() => {
    // Only redirect if we're not in a loading state and have auth data
    if (!authData?.loading && authData?.token) {
      handleRoleRedirection(authData.user.role);
    }
  }, [authData, router]);  // authData and router are now dependencies

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRoleRedirection = (role) => {
    console.log("handleRoleRedirection - role:", role); // Log the role for debugging

    switch (role) {
      case 'admin':
        router.push("/admin/dashboard");
        break;
      case 'student':
        router.push("/students/dashboard"); // Fixed: changed from student to students
        break;
      case 'user':
        router.push("/user/dashboard");
        break;
      case 'instructor':
        router.push("/instructor/dashboard");
        break;
      default:
        toast.error("User role not recognized.");
        router.push("/user/dashboard");
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setIsLoading(true);

    try {
      // Clear any existing auth data before login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');

      const response = await loginService.login({ email, password });

      if (response?.token && response?.user && response?.user.role) {
        // Store auth data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('role', response.user.role);

        // Update auth token and context
        setAuthToken(response.token);
        setAuthContextData?.({
          token: response.token,
          user: response.user,
          loading: false
        });

        toast.success("Login successful!");

        // Log auth data for debugging
        console.log('Login successful:', {
          role: response.user.role,
          token: response.token ? 'present' : 'missing',
          user: response.user ? 'present' : 'missing'
        });

        // Redirect based on role
        if (response.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (response.user.role === 'student') {
          router.push('/students/dashboard'); // Fixed: changed from student to students
        } else if (response.user.role === 'instructor') {
          router.push('/instructor/dashboard');
        } else {
          console.error('Unknown role:', response.user.role);
          toast.error('Invalid user role');
        }
      } else {
        console.error('Invalid response:', response);
        toast.error("Login failed: Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed, please try again.");
      // Clear any partial auth data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f4f7fa] to-[#e6f2ff] items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Login Form Section */}
        <div className="p-12 flex items-center bg-white">
          <div className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-[#1a80b6] mb-4">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to continue your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.088 1.696A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a80b6] focus:ring focus:ring-[#1a80b6]/20 transition duration-300"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <a 
                    href="/forgot-password" 
                    className="text-sm text-[#1a80b6] hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full 
                  py-3 
                  bg-[#1a80b6] 
                  text-white 
                  rounded-lg 
                  hover:bg-[#2196f3] 
                  transition 
                  duration-300 
                  transform 
                  hover:scale-[1.02] 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-[#1a80b6] 
                  focus:ring-opacity-50
                  flex 
                  items-center 
                  justify-center
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a 
                    href="/auth/register" 
                    className="text-[#1a80b6] font-semibold hover:underline"
                  >
                    Create Account
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* About Section */}
        <div className="hidden md:flex bg-[#1a80b6] text-white p-12 items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Welcome to Tenapedia</h2>
            <p className="text-lg mb-4 opacity-80">
              Your gateway to continuous learning and professional growth. 
              Discover expert-led courses, connect with mentors, and transform 
              your skills in a collaborative, supportive environment.
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

export default LoginForm;