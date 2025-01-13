import React, { useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FileUpload from "../../../components/ui/FileUpload";
import Toast from "../../../components/ui/Toast";

const CreateCoursePage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const emptyLesson = {
    title: '',
    title2: '',
    subtitle: '',
    content: '',
    note: '',
    note1: '',
    note2: '',
    note3: '',
    note4: '',
    note5: '',
    note6: '',
    note7: '',
    description: '',
    videoUrl: '',
    videoTitle: '',
    links: '',
    resources: [],
    image: null,
    file: null,
    duration: 0,
    order: 0
  };

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    instructor: {
      name: '',
      bio: '',
      image: null
    },
    modules: [{
      title: '',
      description: '',
      lessons: [{ ...emptyLesson }],
      quizzes: [{
        title: '',
        description: '',
        passingScore: 70,
        questions: [{
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }]
      }]
    }]
  });

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!newCourse.title) newErrors.title = "Title is required";
      if (!newCourse.description) newErrors.description = "Description is required";
      if (!newCourse.category) newErrors.category = "Category is required";
    }

    if (currentStep === 2) {
      if (!newCourse.instructor.name) newErrors.instructorName = "Instructor name is required";
      if (!newCourse.instructor.bio) newErrors.instructorBio = "Instructor bio is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (field, value) => {
    setNewCourse(prev => {
      // Handle nested fields (e.g., 'instructor.name')
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      // Handle regular fields
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleModuleChange = (moduleIndex, field, value) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[moduleIndex] = {
        ...updatedModules[moduleIndex],
        [field]: value
      };
      return { ...prev, modules: updatedModules };
    });
  };

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      if (field === 'image') {
        // Store the actual file object for upload
        updatedModules[moduleIndex].lessons[lessonIndex].image = value;
      } else {
        updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
      }
      return { ...prev, modules: updatedModules };
    });
  };

  const handleQuizChange = (moduleIndex, quizIndex, field, value) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      const updatedQuizzes = [...updatedModules[moduleIndex].quizzes];
      updatedQuizzes[quizIndex] = {
        ...updatedQuizzes[quizIndex],
        [field]: value
      };
      updatedModules[moduleIndex] = {
        ...updatedModules[moduleIndex],
        quizzes: updatedQuizzes
      };
      return { ...prev, modules: updatedModules };
    });
  };

  const addModule = () => {
    setNewCourse(prev => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: '',
          description: '',
          lessons: [{ ...emptyLesson }],
          quizzes: [{
            title: '',
            description: '',
            passingScore: 70,
            questions: [{
              question: '',
              options: ['', '', '', ''],
              correctAnswer: 0,
              explanation: ''
            }]
          }]
        }
      ]
    }));
  };

  const addLesson = (moduleIndex) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[moduleIndex].lessons.push({ ...emptyLesson, order: updatedModules[moduleIndex].lessons.length });
      return { ...prev, modules: updatedModules };
    });
  };

  const addQuiz = (moduleIndex) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[moduleIndex].quizzes.push({
        title: '',
        description: '',
        passingScore: 70,
        questions: [{
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }]
      });
      return { ...prev, modules: updatedModules };
    });
  };

  const addQuizQuestion = (moduleIndex, quizIndex) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[moduleIndex].quizzes[quizIndex].questions.push({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
      return { ...prev, modules: updatedModules };
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      if (!validateStep(step)) {
        return;
      }

      setLoading(true);

      // Create FormData first
      const formData = new FormData();

      // Process modules to ensure they have all required fields and filter out empty ones
      const processedModules = newCourse.modules
        .filter(module => module.title && module.title.trim() !== '')
        .map((module, moduleIndex) => ({
          ...module,
          lessons: module.lessons
            .filter(lesson => lesson.title && lesson.title.trim() !== '')
            .map((lesson, lessonIndex) => {
              // Prepare lesson data without the file object
              const lessonData = {
                ...lesson,
                resources: lesson.resources.filter(resource => resource.trim() !== ''),
                image: null // We'll handle the image file separately
              };
              
              // If there's an image file, append it to formData
              if (lesson.image instanceof File) {
                formData.append(`lessonImage-${moduleIndex}-${lessonIndex}`, lesson.image);
              }
              
              return lessonData;
            }),
          quizzes: module.quizzes
            .filter(quiz => quiz.title && quiz.title.trim() !== '')
            .map(quiz => ({
              ...quiz,
              questions: quiz.questions
                .filter(question => question.question && question.question.trim() !== '')
                .map(question => ({
                  ...question,
                  options: question.options.filter(option => option.trim() !== '')
                }))
            }))
        }));

      // Append basic course data
      formData.append('title', newCourse.title);
      formData.append('description', newCourse.description);
      formData.append('category', newCourse.category);
      formData.append('instructorName', newCourse.instructor.name);
      formData.append('instructorBio', newCourse.instructor.bio);
      formData.append('modules', JSON.stringify(processedModules));

      // Append course and instructor images if they exist
      if (newCourse.image instanceof File) {
        formData.append('courseImage', newCourse.image);
      }
      if (newCourse.instructor.image instanceof File) {
        formData.append('instructorImage', newCourse.instructor.image);
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Log the error response
        throw new Error(errorData.message || 'Failed to create course');
      }

      const data = await response.json();
      console.log('Course created successfully:', data);

      setToast({
        show: true,
        message: "Course created successfully!",
        type: "success"
      });

      // Wait a bit before redirecting
      setTimeout(() => {
        router.push('/admin/courses');
      }, 1500);

    } catch (error) {
      console.error('Error creating course:', error);
      setToast({
        show: true,
        message: error.message || "Failed to create course",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (moduleIndex, quizIndex, questionIndex, field, value) => {
    setNewCourse(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[moduleIndex].quizzes[quizIndex].questions[questionIndex][field] = value;
      return { ...prev, modules: updatedModules };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Create New Course</h1>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              {['Basic Info', 'Modules', 'Review', 'Confirmation'].map((stepName, index) => (
                <div key={index} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${step === index 
                      ? 'bg-blue-600 text-white' 
                      : step > index 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {step > index ? '✓' : index + 1}
                  </div>
                  <span className={`ml-2 ${step === index ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    {stepName}
                  </span>
                  {index < 3 && (
                    <div className="w-24 h-1 mx-4 bg-gray-200">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: step > index ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Course Info */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Details</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Course Title"
                        value={newCourse.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <textarea
                        placeholder="Course Description"
                        value={newCourse.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="4"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newCourse.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <FileUpload
                        label="Course Image"
                        onFileSelect={(file) => handleInputChange('image', file)}
                        preview={newCourse.image}
                        className="mt-4"
                      />
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">Instructor Information</h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Instructor Name"
                          value={newCourse.instructor.name}
                          onChange={(e) => handleInputChange('instructor.name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <textarea
                          placeholder="Instructor Bio"
                          value={newCourse.instructor.bio}
                          onChange={(e) => handleInputChange('instructor.bio', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="4"
                        />
                        <FileUpload
                          label="Instructor Image"
                          onFileSelect={(file) => handleInputChange('instructor.image', file)}
                          preview={newCourse.instructor.image}
                          className="mt-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {newCourse.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Module {moduleIndex + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeModule(moduleIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove Module
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Module Title"
                          value={module.title}
                          onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <textarea
                          placeholder="Module Description"
                          value={module.description}
                          onChange={(e) => handleModuleChange(moduleIndex, 'description', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                        />
                      </div>

                      {/* Lessons and Quizzes */}
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={() => addLesson(moduleIndex)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                          >
                            Add Lesson
                          </button>
                          <button
                            type="button"
                            onClick={() => addQuiz(moduleIndex)}
                            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                          >
                            Add Quiz
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Lessons */}
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-md font-medium text-gray-700">Lesson {lessonIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeLesson(moduleIndex, lessonIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove Lesson
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Lesson Title"
                              value={lesson.title}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Secondary Title"
                              value={lesson.title2}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title2', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Subtitle"
                            value={lesson.subtitle}
                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />

                          <textarea
                            placeholder="Content"
                            value={lesson.content}
                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'content', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="4"
                          />

                          <div className="space-y-4">
                            <textarea
                              placeholder="Main Note"
                              value={lesson.note}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows="3"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <textarea
                                placeholder="Additional Note 1"
                                value={lesson.note1}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note1', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                              />
                              <textarea
                                placeholder="Additional Note 2"
                                value={lesson.note2}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note2', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <textarea
                                placeholder="Additional Note 3"
                                value={lesson.note3}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note3', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                              />
                              <textarea
                                placeholder="Additional Note 4"
                                value={lesson.note4}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note4', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <textarea
                                placeholder="Additional Note 5"
                                value={lesson.note5}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note5', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                              />
                              <textarea
                                placeholder="Additional Note 6"
                                value={lesson.note6}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note6', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                              />
                            </div>
                            <textarea
                              placeholder="Additional Note 7"
                              value={lesson.note7}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'note7', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows="3"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Video Information
                              </label>
                              <input
                                type="text"
                                placeholder="Video URL"
                                value={lesson.videoUrl}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'videoUrl', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="Video Title"
                                value={lesson.videoTitle}
                                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'videoTitle', e.target.value)}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lesson Image
                              </label>
                              <FileUpload
                                onFileSelect={(file) => handleLessonChange(moduleIndex, lessonIndex, 'image', file)}
                                label=""
                                accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                                maxSize={5242880}
                                preview={lesson.image}
                                error={errors[`lesson-${moduleIndex}-${lessonIndex}-image`]}
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Links (comma-separated)"
                              value={lesson.links}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'links', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Resources (comma-separated URLs)"
                              value={lesson.resources ? lesson.resources.join(', ') : ''}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'resources', e.target.value.split(',').map(r => r.trim()))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="number"
                              placeholder="Duration (minutes)"
                              value={lesson.duration}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', parseInt(e.target.value) || 0)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min="0"
                            />
                            <input
                              type="number"
                              placeholder="Order"
                              value={lesson.order}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'order', parseInt(e.target.value) || 0)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              min="0"
                            />
                          </div>

                        </div>
                      </div>
                    ))}

                    {/* Quizzes */}
                    {module.quizzes.map((quiz, quizIndex) => (
                      <div key={quizIndex} className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-md font-medium text-gray-700">Quiz {quizIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeQuiz(moduleIndex, quizIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove Quiz
                          </button>
                        </div>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Quiz Title"
                            value={quiz.title}
                            onChange={(e) => handleQuizChange(moduleIndex, quizIndex, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                          <textarea
                            placeholder="Quiz Description"
                            value={quiz.description}
                            onChange={(e) => handleQuizChange(moduleIndex, quizIndex, 'description', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="3"
                          />
                          <input
                            type="number"
                            placeholder="Passing Score (%)"
                            value={quiz.passingScore}
                            onChange={(e) => handleQuizChange(moduleIndex, quizIndex, 'passingScore', parseInt(e.target.value) || 70)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                            max="100"
                          />

                          {/* Questions */}
                          <div className="space-y-4">
                            <h5 className="font-medium text-gray-700">Questions</h5>
                            {quiz.questions.map((question, questionIndex) => (
                              <div key={questionIndex} className="p-4 bg-white rounded-lg space-y-4">
                                <input
                                  type="text"
                                  placeholder="Question"
                                  value={question.question}
                                  onChange={(e) => handleQuestionChange(moduleIndex, quizIndex, questionIndex, 'question', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                                {question.options.map((option, optionIndex) => (
                                  <input
                                    key={optionIndex}
                                    type="text"
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...question.options];
                                      newOptions[optionIndex] = e.target.value;
                                      handleQuestionChange(moduleIndex, quizIndex, questionIndex, 'options', newOptions);
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                  />
                                ))}
                                <div className="flex items-center space-x-2">
                                  <label className="text-sm font-medium text-gray-700">Correct Answer:</label>
                                  <select
                                    value={question.correctAnswer}
                                    onChange={(e) => handleQuestionChange(moduleIndex, quizIndex, questionIndex, 'correctAnswer', parseInt(e.target.value))}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    {question.options.map((_, index) => (
                                      <option key={index} value={index}>Option {index + 1}</option>
                                    ))}
                                  </select>
                                </div>
                                <textarea
                                  placeholder="Explanation"
                                  value={question.explanation}
                                  onChange={(e) => handleQuestionChange(moduleIndex, quizIndex, questionIndex, 'explanation', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  rows="3"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addQuizQuestion(moduleIndex, quizIndex)}
                              className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                            >
                              Add Question
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addModule}
                  className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add Module
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Course Creation</h2>
                
                {/* Course Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Course Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Title:</strong> {newCourse.title}</p>
                      <p><strong>Description:</strong> {newCourse.description}</p>
                      <p><strong>Category:</strong> {newCourse.category}</p>
                      {newCourse.image && (
                        <div className="mt-2">
                          <p><strong>Course Image:</strong></p>
                          <img 
                            src={URL.createObjectURL(newCourse.image)} 
                            alt="Course" 
                            className="mt-1 w-32 h-32 object-cover rounded-lg"
                            onLoad={() => {
                              URL.revokeObjectURL(newCourse.image);
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Instructor Information</h4>
                      <p><strong>Name:</strong> {newCourse.instructor.name}</p>
                      <p><strong>Bio:</strong> {newCourse.instructor.bio}</p>
                      {newCourse.instructor.image && (
                        <div className="mt-2">
                          <p><strong>Instructor Image:</strong></p>
                          <img 
                            src={URL.createObjectURL(newCourse.instructor.image)} 
                            alt="Instructor" 
                            className="mt-1 w-32 h-32 object-cover rounded-lg"
                            onLoad={() => {
                              URL.revokeObjectURL(newCourse.instructor.image);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modules */}
                {newCourse.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-4">
                    <h3 className="text-lg font-semibold mb-4">Module {moduleIndex + 1}</h3>
                    <div className="space-y-2">
                      <p><strong>Title:</strong> {module.title}</p>
                      <p><strong>Description:</strong> {module.description}</p>
                      <p><strong>Order:</strong> {moduleIndex + 1}</p>
                    </div>

                    {/* Lessons */}
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Lesson {lessonIndex + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p><strong>Title:</strong> {lesson.title}</p>
                            <p><strong>Secondary Title:</strong> {lesson.title2}</p>
                            <p><strong>Subtitle:</strong> {lesson.subtitle}</p>
                            <p><strong>Description:</strong> {lesson.description}</p>
                            <p><strong>Content:</strong> {lesson.content}</p>
                            <p><strong>Duration:</strong> {lesson.duration} minutes</p>
                            <p><strong>Order:</strong> {lesson.order}</p>
                          </div>
                          <div>
                            <p><strong>Video URL:</strong> {lesson.videoUrl}</p>
                            <p><strong>Video Title:</strong> {lesson.videoTitle}</p>
                            <p><strong>Links:</strong> {lesson.links}</p>
                            <p><strong>Resources:</strong> {lesson.resources.join(', ')}</p>
                          </div>
                        </div>
                        
                        {/* Notes Section */}
                        <div className="mt-4">
                          <h5 className="font-semibold mb-2">Notes</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Main Note:</strong> {lesson.note}</p>
                            <p><strong>Note 1:</strong> {lesson.note1}</p>
                            <p><strong>Note 2:</strong> {lesson.note2}</p>
                            <p><strong>Note 3:</strong> {lesson.note3}</p>
                            <p><strong>Note 4:</strong> {lesson.note4}</p>
                            <p><strong>Note 5:</strong> {lesson.note5}</p>
                            <p><strong>Note 6:</strong> {lesson.note6}</p>
                            <p><strong>Note 7:</strong> {lesson.note7}</p>
                          </div>
                        </div>

                        {/* Lesson Image Preview */}
                        {lesson.image && (
                          <div className="mt-4">
                            <h5 className="font-semibold mb-2">Lesson Image</h5>
                            <div className="relative w-32 h-32">
                              <img 
                                src={URL.createObjectURL(lesson.image)}
                                alt={`Lesson ${lessonIndex + 1} Image`}
                                className="rounded-lg object-cover w-full h-full"
                                onLoad={(e) => {
                                  URL.revokeObjectURL(e.target.src);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Quizzes */}
                    {module.quizzes.map((quiz, quizIndex) => (
                      <div key={quizIndex} className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Quiz {quizIndex + 1}</h4>
                        <div className="space-y-2">
                          <p><strong>Title:</strong> {quiz.title}</p>
                          <p><strong>Description:</strong> {quiz.description}</p>
                          <p><strong>Passing Score:</strong> {quiz.passingScore}%</p>
                        </div>

                        {/* Questions */}
                        <div className="mt-4">
                          <h5 className="font-semibold mb-2">Questions</h5>
                          {quiz.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mt-2 p-3 bg-white rounded-lg">
                              <p><strong>Question {questionIndex + 1}:</strong> {question.question}</p>
                              <div className="ml-4 mt-2">
                                <p><strong>Options:</strong></p>
                                <ul className="list-disc ml-4">
                                  {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex} className={optionIndex === question.correctAnswer ? 'text-green-600 font-semibold' : ''}>
                                      {option}
                                      {optionIndex === question.correctAnswer && ' (Correct Answer)'}
                                    </li>
                                  ))}
                                </ul>
                                <p className="mt-2"><strong>Explanation:</strong> {question.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">


                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Creating Course...' : 'Create Course'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;