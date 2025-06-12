import React, { useEffect, useState } from "react";
import WeatherSidebar from "../../../components/user/weathercalender/WeatherSidebar";
import WeatherCalendarMain from "../../../components/user/weathercalender/WeatherCalendarMain";
import NavbarBefore from "../../../components/user/NavbarBefore";
import NavbarAfter from "../../../components/user/NavbarAfter";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SlArrowLeftCircle } from "react-icons/sl";
import { fetchWeatherData, formatDateForDisplay } from "../../../services/weatherService";
import ScrollToTop from "../../../components/user/ScrollToTop";

const WeatherCalendar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [holidayDates, setHolidayDates] = useState({});
  const [todayWeather, setTodayWeather] = useState(null);
  const [weatherMap, setWeatherMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData();
        console.log('Fetched weather data:', data); // Debug log
        
        // Set today's weather
        if (data.current_weather) {
          setTodayWeather({
            city: data.location.city,
            date: formatDateForDisplay(data.current_weather.date),
            temperature_2m_max: data.current_weather.temperature_2m_max,
            temperature_2m_min: data.current_weather.temperature_2m_min,
            precipitation_sum: data.current_weather.precipitation_sum,
            weather_description: data.current_weather.weather_description
          });
        }

        // Set weather map for calendar
        const map = {};
        if (data.predictions) {
          data.predictions.forEach(prediction => {
            const formattedDate = formatDateForDisplay(prediction.date);
            map[formattedDate] = {
              city: data.location.city,
              description: prediction.weather_description,
              temp: `${Math.round(prediction.temperature_2m_max)}°`,
              windSpeed: "10 km/h",
              rainChance: `${Math.round(prediction.precipitation_sum)}%`
            };
          });
        }
        setWeatherMap(map);
        setError(null);
      } catch (err) {
        console.error("Error loading weather data:", err);
        setError("Gagal memuat data cuaca");
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=YOUR_API_KEY&country=ID&year=2025`
        );
        const data = await response.json();

        const holidayMap = {};
        data.response.holidays.forEach((holiday) => {
          holidayMap[holiday.date.iso] = holiday.name;
        });

        setHolidayDates(holidayMap);
      } catch (error) {
        console.error("Gagal mengambil hari libur:", error);
      }
    };

    fetchHolidays();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <>
       <ScrollToTop />
        {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
        <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 px-4 md:px-10 font-sans">
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
        <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 px-4 md:px-10 font-sans">
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      {/* Tombol Kembali - hanya tampil di mobile */}
      <div className="px-4 mt-10 md:hidden">
        <button
          onClick={handleBack}
          className="flex items-center justify-center gap-2 mx-auto mt-20 bg-teal hover:bg-emerald-300 text-white font-semibold py-2 px-4 rounded-md shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          <SlArrowLeftCircle />
          Kembali ke Beranda
        </button>
      </div>

      {/* Konten Cuaca */}
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 px-4 md:px-10 font-sans">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {todayWeather && (
            <>
              <motion.div variants={itemVariants}>
                <WeatherSidebar weatherData={todayWeather} />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-2">
                <WeatherCalendarMain
                  holidayDates={holidayDates}
                  weatherDescriptions={weatherMap}
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default WeatherCalendar;
