import React, { useState } from "react";

const MultiSelect = ({
  options = [],
  selected = [],
  onChange,
  label = "Pilih Data",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(newSelected);
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 mb-1">{label}</label>

      <div
        className="border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0
          ? selected
              .map((val) => {
                const opt = options.find((o) => o.value === val);
                return opt?.label || val;
              })
              .join(", ")
          : "Pilih..."}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full border rounded bg-white shadow max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <div key={opt.value} className="px-3 py-2 hover:bg-gray-100">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(opt.value)}
                  onChange={() => toggleOption(opt.value)}
                />
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
