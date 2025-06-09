import React, { useState } from "react";
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    auth.logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-[#CBF3F0] flex items-center justify-end px-6 shadow-sm z-10">
      <div className="flex items-center gap-3 text-sm text-gray-800 relative">
        <FaUserCircle className="text-[#FFA858] text-2xl" />
        <div className="flex flex-col">
          <span className="font-medium">{auth.user?.name || 'Admin'}</span>
          <span className="text-xs text-gray-600">{auth.user?.email || 'admin@example.com'}</span>
        </div>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none"
        >
          <FaChevronDown className={`text-[#FFA858] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaSignOutAlt className="text-[#FFA858]" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar; 