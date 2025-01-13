import React from "react";
import Link from "next/link";

const ResourceSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 py-16 md:py-20">
      <div className="container mx-auto px-4 text-center space-y-10">
        {/* Introductory Card with gradient background */}
        <div className="bg-gradient-to-r from-[#1a80b6] to-[#2196f3] text-white py-16 md:py-24 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a80b6]/80 to-[#2196f3]/80 opacity-90"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Welcome to Tenapedia: Your Trusted Resource for Health and Medical
              Knowledge
            </h2>
            <p className="text-lg md:text-xl mb-6 font-normal text-white/90">
              Are you a healthcare professional, medical student, or someone
              passionate about health education? Tenapedia is your go-to platform
              for in-depth knowledge, useful resources, and expert advice across a
              range of health and medical subjects.
            </p>

            {/* Join for Free Button */}
            <Link
              href="/auth/register"
              className="bg-[#fb3466] text-white py-3 px-8 rounded-full text-xl font-extrabold 
              hover:bg-white hover:text-[#1a80b6] transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Join for Free
            </Link>
          </div>
        </div>

        <h3 className="text-3xl font-semibold mb-6 text-gray-800">
          Empowering Your Health and Medical Journey in 2024
        </h3>
        <p className="text-xl mb-12 text-gray-600 max-w-3xl mx-auto">
          Unveiling Your Path to Medical Excellence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Clinical Practice Guidelines */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
            border-l-4 border-[#1a80b6] hover:translate-y-[-10px] group">
            <h3 className="text-2xl font-semibold mb-4 text-[#1a80b6] group-hover:text-opacity-80">
              Clinical Practice Guidelines
            </h3>
            <p className="text-gray-600 mb-4">
              Access the latest clinical practice guidelines for various medical
              specialties, ensuring you are always up-to-date with the best
              practices.
            </p>
            <Link
              href="/path/to/guidelines"
              className="text-[#1a80b6] hover:text-purple-500 font-semibold"
            >
              View Guidelines
            </Link>
          </div>

          {/* Card 2: Medical Textbooks */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
            border-l-4 border-[#fb3466] hover:translate-y-[-10px] group">
            <h3 className="text-2xl font-semibold mb-4 text-[#fb3466] group-hover:text-opacity-80">
              Medical Textbooks
            </h3>
            <p className="text-gray-600 mb-4">
              Browse through a collection of essential medical textbooks for
              healthcare professionals, curated for in-depth learning and
              references.
            </p>
            <Link
              href="/path/to/textbooks"
              className="text-[#1a80b6] hover:text-purple-500 font-semibold"
            >
              Explore Textbooks
            </Link>
          </div>

          {/* Card 3: Online Medical Courses */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
            border-l-4 border-[#2ecc71] hover:translate-y-[-10px] group">
            <h3 className="text-2xl font-semibold mb-4 text-[#2ecc71] group-hover:text-opacity-80">
              Online Medical Courses
            </h3>
            <p className="text-gray-600 mb-4">
              Enroll in accredited online courses to enhance your knowledge and
              skills in various healthcare fields, from basic to advanced
              topics.
            </p>
            <Link
              href="/path/to/courses"
              className="text-[#1a80b6] hover:text-purple-500 font-semibold"
            >
              Discover Courses
            </Link>
          </div>

          {/* Card 4: Medical Research Papers */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
            border-l-4 border-[#f39c12] hover:translate-y-[-10px] group">
            <h3 className="text-2xl font-semibold mb-4 text-[#f39c12] group-hover:text-opacity-80">
              Medical Research Papers
            </h3>
            <p className="text-gray-600 mb-4">
              Access the latest research papers on medical advancements and
              studies, and stay informed about the most recent findings in
              healthcare.
            </p>
            <Link
              href="/path/to/research"
              className="text-[#1a80b6] hover:text-purple-500 font-semibold"
            >
              Read Research Papers
            </Link>
          </div>

          {/* Card 5: Healthcare News */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
            border-l-4 border-[#8e44ad] hover:translate-y-[-10px] group">
            <h3 className="text-2xl font-semibold mb-4 text-[#8e44ad] group-hover:text-opacity-80">
              Healthcare News
            </h3>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest news in healthcare and medical
              practices, with timely insights and news articles.
            </p>
            <Link
              href="/path/to/news"
              className="text-[#1a80b6] hover:text-purple-500 font-semibold"
            >
              Check News
            </Link>
          </div>

          {/* Card 6: Medical Webinars & Events */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
            border-l-4 border-[#3498db] hover:translate-y-[-10px] group">
            <h3 className="text-2xl font-semibold mb-4 text-[#3498db] group-hover:text-opacity-80">
              Medical Webinars & Events
            </h3>
            <p className="text-gray-600 mb-4">
              Join live webinars and events hosted by medical professionals and
              experts to learn directly from those shaping the industry.
            </p>
            <Link
              href="/path/to/webinars"
              className="text-[#1a80b6] hover:text-purple-500 font-semibold"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>

        {/* Exam Preparation and Medical Education */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Exam Preparation & Medical Education Resources
          </h3>
          <p className="text-lg text-center mb-10 text-gray-600 max-w-3xl mx-auto">
            Tenapedia provides a wide range of resources to help you prepare for
            medical exams and enhance your learning experience. Check out these
            additional features and resources:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exam Preparation */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
              border-l-4 border-[#1a80b6] hover:translate-y-[-10px] group">
              <h3 className="text-2xl font-semibold mb-4 text-[#1a80b6] group-hover:text-opacity-80">
                Exam Preparation
              </h3>
              <p className="text-gray-600 mb-4">
                Get access to practice exams, flashcards, and tips to help you
                prepare for professional exams such as NCLEX-RN, USMLE, and
                Medical Licensing Exams.
              </p>
              <Link
                href="/path/to/exam-prep"
                className="text-[#1a80b6] hover:text-purple-500 font-semibold"
              >
                Start Preparing
              </Link>
            </div>

            {/* Personalized Feedback */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
              border-l-4 border-[#fb3466] hover:translate-y-[-10px] group">
              <h3 className="text-2xl font-semibold mb-4 text-[#fb3466] group-hover:text-opacity-80">
                Personalized Feedback
              </h3>
              <p className="text-gray-600 mb-4">
                Receive real-time feedback on your progress, helping you focus
                on areas that need improvement and track your success.
              </p>
              <Link
                href="/path/to/feedback"
                className="text-[#1a80b6] hover:text-purple-500 font-semibold"
              >
                Learn More
              </Link>
            </div>

            {/* Scenario-Based Learning */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
              border-l-4 border-[#2ecc71] hover:translate-y-[-10px] group">
              <h3 className="text-2xl font-semibold mb-4 text-[#2ecc71] group-hover:text-opacity-80">
                Scenario-Based Learning
              </h3>
              <p className="text-gray-600 mb-4">
                Engage with real-world clinical case studies and scenarios to
                sharpen your problem-solving and decision-making skills.
              </p>
              <Link
                href="/path/to/case-studies"
                className="text-[#1a80b6] hover:text-purple-500 font-semibold"
              >
                Explore Scenarios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceSection;
