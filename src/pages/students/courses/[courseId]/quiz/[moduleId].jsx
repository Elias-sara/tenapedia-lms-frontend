import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Heroicons imports
import { 
  AcademicCapIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  LightBulbIcon,
  XCircleIcon,
  HomeIcon,
  ArrowPathIcon as RefreshIcon
} from '@heroicons/react/24/solid';

// Context and Axios
import { AuthContext } from '@/context/AuthContext';
import axiosInstance from '@/utils/axiosInstance';

// Component export
export default function Quiz() {
  const router = useRouter();
  const { courseId, moduleId } = router.query;
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching quiz for moduleId:', moduleId);
        const response = await axiosInstance.get(`/api/quizzes/module/${moduleId}`);
        
        console.log('Processed Quiz Data:', response.data[0]);
        
        // Set the first quiz if available
        if (response.data.length > 0) {
          setQuiz(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        toast.error('Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };

    if (moduleId) {
      fetchQuiz();
    }
  }, [moduleId]);

  useEffect(() => {
    // Set start time when quiz loads
    if (quiz) {
      const start = Date.now();
      setStartTime(start);
    }
  }, [quiz]);

  // Timer effect with time tracking
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0 || score !== null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });

      // Track total time spent
      if (startTime) {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setTotalTimeSpent(elapsedSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, startTime]);

  const handleAnswerSelect = (answer) => {
    if (score !== null && !reviewMode) return; // Prevent answer selection after submission
    
    console.log('Answer selected:', answer);
    setSelectedAnswer(answer);
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  // Utility function to check if an option is the correct answer
  const checkCorrectAnswer = (selectedOption, question) => {
    // Safely extract text values
    const selectedText = typeof selectedOption === 'object' 
      ? selectedOption?.text 
      : selectedOption;

    // Extract correct answer text, handling different possible structures
    const correctAnswer = 
      (question.correctAnswer && 
        (typeof question.correctAnswer === 'object' 
          ? question.correctAnswer.text 
          : question.correctAnswer)) || 
      (question.options && question.options[0]) || 
      null;

    // Perform comparison, handling potential string variations
    const isCorrect = selectedText === correctAnswer || 
      (correctAnswer && selectedText.trim() === correctAnswer.trim());

    // Safer logging with primitive values
    console.log('Answer Check Details', {
      selectedOption: selectedText || 'No Option',
      correctAnswer: correctAnswer || 'No Correct Answer',
      isCorrect: isCorrect
    });

    return isCorrect;
  };

  // Render method for options
  const renderQuizOptions = () => {
    return quiz.questions[currentQuestionIndex].options.map((option, index) => {
      // Ensure we're using text for comparison and display
      const optionText = typeof option === 'object' ? option.text : option;
      const isSelected = answers[currentQuestionIndex] === optionText;
      const isCorrect = checkCorrectAnswer(option, quiz.questions[currentQuestionIndex]);
      
      let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
      
      if (isSelected) {
        optionClass += reviewMode 
          ? (isCorrect ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100")
          : "border-blue-500 bg-blue-100";
      }
      
      return (
        <button
          key={index}
          className={optionClass}
          onClick={() => handleAnswerSelect(optionText)}
          disabled={reviewMode}
        >
          {optionText}
        </button>
      );
    });
  };

  // Progress tracking method
  const renderProgressDots = () => {
    return quiz.questions.map((question, index) => {
      let dotClass = "h-3 w-3 rounded-full mx-1 transition-all duration-300 ";
      
      if (index === currentQuestionIndex) {
        dotClass += "bg-blue-500 w-6";
      } else if (reviewMode) {
        // Ensure we pass the text value for checking
        const answerText = typeof answers[index] === 'object' 
          ? answers[index]?.text 
          : answers[index];
        const isCorrect = checkCorrectAnswer(answerText, quiz.questions[index]);
        dotClass += isCorrect ? "bg-green-500" : "bg-red-500";
      } else {
        dotClass += answers[index] ? "bg-blue-500" : "bg-gray-300";
      }
      
      return (
        <div 
          key={index} 
          className={dotClass}
          onClick={() => setCurrentQuestionIndex(index)}
        />
      );
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1] || null);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
      setShowExplanation(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    try {
      // Prepare answers with full question details
      const preparedAnswers = quiz.questions.map((question, index) => {
        const selectedAnswer = answers[index];
        
        // Ensure we're using text value
        const answerText = typeof selectedAnswer === 'object' 
          ? selectedAnswer.text 
          : selectedAnswer;

        // Check correctness
        const isCorrect = checkCorrectAnswer(selectedAnswer, question);

        return {
          question: question.text,  // Use question text
          userAnswer: answerText || null,  // User's selected answer
          correctAnswer: question.correctAnswer,  // Correct answer from question
          isCorrect: isCorrect,  // Correctness flag
          points: isCorrect ? question.points : 0,  // Points based on correctness
          maxPoints: question.points,  // Maximum points for the question
          explanation: question.explanation  // Question explanation
        };
      });

      // Log prepared answers for debugging
      console.log('Prepared Answers for Submission:', preparedAnswers);

      // Submit quiz
      const response = await axiosInstance.post(`/api/quizzes/${quiz._id}/submit`, {
        answers: preparedAnswers,
        timeSpent: totalTimeSpent
      });

      // Handle successful submission
      setReviewMode(true);
      setScore(response.data);
      
      // Optional: show success message
      toast.success('Quiz submitted successfully!');
    } catch (error) {
      // More detailed error handling
      console.error('Quiz submission error:', error);
      
      // Check for specific error types
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.message || 
          (error.response.data.errors 
            ? Object.values(error.response.data.errors).join(', ') 
            : 'Server error');
        
        // Show error toast
        toast.error(errorMessage || 'Failed to submit quiz');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        toast.error('Error preparing quiz submission');
      }
    }
  };

  const handleReturnToCourse = () => {
    // If we're in review mode, go back to results first
    if (reviewMode) {
      setReviewMode(false);
      setCurrentQuestionIndex(0);
      return;
    }
    // Otherwise return to course
    router.push(`/students/courses/${courseId}/learn`);
  };

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/api/quizzes/module/${moduleId}`);
      const quizData = Array.isArray(response.data) ? response.data[0] : response.data;
      
      // Reset all states
      setQuiz(quizData);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnswers({});
      setScore(null);
      setReviewMode(false);
      if (quizData.duration) {
        setTimeLeft(quizData.duration * 60);
      }
      
      toast.success('Quiz reset. Good luck!');
    } catch (error) {
      console.error('Error resetting quiz:', error);
      toast.error('Failed to reset quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryQuiz = () => {
    // Reset all quiz-related states
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setScore(null);
    setReviewMode(false);
    if (quiz && quiz.duration) {
      setTimeLeft(quiz.duration * 60);
    }
    setStartTime(Date.now());
    setTotalTimeSpent(0);
  };

  // Helper function to format time spent
  const formatTimeSpent = (totalSeconds) => {
    if (totalSeconds == null || isNaN(totalSeconds)) return '0:00';
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Render quiz results with Tailwind CSS
  const renderQuizResults = () => {
    if (!score) return null;

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className={`p-6 text-center ${score.passed ? 'bg-green-50' : 'bg-red-50'}`}>
            <h2 className={`text-3xl font-bold ${score.passed ? 'text-green-800' : 'text-red-800'}`}>
              {score.passed ? 'Congratulations! You passed the quiz!' : 'Sorry, you did not pass the quiz.'}
            </h2>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-100">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">Score</div>
              <div className="text-2xl font-bold text-blue-600">{score.score}%</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">Correct Answers</div>
              <div className="text-2xl font-bold text-green-600">
                {score.questionResults.filter(result => result.isCorrect).length} / {score.questionResults.length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">Time Spent</div>
              <div className="text-2xl font-bold text-purple-600">{formatTimeSpent(score.timeSpent)}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">Points</div>
              <div className="text-2xl font-bold text-indigo-600">{score.earnedPoints} / {score.totalPoints}</div>
            </div>
          </div>

          {/* Detailed Question Results */}
          <div className="p-6 space-y-6">
            {score.questionResults.map((result, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${
                  result.isCorrect 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-semibold mr-3">Question {index + 1}</h3>
                  {result.isCorrect ? (
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">Correct</span>
                  ) : (
                    <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">Incorrect</span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-2">{result.question}</p>
                
                <div className="space-y-1">
                  <div className="flex">
                    <span className="font-medium text-gray-600 mr-2">Your Answer:</span>
                    <span className="text-gray-800">{result.userAnswer}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-600 mr-2">Correct Answer:</span>
                    <span className="text-gray-800">{result.correctAnswer}</span>
                  </div>
                </div>
                
                {result.explanation && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-1">Explanation</h4>
                    <p className="text-yellow-700">{result.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-100 p-6 flex justify-center space-x-4">
            <button 
              onClick={handleRetryQuiz}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <RefreshIcon className="h-5 w-5 mr-2" /> Retry Quiz
            </button>
            <button 
              onClick={handleReturnToCourse}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" /> Return to Course
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Quiz Not Available</h2>
          <p className="mt-4 text-lg text-gray-600">
            There are no questions available for this quiz yet.
          </p>
          <button
            onClick={handleReturnToCourse}
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
        </div>
      ) : score ? (
        renderQuizResults()
      ) : (
        <div className="quiz-container">
          {/* Quiz header */}
          <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">{quiz.title}</h1>
              {reviewMode && (
                <div className="flex items-center">
                  <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-gray-600">Review Mode</span>
                </div>
              )}
              {timeLeft && !reviewMode && (
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span className="text-lg font-semibold">
                    {formatTime(timeLeft)} remaining
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              {!reviewMode && <span>{Object.keys(answers).length} answered</span>}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-2 bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="bg-white shadow-lg rounded-2xl p-8 mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {quiz.questions[currentQuestionIndex].text}
              </h3>

              <div className="space-y-4">
                {renderQuizOptions()}
              </div>

              {/* Show explanation in review mode */}
              {reviewMode && quiz.questions[currentQuestionIndex].explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-start">
                    <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Explanation</h4>
                      <p className="text-yellow-700">{quiz.questions[currentQuestionIndex].explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-2" />
              Previous
            </button>

            {reviewMode ? (
              currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={() => setReviewMode(false)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Back to Results
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </button>
              )
            ) : currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={!Object.keys(answers).length === quiz.questions.length || isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Quiz'
                )}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>

          {/* Question navigation dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {renderProgressDots()}
          </div>
        </div>
      )}
    </div>
  );
}
