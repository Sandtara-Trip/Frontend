import React, { useState, useEffect } from "react";
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

const weatherIcons = {
  Cerah: <WiDaySunny className="text-lg" />,
  Berawan: <WiDayCloudy className="text-lg" />,
  Gerimis: <WiRain className="text-lg" />,
  Hujan: <WiRain className="text-lg" />,
  "Hujan Deras": <WiRain className="text-lg" />,
  "Hujan Petir": <WiThunderstorm className="text-lg" />,
};

const getWeatherIcon = (weatherLabel) => {
  return weatherIcons[weatherLabel] || <WiDayCloudy className="text-lg" />;
};

const WeatherSidebar = ({ weatherData }) => {
  const [showMore, setShowMore] = useState(false);
  const [hourlyActivities, setHourlyActivities] = useState([]);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        console.log('Fetching hourly weather data...');
        const response = await fetch('/weather-hourly/predict/hourly');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.status === "success" && data.hourly_predictions) {
          const activities = data.hourly_predictions.map(prediction => {
            const date = new Date(prediction.time);
            const hour = date.getHours();
            return {
              time: `${hour.toString().padStart(2, '0')}:00`,
              weather_label: prediction.weather_label || 'Berawan',
              icon: getWeatherIcon(prediction.weather_label || 'Berawan'),
              temperature: Math.round(prediction.temperature_2m),
              precipitation: Math.round(prediction.precipitation * 100),
              windspeed: Math.round(prediction.windspeed_10m)
            };
          });
          setHourlyActivities(activities);
        } else {
          console.error('Invalid response format:', data);
          throw new Error('Invalid response format from weather API');
        }
      } catch (error) {
        console.error('Error fetching hourly weather:', error);
        // Set default activities in case of error
        const defaultActivities = Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          weather_label: "Berawan",
          icon: getWeatherIcon("Berawan"),
          temperature: 25,
          precipitation: 0,
          windspeed: 10
        }));
        setHourlyActivities(defaultActivities);
      }
    };

    fetchHourlyWeather();
  }, []);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

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
          {hourlyActivities.map((activity, index) => (
            <li key={index} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                  {activity.time}
                </span>
                <span className="text-white font-medium drop-shadow-sm flex items-center gap-1">
                  {activity.icon} {activity.weather_label}
                </span>
              </div>
              <div className="flex items-center gap-4 text-white/90 text-xs">
                <span>{activity.temperature}°C</span>
                <span>☔ {activity.precipitation}%</span>
                <span>💨 {activity.windspeed} km/h</span>
              </div>
            </li>
          ))}
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
