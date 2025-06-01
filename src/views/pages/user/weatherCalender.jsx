import React, { useEffect, useState } from "react";
import WeatherSidebar from "../../../components/user/weathercalender/WeatherSidebar";
import WeatherCalendarMain from "../../../components/user/weathercalender/WeatherCalendarMain";
import { weatherData } from "../../templates/weather";
import NavbarBefore from "../../../components/user/NavbarBefore";
import NavbarAfter from "../../../components/user/navbarAfter";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SlArrowLeftCircle } from "react-icons/sl";

const WeatherCalendar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [holidayDates, setHolidayDates] = useState({});
  const [todayWeather, setTodayWeather] = useState(null);
  const [weatherMap, setWeatherMap] = useState({});

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const match = weatherData.find((item) => item.date === todayFormatted);
    if (match) setTodayWeather(match);

    const map = {};
    weatherData.forEach((item) => {
      const [day, month, year] = item.date.split("/");
      const isoDate = `${year}-${month}-${day}`;
      map[isoDate] = {
        city: item.city,
        description: item.description,
        temp: item.temp,
        windSpeed: item.windSpeed,
        rainChance: item.rainChance,
      };
    });

    setWeatherMap(map);
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
