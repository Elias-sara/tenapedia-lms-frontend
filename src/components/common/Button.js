import React from 'react';

const Button = ({ href, children, onClick, className = "" }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`bg-yellow-500 text-gray-800 py-3 px-8 rounded-full text-xl hover:bg-yellow-400 ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
