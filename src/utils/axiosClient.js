// import axios from "axios";
// import { getToken, removeToken } from "./auth";
// import Router from "next/router";

// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
// });

// axiosClient.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       removeToken();
//       Router.push("/login");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
