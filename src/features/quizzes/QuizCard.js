// src/features/quizzes/QuizCard.js
const QuizCard = ({ quiz }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">{quiz.title}</h3>
      <p className="mt-2">{quiz.description}</p>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;
