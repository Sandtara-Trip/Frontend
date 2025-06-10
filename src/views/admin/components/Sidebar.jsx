import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHotel,
  FaBed,
  FaMapMarkedAlt,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaCalendarAlt
} from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";

const menuItems = [
  { id: "dashboard", path: "/admin", icon: <FaHome />, label: "Dashboard" },
  { id: "users", path: "/admin/users", icon: <FaUsers />, label: "Users" },
  { id: "hotels", path: "/admin/hotels", icon: <FaHotel />, label: "Hotels" },
  { id: "rooms", path: "/admin/rooms", icon: <FaBed />, label: "Rooms" },
  { id: "wisata", path: "/admin/wisata", icon: <FaMapMarkedAlt />, label: "Wisata" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-white fixed top-0 left-0 flex flex-col shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <img src="/img/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold text-[#FFBF69]">
          Sandtara<span className="text-teal-600">Trip</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition text-sm ${
              isActive(item.path)
                ? "bg-[#FFBF69] text-black font-normal"
                : "text-black hover:bg-[#FFF2E3]"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-full text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Admin Info */}
      <div className="px-6 py-4 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <FaUser className="text-[#FFA858]" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{auth.user?.name || 'Admin'}</span>
            <span className="text-xs text-gray-600">{auth.user?.email || 'admin@example.com'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 