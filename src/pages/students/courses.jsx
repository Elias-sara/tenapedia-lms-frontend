import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  FaBook, 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaCog, 
  FaPlayCircle, 
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle
} from 'react-icons/fa';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../../components/layouts/StudentLayout';

const CourseCard = ({ course, onContinue, isExpanded, onToggleExpand }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 relative">
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">{course.progress}%</span>
        </div>
      </div>
      
      <div className="p-6 font-['Inter', sans-serif]">
        {/* Course Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center shadow-sm">
                {course.image ? (
                  <FaChalkboardTeacher className="h-7 w-7 text-blue-600" />
                ) : (
                  <FaChalkboardTeacher className="h-7 w-7 text-blue-600" />
                )}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {typeof course.instructor === 'object' ? course.instructor.name : course.instructor}
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggleExpand(course._id)}
            className="text-gray-500 hover:text-blue-600 transition-colors rounded-full p-2 hover:bg-blue-50"
          >
            {isExpanded ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
          </button>
        </div>

        {/* Progress Visualization */}
        <div className="mb-5">
          <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
          <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
            <div className="flex items-center text-blue-700 mb-1">
              <FaPlayCircle className="mr-2" />
              <span className="font-semibold">Lessons</span>
            </div>
            <p className="text-blue-900 font-bold">
              {course.completedLessons} / {course.totalLessons} completed
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors">
            <div className="flex items-center text-green-700 mb-1">
              <FaQuestionCircle className="mr-2" />
              <span className="font-semibold">Quizzes</span>
            </div>
            <p className="text-green-900 font-bold">
              {course.completedQuizzes} / {course.totalQuizzes} completed
            </p>
          </div>
        </div>

        {/* Modules List */}
        {isExpanded && (
          <div className="mt-6 space-y-4">
            {course.modules.map((module, index) => (
              <div 
                key={module._id} 
                className="border-2 border-gray-100 rounded-lg p-5 bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
              >
                <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
                  <span className="mr-2 text-blue-600">Module {index + 1}:</span> 
                  {module.title}
                </h4>
                <div className="space-y-3">
                  {/* Lessons */}
                  {module.lessons?.map((lesson) => {
                    const lessonProgress = course.moduleProgress
                      ?.find(mp => mp.module === module._id)
                      ?.lessonProgress
                      ?.find(lp => lp.lesson === lesson._id);
                    
                    return (
                      <div 
                        key={lesson._id} 
                        className="flex items-center text-sm bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all"
                      >
                        {lessonProgress?.completed ? (
                          <FaCheckCircle className="text-green-500 mr-3 text-lg" />
                        ) : (
                          <FaPlayCircle className="text-gray-400 mr-3 text-lg" />
                        )}
                        <span className={`flex-grow ${lessonProgress?.completed ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                          {lesson.title}
                        </span>
                        {lesson.duration && (
                          <span className="ml-auto text-gray-500 font-medium">
                            {lesson.duration} min
                          </span>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Quizzes */}
                  {module.quizzes?.map((quiz) => (
                    <div 
                      key={quiz._id} 
                      className="flex items-center text-sm bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all"
                    >
                      <FaQuestionCircle className="text-blue-500 mr-3 text-lg" />
                      <span className="text-gray-800 font-medium flex-grow">
                        Quiz: {quiz.title}
                      </span>
                      {quiz.passingScore && (
                        <span className="ml-auto text-gray-500 font-medium">
                          Pass: {quiz.passingScore}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Learning Button */}
        <div className="mt-5">
          <button
            onClick={() => onContinue(course._id)}
            className="w-full inline-flex justify-center items-center px-6 py-3 border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] group"
          >
            Continue Learning
            <svg className="ml-2 -mr-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/api/students/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleContinueLearning = (courseId) => {
    router.push(`/students/courses/${courseId}/learn`);
  };

  const handleToggleExpand = (courseId) => {
    setExpandedCourseId(prevId => prevId === courseId ? null : courseId);
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter', sans-serif]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              My Learning Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore your courses, track progress, and unlock your potential with personalized learning paths.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02]">
              <div className="p-10 text-center">
                <div className="bg-blue-50 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <FaBook className="text-5xl text-blue-600 opacity-70" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Courses Yet
                </h3>
                <p className="text-base text-gray-600 mb-8 leading-relaxed">
                  Your learning adventure begins here. Explore and enroll in courses that spark your curiosity.
                </p>
                <button 
                  onClick={() => router.push('/students/browse-courses')}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 active:scale-95 group"
                >
                  Browse Courses
                  <svg className="ml-2 -mr-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course._id} 
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <CourseCard 
                    course={course} 
                    onContinue={handleContinueLearning}
                    isExpanded={expandedCourseId === course._id}
                    onToggleExpand={handleToggleExpand}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default Courses;