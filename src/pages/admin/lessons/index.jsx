// // src/pages/admin/lessons.js
// import React, { useState, useEffect } from "react";
// import MainLayout from "layouts/MainLayout";

// const ManageLessons = () => {
//   const [lessons, setLessons] = useState([]);

//   useEffect(() => {
//     const fetchLessons = async () => {
//       const response = await fetch("/api/lessons");
//       const data = await response.json();
//       setLessons(data);
//     };

//     fetchLessons();
//   }, []);

//   return (
//     <MainLayout>
//       <h1 className="text-4xl font-bold text-center mt-8">Manage Lessons</h1>
//       <div className="mt-8 text-center">
//         <button className="bg-blue-500 text-white p-2 rounded">Add New Lesson</button>
//       </div>
//       <table className="min-w-full mt-8 table-auto">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">Lesson Title</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lessons.map((lesson) => (
//             <tr key={lesson.id}>
//               <td className="px-4 py-2 border">{lesson.title}</td>
//               <td className="px-4 py-2 border">
//                 <button className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
//                 <button className="text-red-500 hover:text-red-700">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </MainLayout>
//   );
// };

// export default ManageLessons;
import React from "react";
import MainLayout from "../../../layouts/MainLayout";

const LessonsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Manage Lessons</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Create, assign, and manage lessons.
        </p>
        {/* Add your Lessons management components here */}
      </div>
    </MainLayout>
  );
};

export default LessonsPage;
