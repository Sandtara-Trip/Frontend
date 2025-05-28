import React, { useEffect, useState } from "react";
import WeatherSidebar from "../../../components/user/weathercalender/WeatherSidebar";
import WeatherCalendarMain from "../../../components/user/weathercalender/WeatherCalendarMain";
import { weatherData } from "../../templates/weather";

function WeatherCalendar() {
  const [holidayDates, setHolidayDates] = useState({});
  const [todayWeather, setTodayWeather] = useState(null);
  const [weatherMap, setWeatherMap] = useState({}); // ⬅️ format { '2025-05-28': { city, desc, ... } }

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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {todayWeather && (
          <>
            <WeatherSidebar weatherData={todayWeather} />
            <WeatherCalendarMain
              holidayDates={holidayDates}
              weatherDescriptions={weatherMap}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherCalendar;
