import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditCourse = () => {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch course details
  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`/api/courses/${id}`);
          setCourse(response.data);
        } catch (err) {
          console.error('Error fetching course:', err);
          setError('Failed to load course details');
        }
      };
      fetchCourse();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/courses/${id}`, course);
      alert('Course updated successfully!');
      router.push('/admin/courses');
    } catch (err) {
      console.error('Error updating course:', err);
      setError('Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Edit Course</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="category"
          value={course.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="image"
          value={course.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Update Course'}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
