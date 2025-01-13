// // src/components/InstructorDashboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// // Register chart components
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// function InstructorDashboard() {
//     const [courseData, setCourseData] = useState([]);
    
//     useEffect(() => {
//         // Fetch course data from API
//         const fetchCourseData = async () => {
//             const res = await axios.get("/api/instructor/courses");
//             setCourseData(res.data);
//         };
//         fetchCourseData();
//     }, []);

//     // Data for course progress chart
//     const data = {
//         labels: courseData.map(course => course.name),
//         datasets: [
//             {
//                 label: 'Course Progress',
//                 data: courseData.map(course => course.progress),
//                 borderColor: 'rgba(75,192,192,1)',
//                 backgroundColor: 'rgba(75,192,192,0.2)',
//                 fill: true,
//             },
//         ],
//     };

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>
//             <div className="course-progress">
//                 <Line data={data} />
//             </div>
//             <h2 className="text-xl mt-4">Manage Your Courses</h2>
//             <div>
//                 <button className="btn btn-primary">Create New Course</button>
//                 <div className="mt-4">
//                     {courseData.map((course) => (
//                         <div key={course.id} className="course-card">
//                             <h3>{course.name}</h3>
//                             <p>{course.description}</p>
//                             <button>Edit</button>
//                             <button>Delete</button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default InstructorDashboard;
