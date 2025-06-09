import React, { useState, useMemo } from "react";
import TodayWeather from "../TodayWeather";
import {
  WiDaySunny,
  WiDayCloudy,
  WiRain,
  WiThunderstorm,
} from "react-icons/wi";

// Format tanggal
const formatDateToIndonesian = (dateString) => {
  if (!dateString) return "";
  const [dd, mm, yyyy] = dateString.split("/").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const weatherIcons = [
  <WiDaySunny className="text-lg" />,
  <WiDayCloudy className="text-lg" />,
  <WiRain className="text-lg" />,
  <WiThunderstorm className="text-lg" />,
];

const getRandomIcon = () => {
  const index = Math.floor(Math.random() * weatherIcons.length);
  return weatherIcons[index];
};

const WeatherSidebar = ({ weatherData }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const DayActivities = useMemo(() => {
    const descriptions = [
      "Sarapan di hotel",
      "Jalan-jalan pagi",
      "Bersantai di pantai",
      "Belanja oleh-oleh",
      "Kunjungi pura",
      "Ngopi di cafe",
      "Kunjungi museum",
      "Makan siang di warung lokal",
      "Naik sepeda keliling kota",
      "Belajar budaya lokal",
      "Membaca buku di taman",
      "Istirahat siang",
      "Ngobrol di lobi hotel",
      "Menonton pertunjukan tari",
      "Makan malam di restoran",
      "Main di pantai saat sunset",
      "Jalan-jalan malam",
      "Minum teh di cafe rooftop",
      "Nonton film di kamar",
      "Mandi dan bersih-bersih",
      "Menulis jurnal perjalanan",
      "Video call sama pacar",
      "Tidur nyenyak 😴",
      "Bangun tidur lagi 💤",
    ];

    return Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, "0") + ":00";
      return {
        time: hour,
        description: descriptions[i % descriptions.length],
        icon: getRandomIcon(),
        hidden: i >= 4,
      };
    });
  }, []);

  // Transform weather data to match TodayWeather component's expected format
  const transformedWeatherData = weatherData ? {
    city: weatherData.city,
    date: weatherData.date,
    temp: `${Math.round(weatherData.temperature_2m_max)}°`,
    description: weatherData.weather_description,
    windSpeed: "10 km/h", // Default value as not provided by API
    rainChance: `${Math.round(weatherData.precipitation_sum)}%`,
    temperature_range: `${Math.round(weatherData.temperature_2m_min)}°C - ${Math.round(weatherData.temperature_2m_max)}°C`
  } : null;

  return (
    <div className="bg-gradient-to-b from-teal to-light-orange text-white p-6 rounded-2xl shadow-md flex flex-col justify-between mb-6">
      <TodayWeather
        data={transformedWeatherData}
        formattedDate={formatDateToIndonesian(transformedWeatherData?.date || "")}
      />

      <hr className="mt-4 border-white/30" />
      <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-8">
        <h3 className="text-lg font-semibold mb-3 text-white drop-shadow">
          Aktivitas Hari Ini
        </h3>

        <ul className="space-y-3 text-sm max-h-[240px] overflow-y-auto">
          {DayActivities.filter((activity) => showMore || !activity.hidden).map(
            (activity, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                  {activity.time}
                </span>
                <span className="text-white font-medium drop-shadow-sm flex items-center gap-1">
                  {activity.icon} {activity.description}
                </span>
              </li>
            )
          )}
        </ul>

        <div className="text-right mt-6">
          <button
            className="text-white/80 text-sm hover:underline"
            onClick={toggleShowMore}
          >
            {showMore ? "Sembunyikan ↑" : "Lihat Lainnya →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSidebar;
