import React from "react";

const TimePicker = ({ 
  label, 
  value, 
  onChange, 
  name,
  required = false,
  className = ""
}) => {
  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-2">*</span>}
        </label>
      )}
      <input
        type="time"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFBF69] focus:border-[#FFBF69] transition-colors duration-200"
      />
    </div>
  );
};

export default TimePicker;
