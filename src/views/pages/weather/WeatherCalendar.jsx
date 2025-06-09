import React, { useState, useEffect } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { id } from 'date-fns/locale';
import { FaCloud, FaSun, FaCloudRain, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import NavbarAfter from '../../../components/user/NavbarAfter';
import { fetchWeatherData } from '../../../services/weatherService';

const WeatherCalendar = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherInfo = async () => {
    try {
      setLoading(true);
      const data = await fetchWeatherData();
      console.log('Weather data received:', data); // Debug log
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data cuaca');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  const getWeatherIcon = (description) => {
    if (!description) return null;
    
    switch (description.toLowerCase()) {
      case 'hujan':
      case 'hujan deras':
      case 'hujan ringan':
        return <FaCloudRain className="text-blue-500 w-6 h-6" />;
      case 'berawan':
        return <FaCloud className="text-gray-500 w-6 h-6" />;
      case 'cerah':
      case 'cerah berawan':
        return <FaSun className="text-yellow-500 w-6 h-6" />;
      default:
        return <FaCloud className="text-gray-500 w-6 h-6" />;
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const findPredictionForDate = (date) => {
    if (!weatherData?.predictions) return null;
    
    const formattedDate = format(date, 'yyyy-MM-dd');
    const prediction = weatherData.predictions.find(pred => pred.date === formattedDate);
    
    if (prediction) {
      console.log('Found prediction for date:', formattedDate, prediction); // Debug log
    }
    
    return prediction;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavbarAfter />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavbarAfter />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAfter />
      <div className="container mx-auto px-4 py-8">
        {/* Current Weather Card */}
        {weatherData?.current_weather && (
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-6 text-white mb-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">{weatherData.location.city}</h2>
              <p className="text-sm mb-4">{format(parseISO(weatherData.current_weather.date), 'EEEE, d MMMM yyyy', { locale: id })}</p>
              <div className="text-6xl font-bold mb-2">
                {Math.round(weatherData.current_weather.temperature_2m_max)}°C
              </div>
              <p className="text-xl">{weatherData.current_weather.weather_description}</p>
              <div className="mt-4 text-sm">
                <p>Curah Hujan: {weatherData.current_weather.precipitation_sum} mm</p>
                <p>Suhu: {weatherData.current_weather.temperature_2m_min}°C - {weatherData.current_weather.temperature_2m_max}°C</p>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy', { locale: id })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaArrowRight className="text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-semibold">
                {day}
              </div>
            ))}

            {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }, (_, i) => (
              <div key={`empty-${i}`} className="bg-white p-4" />
            ))}

            {getDaysInMonth().map(date => {
              const prediction = findPredictionForDate(date);
              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

              return (
                <div
                  key={date.toString()}
                  className={`bg-white p-4 min-h-[100px] ${
                    isToday ? 'bg-teal-50' : ''
                  } ${!isSameMonth(date, currentDate) ? 'text-gray-400' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm ${isToday ? 'font-bold text-teal-600' : ''}`}>
                      {format(date, 'd')}
                    </span>
                    {prediction && (
                      <div className="flex flex-col items-center">
                        {getWeatherIcon(prediction.weather_description)}
                        <span className="text-xs mt-1">{Math.round(prediction.temperature_2m_max)}°C</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCalendar; 