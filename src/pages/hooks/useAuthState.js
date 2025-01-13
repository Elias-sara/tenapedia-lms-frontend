// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../context/AuthContext"; // Import from context

// const useAuthState = () => {
//   const { token, setAuthData } = useAuth(); // Use context instead of local state
//   const [loading, setLoading] = useState(true); // For loading state handling
//   const router = useRouter();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");

//     if (storedToken) {
//       setAuthData({ token: storedToken, loading: false }); // Set token from localStorage in context
//     } else {
//       setAuthData({ token: null, loading: false }); // Clear if no token
//       router.push("/login"); // Redirect if token doesn't exist
//     }
//   }, [router, setAuthData]);

//   if (loading) {
//     return <div>Loading...</div>; // Provide a loading spinner or return null
//   }

//   return token;
// };

// export default useAuthState;
