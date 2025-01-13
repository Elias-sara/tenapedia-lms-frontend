// // src/pages/admin/modules.js
// import React, { useState, useEffect } from "react";
// import MainLayout from "layouts/MainLayout";

// const ManageModules = () => {
//   const [modules, setModules] = useState([]);

//   useEffect(() => {
//     const fetchModules = async () => {
//       const response = await fetch("/api/modules");
//       const data = await response.json();
//       setModules(data);
//     };

//     fetchModules();
//   }, []);

//   return (
//     <MainLayout>
//       <h1 className="text-4xl font-bold text-center mt-8">Manage Modules</h1>
//       <div className="mt-8 text-center">
//         <button className="bg-blue-500 text-white p-2 rounded">Add New Module</button>
//       </div>
//       <table className="min-w-full mt-8 table-auto">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">Module Name</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {modules.map((module) => (
//             <tr key={module.id}>
//               <td className="px-4 py-2 border">{module.name}</td>
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

// export default ManageModules;
import React from "react";
import MainLayout from "../../../layouts/MainLayout";

const ModulesPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Manage Modules</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Create, update, or delete learning modules.
        </p>
        {/* Add your Modules management components here */}
      </div>
    </MainLayout>
  );
};

export default ModulesPage;
