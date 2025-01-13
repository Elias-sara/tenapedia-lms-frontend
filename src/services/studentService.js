// // src/services/studentService.js

// import { fetchData } from "./api";

// // Get all courses available for students
// const getCourses = async () => {
//   try {
//     return await fetchData("/courses");
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     throw error;
//   }
// };

// // Enroll in a specific course
// const enrollInCourse = async (courseId) => {
//   try {
//     return await fetchData(`/courses/enroll/${courseId}`, "POST");
//   } catch (error) {
//     console.error("Error enrolling in course:", error);
//     throw error;
//   }
// };

// // Get the progress of a student in a specific course
// const getCourseProgress = async (courseId) => {
//   try {
//     return await fetchData(`/progress/${courseId}`);
//   } catch (error) {
//     console.error("Error fetching course progress:", error);
//     throw error;
//   }
// };

// export { getCourses, enrollInCourse, getCourseProgress };
