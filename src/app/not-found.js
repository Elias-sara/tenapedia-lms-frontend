import Link from 'next/link';
import { 
  FaHome, 
  FaExclamationTriangle, 
  FaSearchPlus 
} from 'react-icons/fa';

export default function NotFound() {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-[#006aff] to-[#4d9cff] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-10 text-center relative overflow-hidden">
        {/* Blurred Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        {/* 404 Icon */}
        <div className="mb-12 flex justify-center">
          <FaExclamationTriangle className="w-28 h-28 text-[#fb3467] animate-bounce" />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 
          bg-clip-text text-transparent bg-gradient-to-r from-[#006aff] to-[#fb3467]">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off the learning path. 
          Don't worry, we'll help you find your way back.
        </p>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 
            border border-transparent text-base font-semibold rounded-lg 
            text-white bg-[#006aff] hover:bg-[#fb3467] 
            transition duration-300 transform hover:scale-105 shadow-md"
          >
            <FaHome className="mr-2" /> Return to Home
          </Link>
          
          <Link
            href="/resources"
            className="w-full inline-flex items-center justify-center px-6 py-3 
            border-2 border-[#006aff] text-[#006aff] bg-white 
            hover:bg-[#006aff] hover:text-white 
            text-base font-semibold rounded-lg 
            transition duration-300 transform hover:scale-105 shadow-md"
          >
            <FaSearchPlus className="mr-2" /> Explore Resources
          </Link>
        </div>

        {/* Additional Help */}
        <p className="mt-8 text-sm text-gray-500">
          Still can't find what you're looking for? 
          <Link 
            href="/contact" 
            className="ml-1 text-[#006aff] hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    // </div>
  );
}
