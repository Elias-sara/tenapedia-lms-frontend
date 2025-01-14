import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const UseAuthStatePage = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const user = token ? JSON.parse(localStorage.getItem('user')) : null;

      setAuthState({
        isAuthenticated: !!token,
        user,
        loading: false
      });

      if (!token) {
        router.push('/login');
      }
    };

    checkAuthStatus();
  }, [router]);

  return (
    <div>
      <h1>Authentication State</h1>
      {authState.loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          Authentication Status: {authState.isAuthenticated ? 'Logged In' : 'Not Authenticated'}
        </p>
      )}
    </div>
  );
};

export default UseAuthStatePage;
