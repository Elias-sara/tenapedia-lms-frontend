import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { 
  FaGraduationCap, 
  FaUserTie, 
  FaClock, 
  FaUsers, 
  FaBook, 
  FaChalkboardTeacher, 
  FaCheckCircle, 
  FaFileAlt,
  FaVideo,
  FaClipboardList
} from "react-icons/fa";
import CourseImagePlaceholder from "../../../components/CourseImagePlaceholder";

const isValidImageUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const router = useRouter();
  const { courseId } = router.query;

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      checkEnrollmentStatus();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/courses/${courseId}/content`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/students/courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const enrolledCourses = response.data || [];
      setIsEnrolled(enrolledCourses.some(course => course._id === courseId));
    } catch (error) {
      console.error("Error checking enrollment:", error);
      setIsEnrolled(false);
    }
  };

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/students/enroll/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Successfully enrolled!");
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error(error.response?.data?.message || "Enrollment failed.");
    }
  };

  const renderLearningOutcomes = () => {
    if (!course.learningOutcomes || course.learningOutcomes.length === 0) return null;

    return (
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaCheckCircle className="mr-3 text-blue-500" />
          Learning Outcomes
        </h3>
        <ul className="space-y-2">
          {course.learningOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-gray-700">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderModule = (module, index) => {
    if (!module) return null;
    
    return (
      <div key={module._id || index} className="mb-6 bg-white shadow-md rounded-lg overflow-hidden">
        <button
          className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
          onClick={() =>
            setActiveModuleIndex(activeModuleIndex === index ? null : index)
          }
        >
          <div className="flex items-center">
            <FaBook className="mr-3 text-blue-500" />
            <h3 className="font-semibold text-lg">
              Module {index + 1}: {module.title}
            </h3>
          </div>
          <span className="text-gray-500 font-bold text-xl">
            {activeModuleIndex === index ? "−" : "+"}
          </span>
        </button>
        {activeModuleIndex === index && (
          <div className="p-6 bg-gray-50">
            {module.description && (
              <p className="text-gray-600 mb-4 italic">{module.description}</p>
            )}

            {module.learningObjectives && module.learningObjectives.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <FaChalkboardTeacher className="mr-2 text-green-500" />
                  Learning Objectives
                </h4>
                <ul className="pl-4 space-y-1 text-gray-700">
                  {module.learningObjectives.map((obj, objIndex) => (
                    <li key={objIndex} className="list-disc">
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {/* Lessons Section */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <FaVideo className="mr-2 text-purple-500" />
                  Lessons
                </h4>
                {module.lessons && module.lessons.length > 0 ? (
                  module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson._id || `lesson-${lessonIndex}`}
                      className="bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4 border-purple-500"
                    >
                      <h5 className="font-medium">
                        {lesson.title}
                      </h5>
                      <p className="text-xs text-gray-500 mt-1">
                        {lesson.duration} minutes
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No lessons available.</p>
                )}
              </div>

              {/* Quizzes Section */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <FaClipboardList className="mr-2 text-red-500" />
                  Quizzes
                </h4>
                {module.quizzes && module.quizzes.length > 0 ? (
                  module.quizzes.map((quiz, quizIndex) => (
                    <div
                      key={quiz._id || `quiz-${quizIndex}`}
                      className="bg-white p-3 rounded-lg shadow-sm mb-2 border-l-4 border-red-500"
                    >
                      <h5 className="font-medium">
                        {quiz.title}
                      </h5>
                      <div className="text-xs text-gray-500 mt-1 flex justify-between">
                        <span>Passing Score: {quiz.passingScore}%</span>
                        <span>Duration: {quiz.duration} mins</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No quizzes available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Course not found</h2>
        <button
          onClick={() => router.push("/students/courses")}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-screen">
      {/* Course Header */}
      <div className="bg-white shadow-xl rounded-xl p-8 mb-8 border-t-4 border-blue-500">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/3 relative">
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg">
              {imageError || !course.image || !isValidImageUrl(course.image) ? (
                <CourseImagePlaceholder />
              ) : (
                <>
                  {imageLoading && <CourseImagePlaceholder />}
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ 
                      objectFit: 'cover',
                      display: imageLoading ? 'none' : 'block'
                    }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className="rounded-xl transition-transform hover:scale-105"
                    priority
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{course.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <FaUserTie className="w-6 h-6 mr-3 text-blue-500" />
                <span className="font-medium">
                  Instructor: {course.instructor?.name || "Unknown Instructor"}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaClock className="w-6 h-6 mr-3 text-green-500" />
                <span className="font-medium">
                  Duration: {course.duration || "Not specified"}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaUsers className="w-6 h-6 mr-3 text-purple-500" />
                <span className="font-medium">
                  Students Enrolled: {course.studentsEnrolled?.length || 0}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaGraduationCap className="w-6 h-6 mr-3 text-red-500" />
                <span className="font-medium">
                  Last Updated: {new Date(course.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {isEnrolled ? (
              <button
                onClick={() => router.push(`/students/courses/${courseId}/learn`)}
                className="w-full bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <FaBook className="mr-2" /> Continue Learning
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <FaGraduationCap className="mr-2" /> Enroll Now
              </button>
            )}
          </div>
        </div>

        {renderLearningOutcomes()}
      </div>

      {/* Course Modules */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Course Curriculum
        </h2>
        {course.modules && course.modules.length > 0 ? (
          course.modules.map((module, index) => renderModule(module, index))
        ) : (
          <div className="bg-white p-8 rounded-xl text-center shadow-md">
            <p className="text-gray-500 text-xl">
              No modules available for this course yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
