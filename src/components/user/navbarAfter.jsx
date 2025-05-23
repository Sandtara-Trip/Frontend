import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { WiDayCloudy } from "react-icons/wi";
import { FiLogOut } from "react-icons/fi";
import { RiUserAddLine, RiQuestionAnswerLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdInfoOutline, MdReceiptLong } from "react-icons/md";
import LanguageSelector from "./languageSelector";

const NavbarAfter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();

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
    <div className="navbar fixed top-0 left-0 w-full bg-white text-black shadow-md px-4 justify-between z-50">
      {/* Kiri */}
      <div className="flex items-center gap-2">
        <div className="lg:hidden flex items-center mr-2" ref={hamburgerRef}>
          <label className="btn btn-circle swap swap-rotate">
            <input
              type="checkbox"
              onChange={() => setIsMenuOpen(!isMenuOpen)}
              checked={isMenuOpen}
            />
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
        <img src="img/logo.png" alt="logo" className="w-12 h-12" />
        <Link to="/" className="text-2xl font-bold text-teal ml-2 hidden sm:block">
          Sandtara <span className="text-warm-orange">Trip</span>
        </Link>
      </div>

      {/* Tengah */}
      <div className="flex-1 hidden lg:flex justify-center">
        <ul className="menu menu-horizontal font-medium text-black gap-2">
          <li className={isActive("/") ? "bg-gray-100 rounded-full" : ""}>
            <Link to="/" className={`px-4 py-1 ${isActive("/") && "font-semibold"}`}>
              <FaHome className="inline mr-1" /> Beranda
            </Link>
          </li>
          <li className={isActive("/about") ? "bg-gray-100 rounded-full" : ""}>
            <Link to="/about" className={`px-4 py-1 ${isActive("/about") && "font-semibold"}`}>
              <MdInfoOutline className="inline mr-1" /> Tentang Kami
            </Link>
          </li>
          <li className={isActive("/cuaca") ? "bg-gray-100 rounded-full" : ""}>
            <Link to="/cuaca" className={`px-4 py-1 ${isActive("/cuaca") && "font-semibold"}`}>
              <WiDayCloudy className="inline mr-1 text-xl" /> Cuaca
            </Link>
          </li>
          <li className={isActive("/faq") ? "bg-gray-100 rounded-full" : ""}>
            <Link to="/faq" className={`px-4 py-1 ${isActive("/faq") && "font-semibold"}`}>
              <RiQuestionAnswerLine className="inline mr-1" /> FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* Kanan */}
      <div className="flex gap-2 items-center">
        <LanguageSelector />
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src="https://i.pravatar.cc/150?img=32" alt="profile" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white text-black rounded-box w-52 p-2 shadow z-[10]"
          >
            <li>
              <Link to="/akun" className="hover:text-teal-500 flex items-center gap-2">
                <RiUserAddLine /> Informasi Akun
              </Link>
            </li>
            <li>
              <Link to="/pemesanan" className="hover:text-teal-500 flex items-center gap-2">
                <MdReceiptLong /> Informasi Pemesanan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-2xl z-50 cursor-pointer text-black"
        >
          <ul className="flex flex-col py-4 px-4 gap-2">
            <li className="w-full">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <FaHome /> Beranda
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/about"
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <MdInfoOutline /> Tentang Kami
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/cuaca"
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <WiDayCloudy className="text-xl" /> Cuaca
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/faq"
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-md transition"
              >
                <RiQuestionAnswerLine /> FAQ
              </Link>
            </li>
            <li className="pt-2">
              <button
                id="logout"
                className="btn btn-outline btn-error w-full flex items-center gap-2 justify-center rounded-md"
              >
                <FiLogOut /> Keluar
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarAfter;
