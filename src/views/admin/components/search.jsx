// Search.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ placeholder = "Cari...", onChange, value }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="pl-9 pr-2 py-2 border border-orange-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
