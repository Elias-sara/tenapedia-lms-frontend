import React, { useState } from 'react';

const CourseForm = ({ course, onSave }) => {
  const [formData, setFormData] = useState({
    title: course ? course.title : '',
    description: course ? course.description : '',
    instructor: course ? course.instructor : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Instructor:
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Course</button>
    </form>
  );
};

export default CourseForm;
