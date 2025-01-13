// Dashboard.js (React Component)
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  FaBook, 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaSearch,
  FaStar,
  FaGraduationCap,
  FaClock
} from 'react-icons/fa';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../../components/layouts/StudentLayout';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [coursesRes, profileRes, activitiesRes] = await Promise.all([
          axiosInstance.get('/api/students/courses'),
          axiosInstance.get('/api/students/profile'),
          axiosInstance.get('/api/students/activities')
        ]);

        setCourses(coursesRes.data);
        setProfile(profileRes.data);
        setActivities(activitiesRes.data);

        // Fetch recommended courses separately to avoid blocking the main dashboard
        try {
          const recommendedRes = await axiosInstance.get('/api/courses/recommended');
          setRecommendedCourses(recommendedRes.data.slice(0, 3));
        } catch (error) {
          console.error('Error fetching recommended courses:', error);
          setRecommendedCourses([]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate total learning time (in hours)
  const calculateLearningTime = (courses) => {
    return courses.reduce((total, course) => {
      return total + (course.timeSpent || 0);
    }, 0);
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = (profile) => {
    if (!profile) return 0;
    
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'bio'
    ];

    const completedFields = requiredFields.filter(field => 
      profile[field] && profile[field].toString().trim() !== ''
    );

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

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
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back, {user?.name || user?.firstName || 'Student'}!
          </h1>
          <p className="text-gray-500 mt-2">Continue your learning journey</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/students/courses')}
              className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <FaGraduationCap className="mr-2" />
              My Courses
            </button>
            <button
              onClick={() => router.push('/students/browse-courses')}
              className="flex items-center justify-center p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <FaSearch className="mr-2" />
              Browse New Courses
            </button>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Active Course Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Active Courses</h3>
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaChalkboardTeacher className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600">{courses.length}</p>
              <p className="text-gray-600 mt-2">Courses in progress</p>
              <button 
                onClick={() => router.push('/students/courses')}
                className="mt-4 text-green-600 font-medium hover:text-green-700 transition-colors inline-block"
              >
                View Courses →
              </button>
            </div>

            {/* Learning Stats Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Learning Time</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaBook className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {calculateLearningTime(courses).toFixed(1)} hrs
              </p>
              <p className="text-gray-600 mt-2">Total learning time</p>
              <button 
                onClick={() => router.push('/students/courses')}
                className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block"
              >
                View Details →
              </button>
            </div>

            {/* Profile Completion Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Profile Status</h3>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaUserGraduate className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-600">
                {calculateProfileCompletion(profile)}%
              </p>
              <p className="text-gray-600 mt-2">Profile completion</p>
              <button 
                onClick={() => router.push('/students/profile')}
                className="mt-4 text-purple-600 font-medium hover:text-purple-700 transition-colors inline-block"
              >
                Complete Profile →
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Courses Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recommended Courses</h2>
            <button
              onClick={() => router.push('/students/browse-courses')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
                <div className="relative h-40 mb-4">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <FaBook className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{course.duration || 'Self-paced'}</span>
                  </div>
                  <button
                    onClick={() => router.push(`/students/courses/${course._id}`)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    <FaBook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{activity.type}</h4>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activities</p>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
