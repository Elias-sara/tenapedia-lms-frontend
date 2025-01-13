// // src/components/CourseDetail.js
// import React from "react";
// import PropTypes from "prop-types";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import Button from "./Button"; // Assuming you have a Button component for interactions

// const CourseDetail = ({
//   course,
//   instructor = "John Doe",
//   duration = "3 months",
//   price = "Free",
//   rating = 4,
//   image = "/default-course-image.jpg",
// }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto p-6">
//       {/* Course Image */}
//       <img
//         src={image}
//         alt={course.title}
//         className="w-full h-80 object-cover rounded-md mb-6"
//       />

//       {/* Course Title */}
//       <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>

//       {/* Course Description */}
//       <p className="text-gray-600 mt-4 text-lg">{course.description}</p>

//       {/* Instructor and Duration Info */}
//       <div className="flex items-center justify-between mt-6">
//         <div>
//           <h4 className="font-semibold text-gray-700">Instructor:</h4>
//           <p className="text-gray-600">{instructor}</p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-gray-700">Duration:</h4>
//           <p className="text-gray-600">{duration}</p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-gray-700">Price:</h4>
//           <p className="text-gray-600">{price}</p>
//         </div>
//       </div>

//       {/* Course Rating */}
//       <div className="flex items-center mt-6">
//         {Array.from({ length: 5 }, (_, index) => (
//           <span key={index}>
//             {index < rating ? (
//               <FaStar className="text-yellow-500 text-lg" />
//             ) : (
//               <FaRegStar className="text-gray-400 text-lg" />
//             )}
//           </span>
//         ))}
//       </div>

//       {/* Enroll Button */}
//       <div className="mt-8">
//         <Button
//           text="Enroll Now"
//           onClick={() => alert("Enrolled!")}
//           className="py-3 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

// CourseDetail.propTypes = {
//   course: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//   }).isRequired,
//   instructor: PropTypes.string,
//   duration: PropTypes.string,
//   price: PropTypes.string,
//   rating: PropTypes.number,
//   image: PropTypes.string,
// };

// export default CourseDetail;
