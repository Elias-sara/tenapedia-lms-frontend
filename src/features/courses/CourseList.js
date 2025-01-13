import React from "react";
import Card from "../components/Card";

const courses = [
  { id: 1, title: "Course 1", description: "Description 1" },
  { id: 2, title: "Course 2", description: "Description 2" },
];

const CourseList = () => (
  <div>
    {courses.map((course) => (
      <Card
        key={course.id}
        title={course.title}
        description={course.description}
      />
    ))}
  </div>
);

export default CourseList;
