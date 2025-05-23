import React from "react";

const CategoryTabs = ({ activeCategory, onChange }) => {
  const categories = ["Semua", "Wisata", "Hotel", "Kuliner"];

  return (
    <nav className="flex gap-4 mb-4 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-3xl font-medium text-gray-800 transition whitespace-nowrap ${
            activeCategory === cat ? "bg-white/70" : "bg-white/30 hover:bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryTabs;
