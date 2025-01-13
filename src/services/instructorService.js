// // src/services/instructorService.js

// import { fetchData } from "./api";

// // Create a new course
// const createCourse = async (courseData) => {
//   try {
//     return await fetchData("/courses", "POST", courseData);
//   } catch (error) {
//     console.error("Error creating course:", error);
//     throw error;
//   }
// };

// // Update a specific course
// const updateCourse = async (courseId, courseData) => {
//   try {
//     return await fetchData(`/courses/${courseId}`, "PUT", courseData);
//   } catch (error) {
//     console.error("Error updating course:", error);
//     throw error;
//   }
// };

// // Get students enrolled in a course
// const getStudentsInCourse = async (courseId) => {
//   try {
//     return await fetchData(`/courses/${courseId}/students`);
//   } catch (error) {
//     console.error("Error fetching students in course:", error);
//     throw error;
//   }
// };

// export { createCourse, updateCourse, getStudentsInCourse };
