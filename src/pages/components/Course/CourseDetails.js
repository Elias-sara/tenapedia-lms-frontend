// components/Course/CourseDetails.js
import React from 'react';
import PropTypes from 'prop-types';

const CourseDetails = ({ course = {} }) => {
  const {
    title = 'Untitled Course',
    description = 'No description available',
    instructor = 'Unknown',
    duration = 'N/A',
    difficulty = 'N/A',
    modules = []
  } = course;

  return (
    <div className="course-details">
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="course-metadata">
        <p>Instructor: {instructor}</p>
        <p>Duration: {duration}</p>
        <p>Difficulty: {difficulty}</p>
      </div>
      <div className="course-modules">
        <h2>Course Modules</h2>
        {modules.length === 0 ? (
          <p>No modules available</p>
        ) : (
          <ul>
            {modules.map((module, index) => (
              <li key={module.id || index}>
                {module.title || `Module ${index + 1}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

CourseDetails.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.string,
    duration: PropTypes.string,
    difficulty: PropTypes.string,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string
      })
    )
  })
};

CourseDetails.defaultProps = {
  course: {}
};

export default CourseDetails;
