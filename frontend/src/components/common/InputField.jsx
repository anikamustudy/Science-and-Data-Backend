import React from 'react';

const InputField = ({ label, type = 'text', className, ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded"
        {...props}
      />
    </div>
  );
};

export default InputField;
