// components/Course/CourseDetails.js
const CourseDetails = ({ course }) => (
  <div>
    <h2 className="text-2xl font-bold">{course.title}</h2>
    <p className="text-gray-600">{course.description}</p>
  </div>
);

export default CourseDetails;
