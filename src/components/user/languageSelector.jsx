import { useState, useRef, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../config/api';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || "id");
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState([
    { code: "id", name: "Indonesia", nativeName: "Indonesia", flag: "🇮🇩", isDefault: true, isActive: true },
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", isDefault: false, isActive: true }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lang`);
        if (Array.isArray(response.data)) {
          setLanguages(response.data);
          // Set default language if available
          const defaultLang = response.data.find(lang => lang.isDefault)?.code || "id";
          handleSelect(defaultLang);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching languages:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

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
    i18n.changeLanguage(code.toLowerCase());
    setOpen(false);
  };

  if (loading) {
    return (
      <div className="w-16 h-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Find the currently selected language object
  const currentLang = languages.find(lang => lang.code.toLowerCase() === selectedLang.toLowerCase()) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 justify-center w-20 h-8 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm hover:shadow-md transition-all duration-300 text-xs"
        aria-label="Pilih Bahasa"
      >
        <FiGlobe className="text-teal-500" size={14} />
        <span className="font-medium">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
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

      {open && languages.length > 0 && (
        <div className="absolute z-50 mt-1 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.filter(lang => lang.isActive).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="w-full text-left px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
