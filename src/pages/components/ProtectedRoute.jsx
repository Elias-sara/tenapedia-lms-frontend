// import React, { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // Correct import for useAuth hook
// import { useRouter } from 'next/router';

// const ProtectedRoute = ({ children }) => {
//   const { authData, loading } = useAuth(); // Access both authData and loading from context
//   const router = useRouter();

//   useEffect(() => {
//     if (!authData?.token) {
//       router.push('/login'); // Redirect to login if token is missing
//     }
//   }, [authData, router]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading spinner if data is loading
//   }

//   if (!authData?.token) {
//     return <div>You need to log in first!</div>; // If no token, show this message
//   }

//   return children; // Render children if user is authenticated
// };

// export default ProtectedRoute;
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

// ProtectedRoute component that restricts access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authData.token) {
      router.push("/login"); // Redirect to login page if no token is found
    }
  }, [authData, router]);

  if (!authData.token) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }

  return children; // Render protected content if authenticated
};

export default ProtectedRoute;
