import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHotel,
  FaBed,
  FaMapMarkedAlt,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

const menuItems = [
  // { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "Hotel", path: "/hotel", icon: <FaHotel /> },
  { name: "Room", path: "/room", icon: <FaBed /> },
  { name: "Wisata", path: "/wisata", icon: <FaMapMarkedAlt /> },
  { name: "Order", path: "/order", icon: <FaShoppingCart /> },
  { name: "User", path: "/user", icon: <FaUser /> },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-white fixed top-0 left-0 flex flex-col shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4">
        <img src="/img/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold text-[#FFBF69]">
          Sandtara<span className="text-teal-600">Trip</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition text-sm ${
              isActive(item.path)
                ? "bg-[#FFBF69] text-black font-normal"
                : "text-black hover:bg-[#FFF2E3]"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
