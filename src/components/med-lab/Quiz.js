// // src/components/med-lab/Quiz.js
// const Quiz = ({ quizData, onSubmit }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h3 className="text-2xl font-bold mb-4">Quiz: {quizData.title}</h3>
//       <ul>
//         {quizData.questions.map((question, index) => (
//           <li key={question._id} className="mb-4">
//             <p className="font-semibold">
//               {index + 1}. {question.questionText}
//             </p>
//             <div className="mt-2">
//               {question.options.map((option, i) => (
//                 <div key={i} className="flex items-center">
//                   <input
//                     type="radio"
//                     name={`question-${question._id}`}
//                     value={option}
//                   />
//                   <label className="ml-2">{option}</label>
//                 </div>
//               ))}
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={onSubmit}
//         className="mt-4 bg-primary text-white px-4 py-2 rounded"
//       >
//         Submit Quiz
//       </button>
//     </div>
//   );
// };

// export default Quiz;
