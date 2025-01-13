// components/Course/CoursesList.js
import { useRouter } from "next/router";

const CoursesList = ({ courses, onEnroll }) => {
  const router = useRouter();

  return (
    <ul>
      {courses.map((course) => (
        <li key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <button onClick={() => router.push(`/courses/${course._id}`)}>
            View Course
          </button>
          {!course.isEnrolled && (
            <button onClick={() => onEnroll(course._id)}>Enroll</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CoursesList;
