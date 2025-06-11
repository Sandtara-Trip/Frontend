import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaHotel,
  FaBusAlt,
  FaStar,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ReviewsComponent from "./Reviews";
import Map from "../../utils/map";
import { showInfo } from '../../utils/sweetalert';
import { useTranslation } from 'react-i18next';

const TabContent = ({ activeTab, contentData }) => {
  // All useState hooks must be at the top level
  const [readMore, setReadMore] = useState(false);
  const [activeNearby, setActiveNearby] = useState(null);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const { t } = useTranslation();

  // Render stars rating
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`inline-block w-4 h-4 mr-1 ${
          i < rating ? "text-light-orange" : "text-gray-300"
        }`}
        aria-label={`${i + 1} star`}
      >
        <FaStar />
      </span>
    ));

  // No local Reviews component needed, we're using the imported ReviewsComponent

  useEffect(() => {
    if (activeTab === "Lokasi") {
      const lat = contentData?.LokasiCoords?.lat;
      const lon = contentData?.LokasiCoords?.lng;

      const timer = setTimeout(() => {
        Map(lat, lon, "lokasi-map");
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [activeTab, contentData]);

  // Effect for loading state of nearby places
  useEffect(() => {
    if (activeNearby) {
      setLoadingNearby(true);
      // Simulate loading for smoother transition
      const timer = setTimeout(() => {
        setLoadingNearby(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeNearby]);

  // Render deskripsi
  if (activeTab === "Deskripsi") {
    const text = contentData.description || "";
    const isLong = text.length > 150;
    const displayed = readMore || !isLong ? text : text.slice(0, 150) + "...";
    const restrictions = contentData.restrictions || [];
    const weatherInfo = contentData.weatherInfo;

    return (
      <div className="mt-2 space-y-6">
        <div className="text-sm">
          {displayed}
          {isLong && (
            <div
              className="text-warm-orange mt-1 cursor-pointer hover:underline"
              onClick={() => setReadMore((prev) => !prev)}
            >
              {readMore ? "Sembunyikan" : "Baca Selengkapnya"}
            </div>
          )}
        </div>
        
        {/* Weather Information */}
        {weatherInfo && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-700 mb-2">Informasi Cuaca</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h4 className="font-medium text-blue-600">Cuaca Saat Ini</h4>
                <div className="mt-2 text-sm">
                  <p>Suhu: {weatherInfo?.current?.temp}°C</p>
                  <p>Kondisi: {weatherInfo?.current?.condition}</p>
                  <p>Kelembaban: {weatherInfo?.current?.humidity}%</p>
                  <p>Kecepatan Angin: {weatherInfo?.current?.windSpeed} km/h</p>
                </div>
              </div>
              
              {weatherInfo?.forecast && weatherInfo.forecast.length > 0 && (
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <h4 className="font-medium text-blue-600">Prakiraan Cuaca</h4>
                  <div className="mt-2 text-sm">
                    {weatherInfo.forecast.map((day, idx) => (
                      <div key={idx} className="mb-2 pb-2 border-b border-gray-100 last:border-0">
                        <p className="font-medium">{day.day}</p>
                        <p>Suhu: {day.low}°C - {day.high}°C</p>
                        <p>Kondisi: {day.condition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Restrictions */}
        {restrictions.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-semibold text-red-700 mb-2">Perhatian & Larangan</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {restrictions.map((restriction, idx) => (
                <li key={idx} className="text-red-600">{restriction}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Informasi
  if (activeTab === "Informasi") {
    return (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contentData.Informasi.map((info, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              <span className="text-warm-orange text-lg"></span>
              <p className="text-sm">{info}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render fasilitas
  if (activeTab === "Fasilitas") {
    const fasilitas = contentData.Fasilitas || [];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {fasilitas.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-warm-orange text-xl font-bold">
              {item.charAt(0)}
            </div>
            <div className="text-sm text-gray-800 font-medium">{item}</div>
          </div>
        ))}
      </div>
    );
  }

  // State for nearby places already declared at the top level
  
  // Render lokasi dengan Leaflet Map
  if (activeTab === "Lokasi") {
    const lokasi = contentData.Lokasi || "";
    
    // Check if nearby data exists in the contentData
    const hasNearbyFood = contentData.nearby?.food && contentData.nearby.food.length > 0;
    const hasNearbyHotels = contentData.nearby?.hotels && contentData.nearby.hotels.length > 0;
    const hasNearbyTransport = contentData.nearby?.transport && contentData.nearby.transport.length > 0;

    // Render nearby places based on active category
    const renderNearbyPlaces = () => {
      if (!activeNearby) return null;
      
      let places = [];
      
      switch (activeNearby) {
        case 'food':
          places = contentData.nearby?.food || [];
          break;
        case 'hotels':
          places = contentData.nearby?.hotels || [];
          break;
        case 'transport':
          places = contentData.nearby?.transport || [];
          break;
        default:
          return null;
      }

      if (loadingNearby) {
        return (
          <div className="mt-4 flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-warm-orange"></div>
          </div>
        );
      }
      
      if (places.length === 0) {
        return (
          <div className="mt-4 text-center text-gray-500">
            <p>Tidak ada data {activeNearby === 'food' ? 'restoran' : activeNearby === 'hotels' ? 'hotel' : 'transportasi'} terdekat</p>
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={place.image || "/img/placeholder.jpg"}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                {activeNearby === 'hotels' && (
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-warm-orange">
                    {place.rating} ⭐
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{place.name}</h3>
                {activeNearby === 'hotels' && (
                  <>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(place.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {place.rating.toFixed(1)} ({place.reviewCount} {t('common.reviews')})
                      </span>
                    </div>
                    <p className="font-medium text-warm-orange mt-2">
                      {typeof place.price === 'number' 
                        ? `Rp ${place.price.toLocaleString('id-ID')}`
                        : place.price}
                    </p>
                    <p className="mb-2">{t('common.address')}: {place.address}</p>
                    <Link
                      to={`/detail-hotel/${place.id}`}
                      className="inline-flex items-center text-warm-orange hover:text-hover-orange mt-2 transition-colors"
                    >
                      {t('common.viewDetail')}
                      <FaArrowRight className="ml-1 text-sm" />
                    </Link>
                  </>
                )}
                {activeNearby === 'transport' && (
                  <>
                    <p>{t('common.type')}: {place.type}</p>
                    <p>{t('common.distance')}: {place.distance} km</p>
                    <p>{t('common.address')}: {place.address}</p>
                    {place.routes && (
                      <p>{t('common.route')}: {place.routes.join(', ')}</p>
                    )}
                    {place.contact && (
                      <p>{t('common.contact')}: {place.contact}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow relative">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-warm-orange" />
            Lokasi
          </h3>
          <p className="text-gray-600 mb-4">{lokasi}</p>
          
          {/* Map Container */}
          <div id="lokasi-map" className="h-[400px] w-full rounded-lg border border-gray-200 relative z-0"></div>
        </div>

        {/* Nearby Places Section */}
        {(hasNearbyFood || hasNearbyHotels || hasNearbyTransport) && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Tempat Terdekat</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {hasNearbyFood && (
                <button
                  onClick={() => setActiveNearby('food')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    activeNearby === 'food'
                      ? 'bg-warm-orange text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaUtensils />
                  Restoran
                </button>
              )}
              {hasNearbyHotels && (
                <button
                  onClick={() => setActiveNearby('hotels')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    activeNearby === 'hotels'
                      ? 'bg-warm-orange text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaHotel />
                  Hotel
                </button>
              )}
              {hasNearbyTransport && (
                <button
                  onClick={() => setActiveNearby('transport')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    activeNearby === 'transport'
                      ? 'bg-warm-orange text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaBusAlt />
                  Transportasi
                </button>
              )}
            </div>
            {renderNearbyPlaces()}
          </div>
        )}
      </div>
    );
  }

  // Render review
  if (activeTab === "Review") {
    return (
      <ReviewsComponent 
        reviews={contentData.Reviews || []} 
        averageRating={contentData.averageRating || 0} 
        totalReviews={contentData.totalReviews || 0} 
      />
    );
  }

  // Render tiket
  if (activeTab === "Tiket") {
    const tickets = contentData.Ticket || [];
    const eventTicket = contentData.eventTicket;
    
    if (eventTicket) {
      return (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{eventTicket.name}</h3>
                <p className="text-2xl font-bold text-warm-orange mt-2">
                  Rp {eventTicket.price.toLocaleString('id-ID')}
                </p>
              </div>
              {eventTicket.status === 'active' && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Tersedia
                </span>
              )}
            </div>
            
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>Periode Event: {new Date(eventTicket.startDate).toLocaleDateString('id-ID')} - {new Date(eventTicket.endDate).toLocaleDateString('id-ID')}</p>
              <p>Kapasitas: {eventTicket.capacity} orang</p>
              <p>Lokasi: {eventTicket.location?.address}, {eventTicket.location?.city}</p>
            </div>

            <button
              className="mt-4 w-full bg-warm-orange hover:bg-hover-orange text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              onClick={() => {
                window.location.href = `/order-kuliner/${eventTicket.id}`;
              }}
            >
              Pesan Tiket
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                <p className="text-2xl font-bold text-warm-orange mt-2">{ticket.price}</p>
              </div>
              {ticket.badge && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Tersedia
                </span>
              )}
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < ticket.rating ? "text-light-orange" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({ticket.reviewCount} ulasan)
              </span>
            </div>

            <button
              className="mt-4 w-full bg-warm-orange hover:bg-hover-orange text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              onClick={() => {
                // Handle ticket purchase here
                showInfo("Fitur pembelian tiket akan segera tersedia!");
              }}
            >
              Pesan Tiket
            </button>
          </div>
        ))}

        {tickets.length === 0 && !eventTicket && (
          <div className="text-center text-gray-500 py-8">
            <p>Tidak ada tiket tersedia saat ini</p>
          </div>
        )}
      </div>
    );
  }

  // Default fallback render
  return <p className="mt-2">{contentData[activeTab]}</p>;
};

export default TabContent;
