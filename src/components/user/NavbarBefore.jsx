import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdLogin, MdInfoOutline } from "react-icons/md";
import { RiUserAddLine, RiQuestionAnswerLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "react-i18next";

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
    <div className="navbar fixed top-0 left-0 w-full h-16 z-50 bg-white text-gray-700 shadow-md px-4 flex justify-between items-center">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <img src="/img/logo.png" alt="logo" className="w-12 h-12" />
        <Link to="/" className="text-2xl font-bold text-teal ml-2">
          Sandtara <span className="text-warm-orange">Trip</span>
        </Link>
      </div>

      {/* Middle - Desktop Menu */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal px-1 font-medium gap-2">
          <li className={isActive("/") ? "bg-gray-200 rounded-full" : ""}>
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-1 ${
                isActive("/") ? "font-semibold" : "hover:text-teal-500"
              }`}
            >
              <FaHome /> {t("nav.home")}
            </Link>
          </li>
          <li className={isActive("/about") ? "bg-gray-200 rounded-full" : ""}>
            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-1 ${
                isActive("/about") ? "font-semibold" : "hover:text-teal-500"
              }`}
            >
              <MdInfoOutline /> {t("nav.about")}
            </Link>
          </li>
          <li className={isActive("/weather-calender") ? "bg-gray-200 rounded-full" : ""}>
            <Link
              to="/weather-calender"
              className={`flex items-center gap-2 px-3 py-1 ${
                isActive("/weather-calender") ? "font-semibold" : "hover:text-teal-500"
              }`}
            >
              <WiDayCloudy className="text-xl" /> {t("nav.weather")}
            </Link>
          </li>
          <li className={isActive("/faq") ? "bg-gray-200 rounded-full" : ""}>
            <Link
              to="/faq"
              className={`flex items-center gap-2 px-3 py-1 ${
                isActive("/faq") ? "font-semibold" : "hover:text-teal-500"
              }`}
            >
              <RiQuestionAnswerLine /> {t("nav.faq")}
            </Link>
          </li>
        </ul>
      </div>

      {/* Right - Desktop Buttons & Mobile Hamburger */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="mr-4">
            <LanguageSelector />
          </div>
          <Link
            to="/login"
            className="btn btn-outline text-warm-orange flex items-center gap-2"
          >
            <MdLogin /> {t("auth.login")}
          </Link>
          <Link
            to="/register"
            className="btn bg-warm-orange text-white flex items-center gap-2"
          >
            <RiUserAddLine /> {t("auth.register")}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center" ref={hamburgerRef}>
          <div className="mr-4">
            <LanguageSelector />
          </div>
          <label className="btn btn-circle swap swap-rotate text-teal-500">
            <input type="checkbox" checked={isMenuOpen} onChange={toggleMenu} />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-2xl z-50"
        >
          <ul className="flex flex-col gap-1 px-4 py-4 w-full">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <FaHome /> {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <MdInfoOutline /> {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link
                to="/weather-calender"
                onClick={toggleMenu}
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <WiDayCloudy className="text-xl" /> {t("nav.weather")}
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                onClick={toggleMenu}
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <RiQuestionAnswerLine /> {t("nav.faq")}
              </Link>
            </li>
          </ul>

          <div className="flex flex-col items-stretch gap-3 pb-6 px-4">
            <Link
              to="/login"
              className="btn btn-outline text-warm-orange flex items-center justify-center gap-2"
              onClick={toggleMenu}
            >
              <MdLogin /> {t("auth.login")}
            </Link>
            <Link
              to="/register"
              className="btn bg-warm-orange text-white flex items-center justify-center gap-2"
              onClick={toggleMenu}
            >
              <RiUserAddLine /> {t("auth.register")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarBefore;
