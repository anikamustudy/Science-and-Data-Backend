import React from 'react';

const Label = ({ children, className, ...props }) => {
  return (
    <label
      className={`block text-gray-700 font-bold mb-2 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
