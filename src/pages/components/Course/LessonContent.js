// components/Course/LessonContent.js
const LessonContent = ({ lesson }) => (
  <div>
    <h3 className="text-xl font-bold">{lesson.title}</h3>
    <p className="text-gray-600">{lesson.content}</p>
    {lesson.videoUrl && (
      <div className="mt-4">
        <video
          controls
          className="w-full rounded"
          src={lesson.videoUrl}
        ></video>
      </div>
    )}
    {lesson.resources?.length > 0 && (
      <div className="mt-4">
        <h4 className="font-bold">Resources:</h4>
        <ul className="list-disc list-inside">
          {lesson.resources.map((resource, index) => (
            <li key={`${resource}-${index}`}>
              <a
                href={resource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Resource {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default LessonContent;
