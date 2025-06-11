import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slides } from "../../views/templates/slides";
import BackgroundSlider from "./BackgroundSlider";
import TodayWeather from "./TodayWeather";
import CardSlider from "./CardSlider";
import useHotelData from "../../hooks/useHotelData";
import useDestinationData from "../../hooks/useDestinationData";
import { fetchWeatherData, transformWeatherData } from "../../services/weatherService";

const formatDateToIndonesian = (dateString) => {
  if (!dateString) return "";
  const [dd, mm, yyyy] = dateString.split("/").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

const HeroWeather = ({ onCategoryNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoggedIn] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { hotels, loading: hotelsLoading } = useHotelData();
  const { destinations, loading: destinationsLoading } = useDestinationData();

  const navigate = useNavigate();

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching weather data...');
        const data = await fetchWeatherData();
        console.log('Raw weather data:', data);
        
        const transformedData = transformWeatherData(data);
        console.log('Transformed weather data:', transformedData);
        
        if (!transformedData) {
          throw new Error('Failed to transform weather data');
        }
        
        setWeatherData(transformedData);
      } catch (error) {
        console.error('Error loading weather data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  const handleButtonClick = (route) => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk mengakses fitur ini.");
      return;
    }

    const hash = route.split("#")[1];
    if (hash && onCategoryNavigate) {
      const categoryMap = {
        semua: "Semua",
        wisata: "Wisata",
        hotel: "Hotel",
        kuliner: "Kuliner"
      };
      const category = categoryMap[hash.toLowerCase()];
      if (category) {
        onCategoryNavigate(category);
        return;
      }
    }

    navigate(route);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = slides[currentSlide];
  const buttonLabel = slide.buttonText || "Lihat Cuaca Lainnya";
  const buttonColor = slide.buttonColor || "bg-teal hover:bg-light-teal";

  const renderRightContent = () => {
    if (currentSlide === 0) return null;
    if (currentSlide === 1) {
      if (loading) {
        return (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        );
      }
      if (error) {
        return (
          <div className="text-white">
            <p>Gagal memuat data cuaca</p>
            <p className="text-sm opacity-75">{error}</p>
          </div>
        );
      }
      return weatherData ? (
        <TodayWeather 
          data={weatherData} 
          formattedDate={formatDateToIndonesian(weatherData.date)} 
        />
      ) : (
        <div className="text-white">
          <p>Cuaca hari ini tidak tersedia.</p>
          <p className="text-sm opacity-75">Silakan coba beberapa saat lagi.</p>
        </div>
      );
    }
    if (currentSlide === 2) {
      return destinationsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <CardSlider destinations={destinations} title="Rekomendasi Wisata Hari Ini" />
      );
    }
    return hotelsLoading ? (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    ) : (
      <CardSlider destinations={hotels} title="Rekomendasi Hotel Terbaik" />
    );
  };

  return (
    <section
      className="w-full min-h-screen relative flex items-center justify-center px-6 mt-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <BackgroundSlider
        slides={slides}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">
        <div className="text-white text-center md:text-left w-full max-w-xl md:translate-y-[-20px]">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md leading-tight">
            {slide.title}
          </h1>
          <p className="mb-6 text-md">{slide.description}</p>
          {buttonLabel && (
            <button
              className={`${buttonColor} text-white font-semibold py-3 px-6 rounded-full transition shadow-md`}
              onClick={() => handleButtonClick(slide.buttonRoute)}
            >
              {buttonLabel}
            </button>
          )}
        </div>

        <div className="w-full max-w-sm hidden md:block">{renderRightContent()}</div>
      </div>
    </section>
  );
};

export default HeroWeather;
