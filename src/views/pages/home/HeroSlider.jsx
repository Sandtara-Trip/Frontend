import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchWeatherBasedRecommendations } from '../../../services/recommendationService';
import { fetchWeatherData } from '../../../services/weatherService';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // First get current weather to determine hot or rainy
        const weatherData = await fetchWeatherData();
        const isHotWeather = weatherData?.current_weather?.temperature_2m_max > 30;
        
        // Fetch recommendations based on weather
        const data = await fetchWeatherBasedRecommendations(isHotWeather);
        setRecommendations(data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Gagal memuat rekomendasi wisata');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (recommendations.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % recommendations.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [recommendations]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  const currentRecommendation = recommendations[currentSlide];

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
        <img
          src={currentRecommendation.image}
          alt={currentRecommendation.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentRecommendation.name}
            </h1>
            <p className="text-lg md:text-xl text-white mb-6">
              {currentRecommendation.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white">
                  <span className="font-semibold">Lokasi:</span> {currentRecommendation.location}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white">
                  <span className="font-semibold">Rating:</span> {currentRecommendation.rating}
                </p>
              </div>
            </div>
            <Link
              to={`/detail/${currentRecommendation.id}`}
              className="inline-block bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors"
            >
              Lihat Wisata
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-2">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-teal-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider; 