import React from "react";

const InputField = ({ label, type = "text", placeholder, name, value, onChange, required = true }) => {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border-[2px] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-warm-orange"
      />
    </div>
  );
};

export default InputField;
