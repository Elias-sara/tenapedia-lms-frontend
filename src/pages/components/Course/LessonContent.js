// components/Course/LessonContent.js
import React from 'react';
import PropTypes from 'prop-types';

const LessonContent = ({ lesson = {} }) => {
  const {
    title = 'Untitled Lesson',
    content = 'No content available',
    videoUrl = null,
    resources = []
  } = lesson;

  return (
    <div className="lesson-content">
      <h2>{title}</h2>
      <div className="lesson-description">
        <p>{content}</p>
      </div>

      {videoUrl && (
        <div className="lesson-video">
          <iframe 
            src={videoUrl} 
            title={title} 
            width="100%" 
            height="400px" 
            allowFullScreen 
          />
        </div>
      )}

      {resources.length > 0 && (
        <div className="lesson-resources">
          <h3>Additional Resources</h3>
          <ul>
            {resources.map((resource, index) => (
              <li key={resource.id || index}>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {resource.name || `Resource ${index + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

LessonContent.propTypes = {
  lesson: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    videoUrl: PropTypes.string,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        url: PropTypes.string
      })
    )
  })
};

export default LessonContent;
