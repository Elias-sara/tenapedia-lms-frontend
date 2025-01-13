import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateCoursePage = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    courseImage: null,
    instructor: {
      name: '',
      bio: '',
      image: null
    },
    modules: []
  });

  const handleInputChange = (e, field, moduleIndex = null, lessonIndex = null, quizIndex = null) => {
    const { name, value, files } = e.target;
    
    if (moduleIndex !== null) {
      const updatedModules = [...courseData.modules];
      if (lessonIndex !== null) {
        updatedModules[moduleIndex].lessons[lessonIndex][name] = value;
      } else if (quizIndex !== null) {
        updatedModules[moduleIndex].quizzes[quizIndex][name] = value;
      } else {
        updatedModules[moduleIndex][name] = value;
      }
      setCourseData({ ...courseData, modules: updatedModules });
      return;
    }

    if (files) {
      if (field === 'courseImage') {
        setCourseData({ ...courseData, courseImage: files[0] });
      } else if (field === 'instructorImage') {
        setCourseData({
          ...courseData,
          instructor: { ...courseData.instructor, image: files[0] }
        });
      }
      return;
    }

    if (field === 'instructor') {
      setCourseData({
        ...courseData,
        instructor: { ...courseData.instructor, [name]: value }
      });
      return;
    }

    setCourseData({ ...courseData, [name]: value });
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        {
          title: '',
          description: '',
          lessons: [],
          quizzes: []
        }
      ]
    });
  };

  const addLesson = (moduleIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons.push({
      title: '',
      content: '',
      description: '',
      videoUrl: '',
      videoTitle: '',
      duration: 0,
      order: updatedModules[moduleIndex].lessons.length
    });
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const addQuiz = (moduleIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].quizzes.push({
      title: '',
      description: '',
      passingScore: 80,
      questions: []
    });
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const removeModule = (moduleIndex) => {
    const updatedModules = courseData.modules.filter((_, index) => index !== moduleIndex);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(
      (_, index) => index !== lessonIndex
    );
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const removeQuiz = (moduleIndex, quizIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].quizzes = updatedModules[moduleIndex].quizzes.filter(
      (_, index) => index !== quizIndex
    );
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('category', courseData.category);
      formData.append('instructorName', courseData.instructor.name);
      formData.append('instructorBio', courseData.instructor.bio);
      
      if (courseData.courseImage) {
        formData.append('courseImage', courseData.courseImage);
      }
      if (courseData.instructor.image) {
        formData.append('instructorImage', courseData.instructor.image);
      }

      formData.append('modules', JSON.stringify(courseData.modules));

      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Course created successfully!');
      router.push('/admin/courses');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating course');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Course</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Course Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={courseData.category}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Image</label>
                <input
                  type="file"
                  onChange={(e) => handleInputChange(e, 'courseImage')}
                  className="mt-1 block w-full"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Instructor Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Instructor Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
                <input
                  type="text"
                  name="name"
                  value={courseData.instructor.name}
                  onChange={(e) => handleInputChange(e, 'instructor')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor Bio</label>
                <textarea
                  name="bio"
                  value={courseData.instructor.bio}
                  onChange={(e) => handleInputChange(e, 'instructor')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor Image</label>
                <input
                  type="file"
                  onChange={(e) => handleInputChange(e, 'instructorImage')}
                  className="mt-1 block w-full"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Modules Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Modules</h2>
              <button
                type="button"
                onClick={addModule}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Module
              </button>
            </div>

            {courseData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-grow">
                    <input
                      type="text"
                      name="title"
                      placeholder="Module Title"
                      value={module.title}
                      onChange={(e) => handleInputChange(e, null, moduleIndex)}
                      className="w-full p-2 border rounded mb-2"
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Module Description"
                      value={module.description}
                      onChange={(e) => handleInputChange(e, null, moduleIndex)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(moduleIndex)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                {/* Lessons */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Lessons</h3>
                    <button
                      type="button"
                      onClick={() => addLesson(moduleIndex)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Add Lesson
                    </button>
                  </div>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="border p-4 rounded mb-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-grow">
                          <input
                            type="text"
                            name="title"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) => handleInputChange(e, null, moduleIndex, lessonIndex)}
                            className="w-full p-2 border rounded mb-2"
                            required
                          />
                          <textarea
                            name="content"
                            placeholder="Lesson Content"
                            value={lesson.content}
                            onChange={(e) => handleInputChange(e, null, moduleIndex, lessonIndex)}
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLesson(moduleIndex, lessonIndex)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quizzes */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Quizzes</h3>
                    <button
                      type="button"
                      onClick={() => addQuiz(moduleIndex)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      Add Quiz
                    </button>
                  </div>
                  {module.quizzes.map((quiz, quizIndex) => (
                    <div key={quizIndex} className="border p-4 rounded mb-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-grow">
                          <input
                            type="text"
                            name="title"
                            placeholder="Quiz Title"
                            value={quiz.title}
                            onChange={(e) => handleInputChange(e, null, moduleIndex, null, quizIndex)}
                            className="w-full p-2 border rounded mb-2"
                            required
                          />
                          <input
                            type="number"
                            name="passingScore"
                            placeholder="Passing Score"
                            value={quiz.passingScore}
                            onChange={(e) => handleInputChange(e, null, moduleIndex, null, quizIndex)}
                            className="w-full p-2 border rounded"
                            min="0"
                            max="100"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQuiz(moduleIndex, quizIndex)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/courses')}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {saving ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateCoursePage;
