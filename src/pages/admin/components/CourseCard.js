import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const CourseCard = ({ course = {} }) => {
  const {
    title = 'Untitled Course',
    description = 'No description available',
    instructor = 'Unknown',
    duration = 'N/A',
    difficulty = 'N/A',
    imageUrl = '/default-course-image.png'
  } = course;

  return (
    <div className="course-card">
      <img 
        src={imageUrl} 
        alt={`${title} course image`} 
        className="course-card-image" 
      />
      <div className="course-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="course-card-metadata">
          <p>Instructor: {instructor}</p>
          <p>Duration: {duration}</p>
          <p>Difficulty: {difficulty}</p>
        </div>
        <div className="course-card-actions">
          <Link href={`/admin/courses/${course._id}`}>
            <button>Edit Course</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.string,
    duration: PropTypes.string,
    difficulty: PropTypes.string,
    imageUrl: PropTypes.string
  })
};

export default CourseCard;
