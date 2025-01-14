import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const AdminSectionButtons = ({ sections = [] }) => {
  if (!sections || sections.length === 0) {
    return (
      <div className="admin-sections-placeholder">
        <p>No admin sections available</p>
      </div>
    );
  }

  return (
    <div className="admin-sections-grid">
      {sections.map((section, index) => (
        <Link 
          key={section.link || index} 
          href={section.link || '#'}
          className="admin-section-button"
        >
          <div className="section-content">
            {section.icon && React.createElement(section.icon, { 
              className: section.color || 'text-gray-600' 
            })}
            <h3>{section.title || 'Untitled Section'}</h3>
            <p>{section.description || 'No description'}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

AdminSectionButtons.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
      color: PropTypes.string
    })
  )
};

export default AdminSectionButtons;
