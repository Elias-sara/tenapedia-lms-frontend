import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import Head from 'next/head';
import PropTypes from 'prop-types';
import axiosInstance from '@/utils/axiosInstance';

// Icons
import { 
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  PlayIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ClockIcon,
  HashtagIcon,
  LinkIcon,
  CheckCircleIcon,
  LockClosedIcon,
  AcademicCapIcon,
  ChevronUpIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/solid';

const LearningProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
    <div 
      className="bg-gradient-to-r from-teal-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const LessonCard = ({ lesson, isActive, onSelect }) => (
  <div 
    onClick={onSelect}
    className={`
      cursor-pointer 
      p-4 
      rounded-xl 
      transition-all 
      duration-300 
      flex 
      items-center 
      space-x-4 
      shadow-sm 
      group
      ${isActive 
        ? 'bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-500' 
        : 'hover:bg-gray-100 border border-transparent hover:shadow-md'
      }
    `}
  >
    <div className={`
      p-2 rounded-full transition-all duration-300
      ${isActive 
        ? 'bg-teal-100 text-teal-600' 
        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
      }
    `}>
      <BookOpenIcon className="h-5 w-5" />
    </div>
    <div className="flex-grow">
      <h3 className={`
        text-sm font-semibold transition-colors
        ${isActive ? 'text-teal-800' : 'text-gray-800 group-hover:text-teal-700'}
      `}>
        {lesson.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        {lesson.duration ? `${lesson.duration} min` : 'Not specified'}
      </p>
    </div>
    {isActive && (
      <ChevronRightIcon className="h-5 w-5 text-teal-600 opacity-80 group-hover:opacity-100 transition-all" />
    )}
  </div>
);

LessonCard.propTypes = {
  lesson: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.number
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

function Learn() {
  const router = useRouter();
  const { courseId } = router.query;
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModuleOpen, setIsModuleOpen] = useState({}); // Manage module open/close state for each module

  // Calculate module progress
  const calculateModuleProgress = (moduleId) => {
    if (!progress?.completedLessons || !course) return 0;
    
    const module = course.modules.find(m => m._id === moduleId);
    if (!module?.lessons) return 0;
    
    const completedCount = module.lessons.filter(lesson => {
      const lessonId = typeof lesson === 'string' ? lesson : lesson._id;
      return progress.completedLessons.includes(lessonId);
    }).length;
    
    return module.lessons.length > 0 
      ? (completedCount / module.lessons.length) * 100 
      : 0;
  };

  // Check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    // Handle both string and object lesson inputs
    const actualLessonId = typeof lessonId === 'object' ? lessonId._id : lessonId;
    return progress?.completedLessons?.includes(actualLessonId) || false;
  };

  // Check if module is completed
  const isModuleCompleted = (moduleId) => {
    const module = course?.modules?.find(m => m._id === moduleId);
    if (!module?.lessons || !progress?.completedLessons) return false;
    
    return module.lessons.every(lesson => {
      const lessonId = typeof lesson === 'string' ? lesson : lesson._id;
      return progress.completedLessons.includes(lessonId);
    });
  };

  // Get completed lessons count for a module
  const getCompletedLessonsCount = (moduleId) => {
    const module = course?.modules?.find(m => m._id === moduleId);
    if (!module?.lessons || !progress?.completedLessons) return 0;
    
    return module.lessons.filter(lesson => {
      const lessonId = typeof lesson === 'string' ? lesson : lesson._id;
      return progress.completedLessons.includes(lessonId);
    }).length;
  };

  // Fetch course data
  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Fetch course details
        const courseRes = await axiosInstance.get(`/api/students/courses/${courseId}`);
        const courseData = courseRes.data;
        
        // DEBUG: Log the exact structure of course data
        console.log('Course Data Structure:', JSON.stringify({
          modules: courseData.modules?.map(module => ({
            _id: module._id,
            title: module.title,
            lessons: module.lessons
          })),
          lessonsType: typeof courseData.modules?.[0]?.lessons?.[0]
        }, null, 2));

        setCourse(courseData);
        
        // Fetch course progress
        const progressRes = await axiosInstance.get(`/api/progress/course/${courseId}`);
        setProgress(progressRes.data);

        // Set initial module and lesson
        if (courseData.modules && courseData.modules.length > 0) {
          const firstModule = courseData.modules[0];
          setCurrentModule(firstModule);
          
          // Fetch first lesson if available
          if (firstModule.lessons && firstModule.lessons.length > 0) {
            const firstLessonId = firstModule.lessons[0];
            
            // DEBUG: Log first lesson details
            console.log('First Lesson ID:', firstLessonId);
            console.log('First Lesson Type:', typeof firstLessonId);

            if (typeof firstLessonId === 'string') {
              const lessonRes = await axiosInstance.get(`/api/lessons/${firstLessonId}`);
              setCurrentLesson(lessonRes.data);
            } else if (typeof firstLessonId === 'object') {
              // If lesson is already an object
              setCurrentLesson(firstLessonId);
            } else {
              console.error('Invalid lesson ID:', firstLessonId);
              toast.error('Error loading lesson data');
            }
          }

          // Fetch module quizzes
          const quizRes = await axiosInstance.get(`/api/quizzes/module/${firstModule._id}`);
          if (Array.isArray(quizRes.data)) {
            setQuizzes(quizRes.data);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course content');
        setLoading(false);
        toast.error('Failed to load course content');
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Handle lesson selection
  const selectLesson = async (lessonId, moduleId) => {
    // If lessonId is an object, extract its _id
    const actualLessonId = typeof lessonId === 'object' ? lessonId._id : lessonId;
    
    if (!actualLessonId || (typeof actualLessonId !== 'string')) {
      console.error('Invalid lesson ID:', lessonId);
      toast.error('Invalid lesson data');
      return;
    }

    try {
      setLoading(true);
      
      // If lessonId is already a full lesson object, use it directly
      let lessonData = typeof lessonId === 'object' ? lessonId : null;
      
      // Fetch lesson data if not already an object
      if (!lessonData) {
        const lessonRes = await axiosInstance.get(`/api/lessons/${actualLessonId}`);
        lessonData = lessonRes.data;
      }

      setCurrentLesson(lessonData);

      // Find and set current module
      if (moduleId && course?.modules) {
        const module = course.modules.find(m => m._id === moduleId);
        if (module) {
          setCurrentModule(module);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error selecting lesson:', error);
      toast.error('Failed to load lesson');
      setLoading(false);
    }
  };

  // Handle lesson selection from sidebar
  const handleLessonSelect = async (lessonId, moduleId) => {
    if (!lessonId) {
      console.error('Invalid lesson ID:', lessonId);
      toast.error('Invalid lesson data');
      return;
    }

    try {
      setLoading(true);
      
      // If lessonId is an object, use it directly
      const lesson = typeof lessonId === 'object' 
        ? lessonId 
        : await axiosInstance.get(`/api/lessons/${lessonId}`).then(res => res.data);
      
      await selectLesson(lesson, moduleId);
    } catch (error) {
      console.error('Error loading lesson:', error);
      toast.error('Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  // Render lesson card
  const renderLessonCard = (lessonId, moduleId) => {
    // If we have the full lesson object, use it directly
    if (typeof lessonId === 'object' && lessonId._id) {
      const lesson = lessonId;
      const isActive = currentLesson?._id === lesson._id;
      const isCompleted = isLessonCompleted(lesson._id);
      
      return (
        <LessonCard
          key={lesson._id}
          lesson={lesson}
          isActive={isActive}
          onSelect={() => handleLessonSelect(lesson._id, moduleId)}
        />
      );
    }

    // If we only have a lesson ID
    if (typeof lessonId === 'string') {
      // Try to find the lesson in the current module
      const module = course?.modules?.find(m => m._id === moduleId);
      const lesson = module?.lessons?.find(l => l._id === lessonId);

      if (lesson) {
        const isActive = currentLesson?._id === lesson._id;
        const isCompleted = isLessonCompleted(lesson._id);
        
        return (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            isActive={isActive}
            onSelect={() => handleLessonSelect(lesson._id, moduleId)}
          />
        );
      }
    }

    console.error('Unable to render lesson:', lessonId);
    return null;
  };

  // Toggle module open/close
  const toggleModule = (moduleId) => {
    setIsModuleOpen((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId],
    }));
  };

  // Render module section with collapsible feature
  const renderModuleSection = (courseModule) => {
    const totalLessons = courseModule.lessons.length;
    const completedLessonsCount = getCompletedLessonsCount(courseModule._id);
  
    return (
      <div key={courseModule._id} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
        {/* Module Header */}
        <div
           className="px-4 py-3 flex justify-between items-center bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white rounded-t-xl cursor-pointer transition-transform "
          onClick={() => toggleModule(courseModule._id)}
        >
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <BookOpenIcon className="h-5 w-5" />
            <span>{courseModule.title}</span>
          </h3>
          <div className="flex items-center space-x-2">
            <span className="bg-white text-purple-600 text-xs font-medium px-2 py-1 rounded-full">
              {calculateModuleProgress(courseModule._id).toFixed(0)}%
            </span>
            {isModuleOpen[courseModule._id] ? (
              <ChevronUpIcon className="h-4 w-4 text-white transition-transform duration-200" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-white transition-transform duration-200" />
            )}
          </div>
        </div>
  
        {/* Module Content */}
        {isModuleOpen[courseModule._id] && (
          <div className="px-5 py-4 bg-gray-50">
            {/* Progress Bar */}
            {/* <LearningProgressBar 
              progress={calculateModuleProgress(courseModule._id)} 
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
            /> */}
  
            {/* Quiz Progress */}
            {/* <div className="mt-3 bg-gray-100 p-3 rounded-lg shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-medium text-gray-600">Module Quiz</h4>
                <span className="text-xs text-gray-500">
                  {completedLessonsCount} / {totalLessons} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(completedLessonsCount / totalLessons) * 100}%`,
                    transition: 'width 0.4s ease-in-out',
                  }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {completedLessonsCount === totalLessons
                  ? 'All lessons completed. Quiz is now available!'
                  : 'Complete all lessons to unlock the module quiz'}
              </p>
            </div> */}
  
            {/* Lesson Cards */}
            <div className="mt-4 space-y-2">
              {courseModule.lessons.map((lesson) => (
                <div
                  key={lesson._id || lesson}
                  className="hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 ease-in-out cursor-pointer"

                >
                  {renderLessonCard(lesson, courseModule._id)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  

  // Handle next lesson
  const handleNextLesson = async () => {
    if (!currentModule?.lessons || !currentLesson?._id) return;

    // Find the current lesson index using the lesson's _id
    const currentIndex = currentModule.lessons.findIndex(lesson => 
      (typeof lesson === 'string' ? lesson : lesson._id) === currentLesson._id
    );

    if (currentIndex < currentModule.lessons.length - 1) {
      const nextLesson = currentModule.lessons[currentIndex + 1];
      await selectLesson(nextLesson, currentModule._id);
    } else {
      // Check for quiz
      try {
        const quizRes = await axiosInstance.get(`/api/quizzes/module/${currentModule._id}`);
        if (quizRes.data && Array.isArray(quizRes.data) && quizRes.data.length > 0) {
          toast.success('Module completed! Starting quiz...');
          router.push(`/students/courses/${courseId}/quiz/${currentModule._id}`);
        } else {
          toast.success('Module completed!');
        }
      } catch (error) {
        console.error('Error checking for quiz:', error);
        toast.error('Failed to check for quiz');
      }
    }
  };

  // Handle previous lesson
  const handlePreviousLesson = async () => {
    if (!currentModule?.lessons || !currentLesson?._id) return;

    // Find the current lesson index using the lesson's _id
    const currentIndex = currentModule.lessons.findIndex(lesson => 
      (typeof lesson === 'string' ? lesson : lesson._id) === currentLesson._id
    );

    if (currentIndex > 0) {
      const prevLesson = currentModule.lessons[currentIndex - 1];
      await selectLesson(prevLesson, currentModule._id);
    }
  };

  // Navigation availability checks
  const hasPreviousLesson = currentModule?.lessons && currentLesson?._id && 
    currentModule.lessons.findIndex(lesson => 
      (typeof lesson === 'string' ? lesson : lesson._id) === currentLesson._id
    ) > 0;
  
  const hasNextLesson = currentModule?.lessons && currentLesson?._id && 
    currentModule.lessons.findIndex(lesson => 
      (typeof lesson === 'string' ? lesson : lesson._id) === currentLesson._id
    ) < currentModule.lessons.length - 1;

  // Check if current lesson is the last in the module
  const isLastLesson = currentModule?.lessons && currentLesson?._id && 
    (typeof currentModule.lessons[currentModule.lessons.length - 1] === 'string'
      ? currentModule.lessons[currentModule.lessons.length - 1]
      : currentModule.lessons[currentModule.lessons.length - 1]?._id) === currentLesson._id;

  // Handle video playback
  const handleVideoPlay = (lesson) => {
    if (!lesson?.videoUrl) {
      toast.error('No video available for this lesson');
      return;
    }

    try {
      // Check if video URL is valid
      const url = new URL(lesson.videoUrl);
      
      // If it's a YouTube URL, extract video ID and use embed URL
      if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
        const videoId = url.hostname.includes('youtube.com') 
          ? new URLSearchParams(url.search).get('v')
          : url.pathname.slice(1);
        
        if (videoId) {
          window.open(`https://www.youtube.com/embed/${videoId}`, '_blank');
          return;
        }
      }
      
      // For other video URLs, open in new tab
      window.open(lesson.videoUrl, '_blank');
    } catch (error) {
      console.error('Invalid video URL:', error);
      toast.error('Invalid video URL format');
    }
  };

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle lesson completion
  const handleLessonComplete = async () => {
    if (!currentLesson?._id) {
      toast.error('No lesson selected');
      return;
    }

    try {
      setLoading(true);
      // Mark lesson as complete
      await axiosInstance.post(`/api/progress/lesson/${currentLesson._id}/complete`);
      toast.success('Lesson completed!');
      
      // Update progress
      const progressRes = await axiosInstance.get(`/api/progress/course/${courseId}`);
      setProgress(progressRes.data);

      // Check if there are more lessons
      if (currentModule?.lessons) {
        // Find the current lesson index using the lesson's _id
        const currentIndex = currentModule.lessons.findIndex(lesson => 
          (typeof lesson === 'string' ? lesson : lesson._id) === currentLesson._id
        );

        if (currentIndex < currentModule.lessons.length - 1) {
          // Load next lesson
          const nextLesson = currentModule.lessons[currentIndex + 1];
          await selectLesson(nextLesson, currentModule._id);
        } else {
          // Check for quiz
          const quizRes = await axiosInstance.get(`/api/quizzes/module/${currentModule._id}`);
          if (quizRes.data && Array.isArray(quizRes.data) && quizRes.data.length > 0) {
            toast.success('Module completed! Starting quiz...');
            router.push(`/students/courses/${courseId}/quiz/${currentModule._id}`);
          } else {
            toast.success('Module completed!');
          }
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast.error('Failed to complete lesson');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Course</h2>
          <p className="text-gray-600">{error || 'Course not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-inter">
      <div className="container mx-auto px-4 py-8 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module and Lesson Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpenIcon className="h-7 w-7 mr-3 text-teal-600" />
                {course?.title}
              </h2>
              <LearningProgressBar 
                progress={progress?.overallProgress || 0} 
              />
              <p className="text-sm text-gray-600 mt-2">
                {progress?.overallProgress || 0}% Complete
              </p>
            </div>

            {/* Modules Accordion */}
            {course?.modules?.map((module, moduleIndex) => (
              <div 
                key={module._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div 
                  onClick={() => toggleModule(module._id)}
                  className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-2 rounded-full transition-all
                      ${isModuleOpen[module._id] 
                        ? 'bg-teal-100 text-teal-600' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }
                    `}>
                      <BookOpenIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-teal-700">
                      {module.title}
                    </h3>
                  </div>
                  {isModuleOpen[module._id] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                {isModuleOpen[module._id] && (
                  <div className="p-4 space-y-3 bg-gray-50">
                    {module.lessons?.map((lesson) => (
                      <LessonCard 
                        key={lesson._id}
                        lesson={lesson}
                        isActive={currentLesson?._id === lesson._id}
                        onSelect={() => handleLessonSelect(lesson)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lesson Content Area */}
          <div className="lg:col-span-2">
            {currentLesson ? (
              <div className="bg-white rounded-xl shadow-md p-8">
                {/* Header Section */}
                <div className="border-b pb-6 mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    {currentLesson.duration && (
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {currentLesson.duration} minutes
                      </span>
                    )}
                    {currentLesson.order && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center">
                          <HashtagIcon className="h-4 w-4 mr-1" />
                          Lesson {currentLesson.order}
                        </span>
                      </>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-3">{currentLesson.title}</h1>
                  {currentLesson.title2 && (
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{currentLesson.title2}</h2>
                  )}
                  {currentLesson.subtitle && (
                    <h3 className="text-lg text-gray-600">{currentLesson.subtitle}</h3>
                  )}
                </div>

                {/* Description Section */}
                {currentLesson.description && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Overview</h3>
                    <p className="text-gray-700 leading-relaxed">{currentLesson.description}</p>
                  </div>
                )}

                {/* Main Content Section */}
                {currentLesson.content && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-xl text-gray-800 mb-4">Lesson Content</h3>
                    <div className="prose prose-blue max-w-none" 
                         dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  </div>
                )}

                {/* Image Section */}
                {currentLesson.image && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-xl text-gray-800 mb-4">Lesson Image</h3>
                    {console.log('Lesson Image URL:', currentLesson.image)}
                    <img 
                      src={`${process.env.NEXT_PUBLIC_API_URL}${currentLesson.image}`} 
                      alt={currentLesson.title}
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Video Section */}
                {currentLesson.videoUrl && (
                  <div className="mb-8">
                    {currentLesson.videoTitle && (
                      <h3 className="font-semibold text-xl text-gray-800 mb-4">{currentLesson.videoTitle}</h3>
                    )}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      {/* Check if the videoUrl is a YouTube link */}
                      {currentLesson.videoUrl.includes('youtube.com') || currentLesson.videoUrl.includes('youtu.be') ? (
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentLesson.videoUrl)}`}
                            title={currentLesson.videoTitle}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        </div>
                      ) : (
                        <div className="aspect-w-16 aspect-h-9">
                          <video 
                            controls 
                            src={`${process.env.NEXT_PUBLIC_API_URL}${currentLesson.videoUrl}`} 
                            className="w-full h-full object-cover"
                            onClick={() => handleVideoPlay(currentLesson)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div className="space-y-4 mb-8">
                  {['note', 'note1', 'note2', 'note3', 'note4', 'note5', 'note6', 'note7'].map((noteKey) => {
                    const noteContent = currentLesson[noteKey];
                    if (noteContent) {
                      return (
                        <div
                          key={noteKey}
                          className="text-gray-700 prose prose-sm max-w-none font-poppins leading-relaxed text-lg tracking-wide"
                          dangerouslySetInnerHTML={{ __html: noteContent }}
                        />
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Resources and Links Section */}
                <div className="space-y-6 mb-12">
                  {currentLesson.resources?.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-xl text-gray-900 mb-4">Helpful Resources</h4>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {currentLesson.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:text-blue-800 transition-colors duration-300 text-lg font-medium"
                          >
                            Resource {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentLesson.links && (
                    <div>
                      <h4 className="font-semibold text-xl text-gray-900 mb-4">Related Links</h4>
                      <div className="prose prose-blue max-w-none text-gray-800">
                        {currentLesson.links}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation and Completion Section */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  {/* Module Completion Status */}
                  {isModuleCompleted(currentModule?._id) ? (
                    <div className="flex justify-center mb-6">
                      <div className="flex items-center text-green-600 bg-green-100 px-6 py-3 rounded-xl shadow-md">
                        <CheckCircleIcon className="h-6 w-6 mr-2" />
                        <span className="font-medium">Module Completed</span>
                      </div>
                    </div>
                  ) : (
                    /* Lesson Completion Status */
                    <div className="flex justify-center mb-6">
                      {isLessonCompleted(currentLesson?._id) ? (
                        <div className="flex items-center text-green-600 bg-green-100 px-4 py-2 rounded-lg shadow-sm">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          <span className="font-medium">Lesson Completed</span>
                        </div>
                      ) : (
                        <button
                          onClick={handleLessonComplete}
                          disabled={loading}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircleIcon className="h-5 w-5 mr-2" />
                              <span className="font-medium">Complete Lesson</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePreviousLesson}
                      className="flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-md hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
                      disabled={!hasPreviousLesson || loading}
                    >
                      <ChevronLeftIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">Previous Lesson</span>
                    </button>
                    
                    {!isLastLesson && hasNextLesson && (
                      <button
                        onClick={handleNextLesson}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        <span className="font-medium">Next Lesson</span>
                        <ChevronRightIcon className="h-5 w-5 ml-2" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Quiz Section */}
                {quizzes.length > 0 && (
                  <div 
                    id="quiz-section" 
                    className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <AcademicCapIcon className="h-6 w-6 text-green-600 mr-2" />
                      Module Quiz
                    </h3>
                    
                    {isModuleCompleted(currentModule?._id) ? (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Congratulations! You've completed all lessons in this module.
                          Take the quiz to test your knowledge!
                        </p>
                        <button
                          onClick={() => router.push(`/students/courses/${courseId}/quiz/${currentModule._id}`)}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-colors"
                        >
                          Start Quiz
                          <ChevronRightIcon className="h-5 w-5 ml-2" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500 bg-gray-50 px-4 py-3 rounded-lg">
                        <LockClosedIcon className="h-5 w-5 mr-2" />
                        Complete all lessons to unlock the module quiz
                        <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded-full">
                          {getCompletedLessonsCount(currentModule?._id)} / {currentModule?.lessons?.length || 0} completed
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md">
                <div className="text-center p-12">
                  <BookOpenIcon className="h-16 w-16 text-teal-500 mx-auto mb-6 opacity-50" />
                  <p className="text-gray-600 text-lg">
                    Select a lesson to begin learning
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Learn.propTypes = {};

export default Learn;
