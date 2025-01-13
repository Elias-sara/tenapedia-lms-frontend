// import React from "react";
// import { useRouter } from "next/router";
// import NavBar from "../components/common/NavBar";
// import Footer from "../components/common/Footer"; // Assuming you have a Footer component

// const MainLayout = ({ children }) => {
//   const router = useRouter(); // Initialize router

//   // Function to handle sign-out
//   const handleSignOut = () => {
//     // Clear localStorage (remove stored auth token or user data)
//     localStorage.removeItem("authToken"); // Adjust according to your key
//     localStorage.removeItem("userData"); // Adjust according to your key

//     // Redirect user to the login page (or another page)
//     router.push("/auth/login"); // Change this to your login page route
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* NavBar */}
//       <NavBar onSignOut={handleSignOut} /> {/* Pass handleSignOut to NavBar */}

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         {children} {/* Renders child components inside this layout */}
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default MainLayout;
// MainLayout.js
import React from "react"; 
import { useRouter } from "next/router"; 
import NavBar from "../components/common/NavBar"; 
import Footer from "../components/common/Footer"; // Assuming you have a Footer component

const MainLayout = ({ children }) => {
  const router = useRouter(); // Initialize router

  // Function to handle sign-out
  const handleSignOut = () => {
    // Clear localStorage (remove stored auth token or user data)
    localStorage.removeItem("authToken"); // Adjust according to your key
    localStorage.removeItem("userData"); // Adjust according to your key

    // Redirect user to the login page (or another page)
    router.push("/auth/login"); // Change this to your login page route
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar */}
      <NavBar onSignOut={handleSignOut} /> {/* Pass handleSignOut to NavBar */}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children} {/* Renders child components inside this layout */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
