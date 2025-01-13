import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const CourseImagePlaceholder = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <FaGraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Course Image</p>
      </div>
    </div>
  );
};

export default CourseImagePlaceholder; 