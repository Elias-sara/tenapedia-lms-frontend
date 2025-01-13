// // Function to check if the user is logged in by checking if a JWT exists in localStorage
// export const isAuthenticated = () => {
//   // Check if JWT token exists in localStorage
//   const token = localStorage.getItem("token");
//   return token ? true : false;
// };

// // Function to get the JWT token from localStorage
// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// // Function to set the JWT token in localStorage
// export const setToken = (token) => {
//   localStorage.setItem("token", token);
// };

// // Function to remove the JWT token from localStorage (log out)
// export const removeToken = () => {
//   localStorage.removeItem("token");
// };

// // Function to check if the token is still valid (you can call this function when needed, for example after login)
// export const isTokenValid = () => {
//   const token = getToken();

//   if (!token) {
//     return false;
//   }

//   const decodedToken = decodeToken(token); // Decode JWT to check its expiration

//   // If the token is expired, return false
//   if (decodedToken.exp < Date.now() / 1000) {
//     removeToken();
//     return false;
//   }

//   return true;
// };

// // Decode JWT (optional helper function to read the JWT payload)
// export const decodeToken = (token) => {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// };
