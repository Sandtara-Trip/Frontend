import React from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-[#CBF3F0] flex items-center justify-end px-6 shadow-sm z-10">
      <div className="flex items-center gap-3 text-sm text-gray-800">
        <FaUserCircle className="text-[#FFA858] text-2xl" />
        <div className="flex flex-col">
          <span className="font-medium">Admin</span>
          <span className="text-xs text-gray-600">admin123@gmail.com</span>
        </div>
        <FaChevronDown className="text-[#FFA858]" />
      </div>
    </div>
  );
};

export default Navbar;
