const Button = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white py-2 px-6 rounded-lg shadow-lg hover:from-indigo-600 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 ${className}`}
  >
    {text}
  </button>
);

export default Button;
