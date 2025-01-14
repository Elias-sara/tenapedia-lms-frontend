// components/Course/ModuleList.js
import React from 'react';
import PropTypes from 'prop-types';

const ModuleList = ({ 
  modules = [], 
  selectedModule = null, 
  onSelectModule = () => {} 
}) => {
  if (!modules || modules.length === 0) {
    return (
      <div className="module-list-placeholder">
        <p>No modules available</p>
      </div>
    );
  }

  return (
    <div className="module-list">
      {modules.map((module, index) => (
        <div 
          key={module._id || index} 
          className={`module-item ${selectedModule?._id === module._id ? 'selected' : ''}`}
          onClick={() => onSelectModule(module)}
        >
          <h3>{module.title || `Module ${index + 1}`}</h3>
          <p>{module.description || 'No description'}</p>
        </div>
      ))}
    </div>
  );
};

ModuleList.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string
    })
  ),
  selectedModule: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  onSelectModule: PropTypes.func
};

export default ModuleList;
