import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

// ProtectedRoute component that restricts access to authenticated users
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext) || { user: null, loading: true };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // Redirect to login page if no token is found
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }

  if (!user) {
    return null;
  }

  return children; // Render protected content if authenticated
};

ProtectedRoute.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoute;
