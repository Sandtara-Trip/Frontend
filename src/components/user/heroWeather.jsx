import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { weatherData } from "../../views/templates/weather";
import { slides } from "../../views/templates/slides";
import BackgroundSlider from "./BackgroundSlider";
import TodayWeather from "./TodayWeather";
import CardSlider from "./CardSlider";
import { destinations } from "../../views/templates/destinations";
import { HotelSlides } from "../../views/templates/hotelSlides";

moment.locale("id");

const HeroWeather = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const data = weatherData[0];
 const formattedDate = moment(data.date, "DD-MM-YYYY").locale("id").format("dddd, D MMMM YYYY");


  // Auto slide 
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

  // Render konten kanan 
  const renderRightContent = () => {
    if (currentSlide === 0) {
      return null;
    }

    if (currentSlide === 1) {
      return (
        <div className="hidden md:block">
          <TodayWeather data={data} formattedDate={formattedDate} />
        </div>
      );
    }

    if (currentSlide === 2) {
      return (
        <div className="hidden md:block">
          <CardSlider
            destinations={destinations}
            title="Rekomendasi Wisata Hari Ini"
          />
        </div>
      );
    }

    // hotel
    return (
      <div className="hidden md:block">
        <CardSlider destinations={HotelSlides} title="Rekomendasi Hotel Terbaik" />
      </div>
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
        {/* Kiri: Info slide */}
        <div className="text-white text-center md:text-left w-full max-w-xl md:translate-y-[-20px]">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md leading-tight">
            {slide.title}
          </h1>
          <p className="mb-6 text-md">{slide.description}</p>
          {buttonLabel && (
            <button
              className={`${buttonColor} text-white font-semibold py-3 px-6 rounded-full transition shadow-md`}
            >
              {buttonLabel}
            </button>
          )}
        </div>

        {/* Kanan: Konten dinamis */}
        <div className="w-full max-w-sm">{renderRightContent()}</div>
      </div>
    </section>
  );
};

export default HeroWeather;
