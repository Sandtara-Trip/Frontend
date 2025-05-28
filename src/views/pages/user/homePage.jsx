import React, { useState, useEffect } from "react";
import NavbarBefore from "../../../components/user/NavbarBefore";
import NavbarAfter from "../../../components/user/navbarAfter";
import Footer from "../../../components/user/footer";
import { CardGrid } from "../../../components/user/card";
import { itemWisata } from "../../templates/wisata";
import { itemHotel } from "../../templates/hotel";
import { itemKuliner } from "../../templates/kuliner";
import HeroWeather from "../../../components/user/heroWeather";
import FilterBar from "../../../components/user/FilterBar";
import { filterOptionsPerCategory } from "../../templates/filter";
import Section from "../../../components/user/Section";
import CategoryTabs from "../../../components/user/CategoryTabs";
import Chatbot from "./chatbot";

const ITEMS_DEFAULT = 4;
const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [filters, setFilters] = useState({
    Wisata: {},
    Hotel: {},
    Kuliner: {},
    Semua: {},
  });
  const [searchQuery, setSearchQuery] = useState({
    Wisata: "",
    Hotel: "",
    Kuliner: "",
    Semua: "",
  });
  const [showAll, setShowAll] = useState({
    Wisata: false,
    Hotel: false,
    Kuliner: false,
  });
  const [currentPage, setCurrentPage] = useState({
    Wisata: 1,
    Hotel: 1,
    Kuliner: 1,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleFilterChange = (category, name, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: { ...prev[category], [name]: value },
    }));
    setCurrentPage({ Wisata: 1, Hotel: 1, Kuliner: 1 });
  };

  const handleSearchChange = (category, value) => {
    setSearchQuery((prev) => ({ ...prev, [category]: value }));
    setCurrentPage({ Wisata: 1, Hotel: 1, Kuliner: 1 });
  };

  const filterItems = (items, type, baseCategory) => {
    const filter = filters[baseCategory];
    const query = searchQuery[baseCategory];

    return items.filter((item) => {
      const matchesJenis = filter.jenis ? filter.jenis === type : true;
      const matchesRating = filter.rating
        ? item.rating?.toString() === filter.rating ||
          item.bintang?.toString() === filter.rating
        : true;
      const matchesSearch = query
        ? item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.name?.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesJenis && matchesRating && matchesSearch;
    });
  };

  const handleToggleShowAll = (category) => {
    setShowAll((prev) => ({ ...prev, [category]: !prev[category] }));
    setCurrentPage((prev) => ({ ...prev, [category]: 1 }));
  };

  const handlePageChange = (category, page) => {
    setCurrentPage((prev) => ({ ...prev, [category]: page }));
  };

  const paginatedData = (data, category) => {
    if (!showAll[category]) return data.slice(0, ITEMS_DEFAULT);

    const start = (currentPage[category] - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  const categoriesToRender =
    activeCategory === "Semua"
      ? ["Wisata", "Hotel", "Kuliner"]
      : [activeCategory];

  return (
    <div>
      {/* NAVBAR */}
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      {/* HERO SECTION */}
      <HeroWeather />

      {/* Category Tabs + Filter */}
      <section className="relative z-10 -mt-20 px-4">
        <div className="max-w-7xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <FilterBar
            filters={filterOptionsPerCategory[activeCategory]}
            selectedFilters={filters[activeCategory]}
            onChange={(name, val) =>
              handleFilterChange(activeCategory, name, val)
            }
            searchQuery={searchQuery[activeCategory]}
            onSearchChange={(val) => handleSearchChange(activeCategory, val)}
          />
        </div>
      </section>

      {/* Sections per Category */}
      {categoriesToRender.map((category) => {
        const filteredData =
          activeCategory === "Semua"
            ? filterItems(
                category === "Wisata"
                  ? itemWisata
                  : category === "Hotel"
                  ? itemHotel
                  : itemKuliner,
                category,
                "Semua"
              )
            : filterItems(
                category === "Wisata"
                  ? itemWisata
                  : category === "Hotel"
                  ? itemHotel
                  : itemKuliner,
                category,
                category
              );

        const totalPages = Math.ceil(
          filteredData.length /
            (showAll[category] ? ITEMS_PER_PAGE : ITEMS_DEFAULT)
        );

        const dataToShow = paginatedData(filteredData, category);

        return (
          <Section
            key={category}
            title={category}
            data={dataToShow}
            background="bg-white"
            showAll={showAll[category]}
            onToggleShowAll={() => handleToggleShowAll(category)}
            currentPage={currentPage[category]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(category, page)}
          />
        );
      })}

      <Chatbot/>

      <Footer />
    </div>
  );
};

export default HomePage;
