// // src/services/adminService.js

// import { fetchData } from "./api";

// // Get a list of all users (students and instructors)
// const getAllUsers = async () => {
//   try {
//     return await fetchData("/admin/users");
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// // Get a list of all courses
// const getAllCourses = async () => {
//   try {
//     return await fetchData("/admin/courses");
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     throw error;
//   }
// };

// // Delete a course
// const deleteCourse = async (courseId) => {
//   try {
//     return await fetchData(`/admin/courses/${courseId}`, "DELETE");
//   } catch (error) {
//     console.error("Error deleting course:", error);
//     throw error;
//   }
// };

// // Create a new user (e.g., for admin purposes)
// const createUser = async (userData) => {
//   try {
//     return await fetchData("/admin/users", "POST", userData);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// export { getAllUsers, getAllCourses, deleteCourse, createUser };
