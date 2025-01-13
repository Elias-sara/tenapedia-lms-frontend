// // components/Common/ErrorMessage.js
// const ErrorMessage = ({ message, onRetry }) => (
//   <div className="flex flex-col items-center justify-center h-screen">
//     <p className="text-red-500">Error: {message}</p>
//     <button
//       onClick={onRetry}
//       className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//     >
//       Retry
//     </button>
//   </div>
// );

// export default ErrorMessage;
// src/components/common/ErrorMessage.jsx

import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Error</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;