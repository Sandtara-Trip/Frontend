import React, { useState, useEffect } from "react";
import { itemHotel } from "../../templates/hotel";
import { itemKuliner } from "../../templates/kuliner";
import axios from "axios";
import HeroWeather from "../../../components/user/heroWeather";
import FilterBar from "../../../components/user/FilterBar";
import { filterOptionsPerCategory } from "../../templates/filter";
import Section from "../../../components/user/Section";
import CategoryTabs from "../../../components/user/CategoryTabs";
import ArticleChat from "./ArticleChat";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from '../../../config/api';

const ITEMS_DEFAULT = 4;
const ITEMS_PER_PAGE = 8;

const HomePage = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [destinations, setDestinations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState({
    Wisata: "",
    Hotel: "",
    Kuliner: "",
    Semua: "",
  });

  const [selectedFilters, setSelectedFilters] = useState({
    Wisata: {},
    Hotel: {},
    Kuliner: {},
    Semua: {},
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
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        console.log('Fetching destinations from:', `${API_BASE_URL}/api/wisata`);
        const response = await axios.get(`${API_BASE_URL}/api/wisata`);
        console.log('Full API Response:', response);
        
        if (response.data.success) {
          // Get destinations from API response
          const destinationsData = response.data.data;
          console.log('Destinations data:', destinationsData);
          
          // Create an array to store transformed destinations
          const transformedData = [];
          
          // Process each destination
          for (const destination of destinationsData) {
            console.log('Processing destination:', {
              id: destination._id,
              name: destination.name || destination.nama,
              gambar: destination.gambar
            });
            
            // Fetch ratings for this destination
            let rating = 0;
            let reviewCount = 0;
            
            try {
              const reviewUrl = `${API_BASE_URL}/reviews/destination/${destination._id}`;
              console.log('Fetching reviews from:', reviewUrl);
              const reviewResponse = await axios.get(reviewUrl);
              console.log('Review response:', reviewResponse.data);
              
              if (reviewResponse.data.success) {
                rating = reviewResponse.data.data.averageRating || 0;
                reviewCount = reviewResponse.data.data.totalReviews || 0;
              }
            } catch (reviewErr) {
              console.error(`Error fetching reviews for destination ${destination._id}:`, reviewErr.response || reviewErr);
              rating = 0;
              reviewCount = 0;
            }

            // Construct image URL
            let imageUrl;
            if (destination.gambar && destination.gambar.length > 0) {
              // Check if the image URL is already a full URL (e.g. Cloudinary)
              imageUrl = destination.gambar[0].startsWith('http') 
                ? destination.gambar[0] 
                : `${API_BASE_URL}${destination.gambar[0]}`;
              console.log('Using destination image:', {
                originalPath: destination.gambar[0],
                fullUrl: imageUrl
              });
            } else {
              imageUrl = `${API_BASE_URL}/uploads/default-destination.jpg`;
              console.log('Using default image:', imageUrl);
            }
            
            // Transform destination data to match CardWisata format
            const transformedDestination = {
              id: destination._id,
              title: destination.name || destination.nama,
              description: destination.detail || destination.deskripsi,
              image: imageUrl,
              rating: rating,
              reviewCount: reviewCount,
              price: destination.price || destination.harga ? `Rp ${(destination.price || destination.harga).toLocaleString()}` : "Gratis",
              lokasi: destination.location?.address || destination.alamat || "Lokasi tidak tersedia",
              kategori: destination.kategori || "Alam",
              cuaca: destination.cuaca || "Panas"
            };
            
            console.log('Transformed destination:', transformedDestination);
            transformedData.push(transformedDestination);
          }
          
          console.log('Final transformed data:', transformedData);
          setDestinations(transformedData);
          setError(null);
        } else {
          console.error('API returned success: false', response.data);
          setError("Failed to fetch destinations");
        }
      } catch (err) {
        console.error("Error fetching destinations:", {
          error: err,
          response: err.response,
          message: err.message,
          stack: err.stack
        });
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/event`);

        if (response.data.success) {
          const eventsData = response.data.data.map(event => ({
            id: event._id,
            title: event.name,
            description: event.description,
            image: event.images && event.images.length > 0 
              ? event.images[0] // Cloudinary URL langsung digunakan
              : `${API_BASE_URL}/uploads/default-event.jpg`,
            status: event.status
          }));
          setEvents(eventsData);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents([]); // Set empty array on error
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (category, value) => {
    setSearchQuery((prev) => ({ ...prev, [category]: value }));
    setCurrentPage({ Wisata: 1, Hotel: 1, Kuliner: 1 });
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        [filterName]: value
      }
    }));
    setCurrentPage({ Wisata: 1, Hotel: 1, Kuliner: 1 });
  };

  // Filter search and apply filters
  const filterItems = (items, type, baseCategory) => {
    // Get the search query - if we're in "Semua" category, use that query, otherwise use category-specific
    const query = activeCategory === "Semua" ? searchQuery["Semua"] : searchQuery[baseCategory];
    const filters = activeCategory === "Semua" ? selectedFilters["Semua"] : selectedFilters[baseCategory];

    return items.filter((item) => {
      // Search query filter - check multiple fields
      const searchFields = [
        item.title?.toLowerCase() || '',
        item.name?.toLowerCase() || '',
        item.description?.toLowerCase() || '',
        item.lokasi?.toLowerCase() || '',
        item.location?.toLowerCase() || '',
        item.kategori?.toLowerCase() || ''
      ];
      
      const matchesSearch = !query || searchFields.some(field => field.includes(query.toLowerCase()));

      // Apply category-specific filters
      let matchesFilters = true;
      
      if (Object.keys(filters).length > 0) {
        for (const [filterName, filterValue] of Object.entries(filters)) {
          if (!filterValue) continue;

          switch (filterName) {
            case 'rating':
              const itemRating = parseFloat(item.rating) || 0;
              const filterRatingValue = parseInt(filterValue);
              matchesFilters = matchesFilters && itemRating >= filterRatingValue;
              break;
            case 'jenis':
              if (activeCategory === "Semua") {
                switch (filterValue.toLowerCase()) {
                  case 'wisata':
                    matchesFilters = matchesFilters && type === "wisata";
                    break;
                  case 'hotel':
                    matchesFilters = matchesFilters && type === "hotel";
                    break;
                  case 'kuliner':
                    matchesFilters = matchesFilters && type === "kuliner";
                    break;
                  default:
                    break;
                }
              } else {
                matchesFilters = matchesFilters && item.jenis === filterValue;
              }
              break;
            case 'kategori':
              // Check both item.kategori and item.category since the API might use either
              const itemKategori = (item.kategori || item.category || '').toLowerCase();
              matchesFilters = matchesFilters && itemKategori === filterValue.toLowerCase();
              break;
            case 'cuaca':
              const itemCuaca = (item.cuaca || '').toLowerCase();
              matchesFilters = matchesFilters && itemCuaca === filterValue.toLowerCase();
              break;
            default:
              break;
          }
        }
      }

      return matchesSearch && matchesFilters;
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

  const handleHeroNavigate = (category) => {
    setActiveCategory(category);

    setTimeout(() => {
      const sectionId =
        category === "Semua" ? "wisata" : category.toLowerCase();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleTabChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroWeather onCategoryNavigate={handleHeroNavigate} />

      <section className="relative z-10 -mt-20 px-4">
        <div className="max-w-7xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onChange={handleTabChange}
          />

          <FilterBar
            filters={filterOptionsPerCategory[activeCategory]}
            selectedFilters={selectedFilters[activeCategory]}
            onChange={handleFilterChange}
            searchQuery={searchQuery[activeCategory]}
            onSearchChange={(val) => handleSearchChange(activeCategory, val)}
          />
        </div>
      </section>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 mx-auto max-w-2xl">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {!loading && !error && categoriesToRender.map((category) => {
        let data;
        switch (category) {
          case "Wisata":
            data = filterItems(destinations, "wisata", t('categories.wisata'));
            break;
          case "Hotel":
            data = filterItems(itemHotel, "hotel", t('categories.hotel'));
            break;
          case "Kuliner":
            data = filterItems(events.filter(event => event.status === 'active'), "kuliner", t('categories.kuliner'));
            break;
          default:
            data = [];
        }

        const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
        const dataToShow = paginatedData(data, category);

        return (
          <Section
            key={category}
            title={t(`categories.${category.toLowerCase()}`)}
            id={category.toLowerCase()}
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

      <ArticleChat />
    </div>
  );
};

export default HomePage;
