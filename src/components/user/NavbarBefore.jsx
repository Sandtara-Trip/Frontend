import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdLogin, MdInfoOutline } from "react-icons/md";
import { RiUserAddLine, RiQuestionAnswerLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import LanguageSelector from "./languageSelector";
import { WiDayCloudy } from "react-icons/wi";
import { useTranslation } from 'react-i18next';

const NavbarBefore = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-warm-orange">
                Sandtara Trip
              </span>
            </Link>
          </div>

          {/* Center */}
          <div className="hidden lg:flex items-center">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                    isActive("/")
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <FaHome className="mr-1" />
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                    isActive("/about")
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <MdInfoOutline className="mr-1" />
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/weather-calender"
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                    isActive("/weather-calender")
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <WiDayCloudy className="mr-1 text-xl" />
                  {t('nav.weather')}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={`flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                    isActive("/faq")
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <RiQuestionAnswerLine className="mr-1" />
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-warm-orange bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warm-orange"
              >
                <MdLogin className="mr-1" />
                {t('auth.login')}
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-warm-orange hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warm-orange"
              >
                <RiUserAddLine className="mr-1" />
                {t('auth.register')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                ref={hamburgerRef}
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-warm-orange"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden" ref={menuRef}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FaHome className="inline mr-2" />
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/about")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <MdInfoOutline className="inline mr-2" />
              {t('nav.about')}
            </Link>
            <Link
              to="/weather-calender"
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/weather-calender")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <WiDayCloudy className="inline mr-2" />
              {t('nav.weather')}
            </Link>
            <Link
              to="/faq"
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/faq")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <RiQuestionAnswerLine className="inline mr-2" />
              {t('nav.faq')}
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                <MdLogin className="inline mr-2" />
                {t('auth.login')}
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                <RiUserAddLine className="inline mr-2" />
                {t('auth.register')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarBefore;
