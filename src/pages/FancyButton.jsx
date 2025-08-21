import React from 'react';

const FancyButton = ({ children, large = false, variant = 'primary' }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg";
  
  const largeStyles = large ? "text-3xl px-8 py-4" : "text-base";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 border border-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 border border-gray-700",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 border border-green-700",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-red-700",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500"
  };

  const className = `${baseStyles} ${largeStyles} ${variantStyles[variant]}`;

  return (
    <button className={className}>
      {children}
    </button>
  );
};

export default FancyButton;
