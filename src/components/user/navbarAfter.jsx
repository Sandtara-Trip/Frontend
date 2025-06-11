import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WiDayCloudy } from "react-icons/wi";
import { FiLogOut } from "react-icons/fi";
import { RiUserAddLine, RiQuestionAnswerLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdInfoOutline, MdReceiptLong } from "react-icons/md";
import LanguageSelector from "./languageSelector";
import { useTranslation } from 'react-i18next';

const NavbarAfter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedPhoto = localStorage.getItem("userPhoto");

    if (storedName) setName(storedName);
    if (storedPhoto) setPhoto(storedPhoto);
    
    // Listen for storage changes to update user data in real-time
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("userName");
      const updatedPhoto = localStorage.getItem("userPhoto");
      
      if (updatedName) setName(updatedName);
      if (updatedPhoto) setPhoto(updatedPhoto);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");
    navigate("/login");
  };

  return (
    <div className="navbar bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Left */}
      <div className="flex-none">
        <Link to="/" className="flex items-center">
          <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-warm-orange">
            Sandtara Trip
          </span>
        </Link>
      </div>

      {/* Center */}
      <div className="flex-1 hidden lg:flex justify-center">
        <ul className="menu menu-horizontal font-medium text-black gap-2">
          <li className={isActive("/") ? "bg-gray-100 rounded-full" : ""}>
            <Link
              to="/"
              className={`px-4 py-1 ${isActive("/") && "font-semibold"}`}
            >
              <FaHome className="inline mr-1" /> {t('nav.home')}
            </Link>
          </li>
          <li className={isActive("/about") ? "bg-gray-100 rounded-full" : ""}>
            <Link
              to="/about"
              className={`px-4 py-1 ${isActive("/about") && "font-semibold"}`}
            >
              <MdInfoOutline className="inline mr-1" /> {t('nav.about')}
            </Link>
          </li>
          <li
            className={
              isActive("/weather-calender") ? "bg-gray-100 rounded-full" : ""
            }
          >
            <Link
              to="/weather-calender"
              className={`px-4 py-1 ${
                isActive("/weather-calender") && "font-semibold"
              }`}
            >
              <WiDayCloudy className="inline mr-1 text-xl" /> {t('nav.weather')}
            </Link>
          </li>
          <li className={isActive("/faq") ? "bg-gray-100 rounded-full" : ""}>
            <Link
              to="/faq"
              className={`px-4 py-1 ${isActive("/faq") && "font-semibold"}`}
            >
              <RiQuestionAnswerLine className="inline mr-1" /> {t('nav.faq')}
            </Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="flex gap-2 items-center">
        <LanguageSelector />
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 h-10 rounded-full bg-light-orange relative overflow-hidden">
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                  {name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white text-black rounded-box w-52 p-2 shadow z-[10]"
          >
            <li>
              <Link to={`/user-profile/${userId}`} className="flex items-center gap-2">
                <RiUserAddLine />
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500"
              >
                <FiLogOut />
                {t('auth.logout')}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile menu button */}
        <button
          ref={hamburgerRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden btn btn-ghost btn-circle"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-2xl z-50 cursor-pointer text-black"
        >
          <ul className="flex flex-col py-4 px-4 gap-2">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
              >
                <FaHome /> {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
              >
                <MdInfoOutline /> {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link
                to="/weather-calender"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
              >
                <WiDayCloudy className="text-xl" /> {t('nav.weather')}
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition"
              >
                <RiQuestionAnswerLine /> {t('nav.faq')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarAfter;
