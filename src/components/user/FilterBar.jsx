import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const FilterBar = ({
  filters,
  selectedFilters,
  onChange,
  searchQuery,
  onSearchChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Fungsi hapus semua filter
  const handleClearAllFilters = () => {
    if (filters) {
      filters.forEach((filter) => onChange(filter.name, ""));
    }
  };

  // Fungsi hapus search
  const handleClearSearch = () => {
    if (searchQuery) {
      onSearchChange("");
    }
  };

  // Cek apakah ada filter yang aktif (nilai bukan kosong)
  const isAnyFilterActive = selectedFilters && Object.values(selectedFilters).some(
    (value) => value !== ""
  );

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div
          className={`w-full lg:w-auto ${
            showFilters ? "block" : "hidden"
          } lg:flex flex-wrap gap-6`}
        >
          {filters && filters.map((filter) => (
            <div
              key={filter.name}
              className="flex flex-col min-w-[160px] w-full sm:w-auto"
            >
              <label className="text-sm font-semibold text-gray-700 mb-2">
                {filter.label}
              </label>
              <select
                className="select select-bordered rounded-full focus:outline-none"
                value={selectedFilters[filter.name] || ""}
                onChange={(e) => onChange(filter.name, e.target.value)}
              >
                <option value="">Semua</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Tombol Clear Semua Filter */}
          {isAnyFilterActive && (
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="p-2 rounded-full hover:bg-red-100 transition text-gray-400 hover:text-red-500"
                aria-label="Hapus semua filter"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="w-full lg:w-[350px]">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Cari apa hari ini?
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-warm-orange focus:ring-2 focus:ring-warm-orange rounded-full py-2 pl-10 pr-10 text-gray-800 placeholder:text-gray-400 focus:outline-none"
              placeholder="Temukan yang kamu cari..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>

            {/* Tombol Clear Search */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                aria-label="Clear search"
              >
                <IoClose className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Tampilkan Filter (Mobile only) */}
      <div className="mt-4 lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm font-semibold text-white bg-teal px-4 py-2 rounded-full hover:bg-light-teal transition"
        >
          {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
