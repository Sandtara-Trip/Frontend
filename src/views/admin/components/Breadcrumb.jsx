import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="text-sm mb-6">
      <ol className="flex items-center space-x-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link to={item.href} className="hover:underline text-black">
                {item.label}
              </Link>
            ) : (
              <span className="text-orange-400 font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <FaChevronRight className="mx-2 text-gray-400 text-xs" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
