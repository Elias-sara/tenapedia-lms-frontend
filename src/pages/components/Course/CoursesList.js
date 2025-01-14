// components/Course/CoursesList.js
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from "next/router";

const CoursesList = ({ courses = [], onEnroll = () => {} }) => {
  const router = useRouter();

  if (!courses || courses.length === 0) {
    return (
      <div className="courses-list-placeholder">
        <p>No courses available</p>
      </div>
    );
  }

  return (
    <div className="courses-list">
      {courses.map((course, index) => (
        <div key={course._id || index}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <button onClick={() => router.push(`/courses/${course._id}`)}>
            View Course
          </button>
          {!course.isEnrolled && (
            <button onClick={() => onEnroll(course._id)}>Enroll</button>
          )}
        </div>
      ))}
    </div>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      isEnrolled: PropTypes.bool
    })
  ),
  onEnroll: PropTypes.func
};

export default CoursesList;
