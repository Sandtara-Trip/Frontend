import { useState, useRef, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState("ID");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { code: "ID", label: "ID" },
    { code: "EN", label: "EN" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setSelectedLang(code);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 justify-center w-16 h-8 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm hover:shadow-md transition-all duration-300 text-xs"
        aria-label="Pilih Bahasa"
      >
        <FiGlobe className="text-teal-500" size={14} />
        <span className="font-medium">{selectedLang}</span>
        <svg
          className="ml-1 h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-16 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => handleSelect(opt.code)}
                className="w-full text-center px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 transition"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
