const ProgressBar = ({ completed, total }) => {
  const percentage = (completed / total) * 100;
  return (
    <div className="w-full bg-gray-300 rounded-full h-1 mt-2">
      <div
        className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 h-1 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
