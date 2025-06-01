import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaHotel,
  FaBusAlt,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Map from "../../utils/map";

const TabContent = ({ activeTab, contentData }) => {
  const [readMore, setReadMore] = useState(false);

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

  const Reviews = ({ reviews }) => {
    if (!reviews || reviews.length === 0)
      return <p className="text-gray-500 italic">Belum ada ulasan.</p>;

    return (
      <div className="mt-2">
        {reviews.map(
          ({ name, rating, date, review, image, profilePhoto }, idx) => {
            const formattedDate = new Date(date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={idx}
                className="border rounded-lg p-4 shadow-sm bg-white mb-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={profilePhoto || "/default-avatar.png"}
                      alt={`Foto profil ${name}`}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <h4 className="font-semibold text-warm-orange">{name}</h4>
                  </div>
                  <div className="flex">{renderStars(rating)}</div>
                </div>

                <p className="text-sm text-gray-700 mb-2 italic">"{review}"</p>

                {image && (
                  <div className="mb-2">
                    <img
                      src={image}
                      alt={`Review oleh ${name}`}
                      className="w-36 max-w-xs rounded-lg object-cover"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {formattedDate}
                    </div>
                  </div>
                )}

                {!image && (
                  <div className="text-xs text-gray-400">{formattedDate}</div>
                )}
              </div>
            );
          }
        )}
      </div>
    );
  };

  useEffect(() => {
    if (activeTab === "Lokasi") {
      const lat = contentData?.LokasiCoords?.lat ;
      const lon = contentData?.LokasiCoords?.lng ;

      const timer = setTimeout(() => {
        Map(lat, lon, "lokasi-map");
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [activeTab, contentData]);

  // Render deskripsi
  if (activeTab === "Deskripsi") {
    const text = contentData.description || "";
    const isLong = text.length > 150;
    const displayed = readMore || !isLong ? text : text.slice(0, 150) + "...";

    return (
      <div className="mt-2 text-sm">
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

  // Render lokasi dengan Leaflet Map
  if (activeTab === "Lokasi") {
    const lokasi = contentData.Lokasi || "";

    return (
      <div className="mt-2 space-y-4">
        <p>{lokasi}</p>

        {/* Div kosong sebagai target untuk Leaflet map */}
        <div
          id="lokasi-map"
          className="w-full h-64 rounded-lg overflow-hidden shadow-md mt-3"
        ></div>

        <div className="flex gap-3 justify-center mt-3 flex-wrap">
          <a className="flex items-center gap-2 px-4 py-2 bg-warm-orange text-white rounded-full hover:bg-hover-orange font-semibold text-sm shadow transition cursor-pointer">
            <FaMapMarkerAlt />
            Lokasi
          </a>
          <a className="flex items-center gap-2 px-4 py-2 bg-warm-orange text-white rounded-full hover:bg-hover-orange font-semibold text-sm shadow transition cursor-pointer">
            <FaUtensils />
            Restoran Terdekat
          </a>
          <a className="flex items-center gap-2 px-4 py-2 bg-warm-orange text-white rounded-full hover:bg-hover-orange font-semibold text-sm shadow transition cursor-pointer">
            <FaHotel />
            Hotel Terdekat
          </a>
          <a className="flex items-center gap-2 px-4 py-2 bg-warm-orange text-white rounded-full hover:bg-hover-orange font-semibold text-sm shadow transition cursor-pointer">
            <FaBusAlt />
            Transportasi Terdekat
          </a>
        </div>
      </div>
    );
  }

  // Render review
  if (activeTab === "Review") {
    return <Reviews reviews={contentData.Reviews || []} />;
  }

  // Default fallback render
  return <p className="mt-2">{contentData[activeTab]}</p>;
};

export default TabContent;
