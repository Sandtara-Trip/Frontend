import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { weatherData } from "../../views/templates/weather";
import { slides } from "../../views/templates/slides";
import BackgroundSlider from "./BackgroundSlider";
import TodayWeather from "./TodayWeather";
import CardSlider from "./CardSlider";
import { destinations } from "../../views/templates/destinations";
import { HotelSlides } from "../../views/templates/hotelSlides";

// Fungsi bantu untuk parsing dan formatting
const parseDate = (ddmmyyyy) => {
  const [dd, mm, yyyy] = ddmmyyyy.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd);
};

const formatDateToIndonesian = (dateString) => {
  const date = parseDate(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

const getTodayFormatted = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`; // Format sama kayak data
};

const HeroWeather = ({ onCategoryNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoggedIn] = useState(true);

  const navigate = useNavigate();

  const todayDate = getTodayFormatted();
  const todayData = weatherData.find((item) => item.date === todayDate);

  const formattedDate = todayData
    ? formatDateToIndonesian(todayData.date)
    : "Data cuaca hari ini tidak ditemukan";

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
      return todayData ? (
        <TodayWeather data={todayData} formattedDate={formattedDate} />
      ) : (
        <p className="text-white">Cuaca hari ini tidak tersedia.</p>
      );
    }
    if (currentSlide === 2) {
      return <CardSlider destinations={destinations} title="Rekomendasi Wisata Hari Ini" />;
    }
    return <CardSlider destinations={HotelSlides} title="Rekomendasi Hotel Terbaik" />;
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
