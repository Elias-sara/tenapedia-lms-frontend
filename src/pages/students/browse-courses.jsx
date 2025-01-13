import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaBook, FaClock, FaUser } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosConfig';
import StudentLayout from '../../components/layouts/StudentLayout';
import { toast } from 'react-hot-toast';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // First try to get available courses
        const coursesResponse = await axiosInstance.get('/api/courses', {
          params: { 
            available: true,
            populate: 'instructor' // Request instructor data to be populated
          }
        });

        // Process courses to ensure instructor data is properly formatted
        const processedCourses = (coursesResponse.data.courses || []).map(course => ({
          ...course,
          instructor: course.instructor || { name: 'Instructor Not Assigned' }
        }));

        setCourses(processedCourses);

        try {
          // Then try to get enrolled courses
          const enrolledResponse = await axiosInstance.get('/api/students/courses');
          // Create a Set of enrolled course IDs for efficient lookup
          const enrolledIds = new Set((enrolledResponse.data || []).map(course => course._id));
          setEnrolledCourseIds(enrolledIds);
        } catch (enrollError) {
          console.error('Error fetching enrolled courses:', enrollError);
          setEnrolledCourseIds(new Set());
        }
      } catch (error) {
        console.error('Error fetching available courses:', error);
        toast.error('Failed to load courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
        await axiosInstance.post(`/api/students/enroll/${courseId}`);
        toast.success('Successfully enrolled in course!');
        router.push(`/students/courses/${courseId}`);
    } catch (error) {
        console.error('Error enrolling in course:', error);
        toast.error(error.response?.data?.message || 'Failed to enroll in course');
    }
  };

  const handleGoToCourse = (courseId) => {
    router.push(`/students/courses/${courseId}`);
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="mt-2 text-gray-600">Discover new learning opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const courseId = course._id || course.id;
            const isEnrolled = enrolledCourseIds.has(courseId);

            return (
              <div
                key={courseId}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden"
              >
                {course.thumbnail && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{course.duration || 'Self-paced'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>
                        {course.instructor ? (
                          course.instructor.name
                        ) : 'Instructor Not Assigned'}
                      </span>
                    </div>
                  </div>
                  {isEnrolled ? (
                    <button
                      onClick={() => handleGoToCourse(courseId)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                    >
                      Go to Course
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(courseId)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div key="no-courses" className="text-center py-12">
            <FaBook className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or check back later for new courses.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default BrowseCourses;