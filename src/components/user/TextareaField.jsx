// components/form/TextareaField.jsx
import React from "react";

const TextareaField = ({ label, name, value, onChange, placeholder = "" }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-2 border-[2px] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-warm-orange"
      ></textarea>
    </div>
  );
};

export default TextareaField;
