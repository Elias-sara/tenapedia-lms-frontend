// // src/components/CourseManagement.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CourseManagement() {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             const res = await axios.get("/api/instructor/courses");
//             setCourses(res.data);
//         };
//         fetchCourses();
//     }, []);

//     const handleDeleteCourse = async (courseId) => {
//         await axios.delete(`/api/instructor/courses/${courseId}`);
//         setCourses(courses.filter(course => course.id !== courseId));
//     };

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Course Management</h1>
//             <div>
//                 <button className="btn btn-primary mb-4">Create New Course</button>
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {courses.map(course => (
//                             <tr key={course.id}>
//                                 <td>{course.name}</td>
//                                 <td>
//                                     <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-danger">Delete</button>
//                                     <button className="btn btn-warning">Edit</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default CourseManagement;
