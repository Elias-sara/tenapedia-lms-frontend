import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import Button from "./Button";

const CourseCard = ({
  title,
  description,
  image,
  buttonText,
  onClick,
  icon,
  rating = 0,
  level = "Beginner",
  price = "Free",
  duration = 3,
  isFree = true,
  tags = [],
  courseId,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 max-w-sm mx-auto">
      <img
        src={image || "/images/default-course-image.jpg"} // Ensure fallback image path
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <p className="text-base text-gray-600">{description}</p>
        <div className="flex space-x-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-yellow-200 text-yellow-800 text-xs py-1 px-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center mt-4">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>
              {index < rating ? (
                <FaStar className="text-yellow-500 text-xs" />
              ) : (
                <FaRegStar className="text-gray-400 text-xs" />
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <Button
            text={buttonText}
            onClick={() => onClick(courseId)} // Pass the courseId when enrolling
            className={`py-2 px-6 text-lg rounded-lg ${
              isFree
                ? "bg-green-500 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          />
          {icon && <span className="text-xl">{icon}</span>}
          <span
            className={`cursor-pointer ${
              isBookmarked ? "text-red-500" : "text-gray-500"
            }`}
            onClick={toggleBookmark}
          >
            {isBookmarked ? <FaHeart /> : <FaRegHeart />}
          </span>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  rating: PropTypes.number,
  level: PropTypes.string,
  price: PropTypes.string,
  duration: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  courseId: PropTypes.string,
};

export default CourseCard;
