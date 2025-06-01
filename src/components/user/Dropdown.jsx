import React from "react";

const Dropdown = ({ label, options, selected, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="block text-gray-700 mb-1">{label}</label>}
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-orange text-gray-700"
      >
        <option value="" disabled>
          Pilih {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
