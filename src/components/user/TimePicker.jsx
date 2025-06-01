import React from "react";

const TimePicker = ({ label, value, onChange, name }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="block text-gray-700 mb-1">{label}</label>}
      <input
        type="time"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
};

export default TimePicker;
