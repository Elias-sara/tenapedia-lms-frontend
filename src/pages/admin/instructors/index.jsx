// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';  // No need for toast.configure() anymore
// import 'react-toastify/dist/ReactToastify.css';

// const InstructorsPage = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [newInstructor, setNewInstructor] = useState({ name: '', email: '', bio: '' });
//   const [editInstructor, setEditInstructor] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch all instructors from API
//   const fetchInstructors = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('authToken');
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/instructors`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(response.data); // Log the response data to ensure it's coming back correctly
//       setInstructors(response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to fetch instructors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInstructors();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editInstructor) {
//       setEditInstructor((prev) => ({ ...prev, [name]: value }));
//     } else {
//       setNewInstructor((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Add a new instructor
//   const handleAddInstructor = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('authToken');
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/instructor`, newInstructor, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setInstructors((prev) => [...prev, response.data]);
//       setNewInstructor({ name: '', email: '', bio: '' });
//       toast.success('Instructor added successfully');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to add instructor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit an existing instructor
//   const handleEditInstructor = (instructor) => {
//     setEditInstructor(instructor);
//   };

//   // Update instructor data
//   const handleUpdateInstructor = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('authToken');
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/instructor/${editInstructor._id}`,
//         editInstructor,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setInstructors((prev) =>
//         prev.map((instructor) =>
//           instructor._id === editInstructor._id ? response.data : instructor
//         )
//       );
//       setEditInstructor(null);
//       toast.success('Instructor updated successfully');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to update instructor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete an instructor
//   const handleDeleteInstructor = async (id) => {
//     if (window.confirm('Are you sure you want to delete this instructor?')) {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('authToken');
//         await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/instructor/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setInstructors((prev) => prev.filter((instructor) => instructor._id !== id));
//         toast.success('Instructor deleted successfully');
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Failed to delete instructor');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Instructors</h1>

//       {/* Add or Edit Instructor Form */}
//       <div className="bg-white p-4 shadow-md rounded-md mb-6">
//         <h2 className="text-xl font-semibold mb-2">
//           {editInstructor ? 'Edit Instructor' : 'Add New Instructor'}
//         </h2>
//         <form onSubmit={editInstructor ? handleUpdateInstructor : handleAddInstructor} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Instructor Name"
//             value={editInstructor ? editInstructor.name : newInstructor.name}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Instructor Email"
//             value={editInstructor ? editInstructor.email : newInstructor.email}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//           <textarea
//             name="bio"
//             placeholder="Instructor Bio"
//             value={editInstructor ? editInstructor.bio : newInstructor.bio}
//             onChange={handleInputChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             required
//           ></textarea>
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Processing...' : editInstructor ? 'Update' : 'Add'} Instructor
//             </button>
//             {editInstructor && (
//               <button
//                 type="button"
//                 onClick={() => setEditInstructor(null)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Instructors List */}
//       <div className="bg-white p-4 shadow-md rounded-md">
//         <h2 className="text-xl font-semibold mb-2">Instructors List</h2>
//         {loading ? (
//           <p>Loading instructors...</p>
//         ) : instructors.length === 0 ? (
//           <p>No instructors found</p>
//         ) : (
//           <ul className="space-y-4">
//             {instructors.map((instructor) => (
//               <li
//                 key={instructor._id}
//                 className="flex justify-between items-center p-4 border border-gray-300 rounded-md"
//               >
//                 <div>
//                   <h3 className="text-lg font-semibold">{instructor.name}</h3>
//                   <p>{instructor.email}</p>
//                   <p className="text-sm text-gray-600">{instructor.bio}</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEditInstructor(instructor)}
//                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteInstructor(instructor._id)}
//                     className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstructorsPage;
import React from "react";
import MainLayout from "../../../layouts/MainLayout";

const InstructorsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Manage Instructors</h1>
        <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed">
          Assign and manage instructors.
        </p>
        {/* Add your Instructors management components here */}
      </div>
    </MainLayout>
  );
};

export default InstructorsPage;
