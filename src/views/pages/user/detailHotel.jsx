
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "../../../components/user/NavbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import { IoIosPin } from "react-icons/io";
import { FaHotel } from "react-icons/fa";
import DetailImageSlider from "../../../components/user/detailImageSlider";
import TabContent from "../../../components/user/TabContent";
import OrderTicket from "../../../components/user/orderTicket";
import Footer from "../../../components/user/footer";
import { API_BASE_URL } from "../../../config/api";
import ScrollToTop from "../../../components/user/ScrollToTop";

// Function to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const DetailHotel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({
    reviews: [],
    totalReviews: 0,
    averageRating: 0,
  });
  const [nearbyHotels, setNearbyHotels] = useState([]);
  const [nearbyWisata, setNearbyWisata] = useState([]); // New state for nearby wisata

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("Token");
    setIsLoggedIn(!!token);

    const fetchHotelDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels/${id}`);
        if (response.data.success) {
          const hotelData = response.data.data;
          setHotel(hotelData);

          try {
            const reviewsResponse = await axios.get(
              `${API_BASE_URL}/reviews/hotel/${id}`
            );
            if (reviewsResponse.data.success) {
              const {
                totalReviews,
                averageRating,
                reviews: reviewsData,
              } = reviewsResponse.data.data;
              setReviews({
                reviews: reviewsData || [],
                totalReviews: totalReviews || 0,
                averageRating: averageRating || 0,
              });
            }
          } catch (reviewErr) {
            console.error("Error fetching reviews:", reviewErr);
          }

          try {
            const allHotelsResponse = await axios.get(
              `${API_BASE_URL}/api/hotels`
            );
            if (allHotelsResponse.data.success) {
              const otherHotels = allHotelsResponse.data.data.filter(
                (h) => h._id !== id
              );

              if (hotelData.location?.coordinates?.length === 2) {
                const [currentLon, currentLat] = hotelData.location.coordinates;

                const hotelsWithDistance = otherHotels
                  .map((h) => {
                    const coords = h.location?.coordinates;
                    if (!coords || coords.length !== 2) return null;

                    const [lon, lat] = coords;
                    const distance = calculateDistance(
                      currentLat,
                      currentLon,
                      lat,
                      lon
                    );
                    return { ...h, distance };
                  })
                  .filter(Boolean);

                const sortedByDistance = hotelsWithDistance
                  .sort((a, b) => a.distance - b.distance)
                  .slice(0, 5);

                const hotelsWithReviews = await Promise.all(
                  sortedByDistance.map(async (hotel) => {
                    try {
                      const reviewsResponse = await axios.get(
                        `${API_BASE_URL}/reviews/hotel/${hotel._id}`
                      );
                      const reviewData = reviewsResponse.data.success
                        ? reviewsResponse.data.data
                        : null;

                      let imageUrl = "/img/placeholder.jpg";
                      if (hotel.images && hotel.images.length > 0) {
                        if (
                          hotel.images[0].includes("cloudinary.com") ||
                          hotel.images[0].startsWith("http")
                        ) {
                          imageUrl = hotel.images[0];
                        } else {
                          imageUrl = `${API_BASE_URL}${hotel.images[0]}`;
                        }
                      }

                      return {
                        name: hotel.name,
                        address:
                          hotel.location?.address || "Alamat tidak tersedia",
                        id: hotel._id,
                        image: imageUrl,
                        rating: reviewData?.averageRating || 0,
                        reviewCount: reviewData?.totalReviews || 0,
                        distance: hotel.distance,
                      };
                    } catch (err) {
                      console.error(
                        `Error fetching reviews for hotel ${hotel._id}:`,
                        err
                      );
                      return {
                        name: hotel.name,
                        address:
                          hotel.location?.address || "Alamat tidak tersedia",
                        id: hotel._id,
                        image: "/img/placeholder.jpg",
                        rating: 0,
                        reviewCount: 0,
                        distance: hotel.distance,
                      };
                    }
                  })
                );

                setNearbyHotels(hotelsWithReviews);
              }
            }
          } catch (nearbyErr) {
            console.error("Error fetching nearby hotels:", nearbyErr);
          }

          // Fetch nearby wisata
          try {
            const allWisataResponse = await axios.get(`${API_BASE_URL}/api/wisata`);
            if (allWisataResponse.data.success) {
              const wisata = allWisataResponse.data.data;

              if (hotelData.location?.coordinates?.length === 2) {
                const [currentLon, currentLat] = hotelData.location.coordinates;

                const wisataWithDistance = wisata
                  .map((w) => {
                    const coords = w.location?.coordinates;
                    if (!coords || coords.length !== 2) return null;

                    const [lon, lat] = coords;
                    const distance = calculateDistance(
                      currentLat,
                      currentLon,
                      lat,
                      lon
                    );
                    return { ...w, distance };
                  })
                  .filter(Boolean);

                const sortedByDistance = wisataWithDistance
                  .sort((a, b) => a.distance - b.distance)
                  .slice(0, 5); // Limit to 5 nearest

                const wisataWithReviews = await Promise.all(
                  sortedByDistance.map(async (wisata) => {
                    try {
                      const reviewsResponse = await axios.get(
                        `${API_BASE_URL}/reviews/destination/${wisata._id}`
                      );
                      const reviewData = reviewsResponse.data.success
                        ? reviewsResponse.data.data
                        : null;

                      let imageUrl = "/img/placeholder.jpg";
                      if (wisata.gambar && wisata.gambar.length > 0) {
                        if (
                          wisata.gambar[0].includes("cloudinary.com") ||
                          wisata.gambar[0].startsWith("http")
                        ) {
                          imageUrl = wisata.gambar[0];
                        } else {
                          imageUrl = `${API_BASE_URL}${wisata.gambar[0]}`;
                        }
                      }

                      return {
                        name: wisata.nama || wisata.name,
                        address: wisata.location?.address || "Alamat tidak tersedia",
                        id: wisata._id,
                        image: imageUrl,
                        rating: reviewData?.averageRating || 0,
                        reviewCount: reviewData?.totalReviews || 0,
                        distance: wisata.distance,
                      };
                    } catch (err) {
                      console.error(`Error fetching reviews for wisata ${wisata._id}:`, err);
                      return {
                        name: wisata.nama || wisata.name,
                        address: wisata.location?.address || "Alamat tidak tersedia",
                        id: wisata._id,
                        image: "/img/placeholder.jpg",
                        rating: 0,
                        reviewCount: 0,
                        distance: wisata.distance,
                      };
                    }
                  })
                );

                setNearbyWisata(wisataWithReviews);
              }
            }
          } catch (nearbyWisataErr) {
            console.error("Error fetching nearby wisata:", nearbyWisataErr);
          }
        } else {
          setError("Failed to fetch hotel details");
        }
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetail();
  }, [id]);

  const handleOrder = () => {
    navigate(`/choose-room/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error!</p>
          <p>{error || "Hotel not found"}</p>
        </div>
      </div>
    );
  }

  const contentData = {
    tipe: "hotel",
    name: hotel.name,
    description: hotel.description || hotel.detail || hotel.deskripsi,
    Fasilitas: hotel.facilities || [],
    Lokasi: `${hotel.location.address}, ${hotel.location.city}, ${hotel.location.province}`,
    LokasiCoords: {
      lat: hotel.location.coordinates[1],
      lng: hotel.location.coordinates[0],
    },
    Reviews: reviews?.reviews || [],
    averageRating: reviews?.averageRating || 0,
    totalReviews: reviews?.totalReviews || 0,
    Informasi: `Check-in: ${hotel.checkInTime || "14:00"} - Check-out: ${
      hotel.checkOutTime || "12:00"
    }`,
    nearby: {
      hotels: nearbyHotels,
      food: [],
      wisata: nearbyWisata, // Updated to include nearby wisata
    },
  };

  const images = hotel.images.map((img) =>
    img.startsWith("http") ? img : `${API_BASE_URL}${img}`
  );

  return (
    <>
      <ScrollToTop />
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      <div className="bg-base max-w-5xl mx-auto p-4 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{hotel.name}</h2>
            <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
              <span className="flex items-center gap-2">
                <IoIosPin className="text-xl text-warm-orange" />
                {hotel.location.address}
              </span>
              <span className="flex items-center gap-2">
                <FaHotel className="text-xl text-warm-orange" />
                {hotel.location.city}, {hotel.location.province}
              </span>
            </div>
          </div>

          <DetailImageSlider images={images} />

          <div className="flex gap-4 border-b text-lg font-medium overflow-x-auto whitespace-nowrap no-scrollbar">
            {["Deskripsi", "Informasi", "Fasilitas", "Lokasi", "Review"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 ${
                    activeTab === tab
                      ? "text-warm-orange border-b-2 border-hover-orange"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <TabContent activeTab={activeTab} contentData={contentData} />
        </div>

        <OrderTicket
          name={hotel.name}
          badge="TERSEDIA"
          rating={reviews?.averageRating || 0}
          reviewCount={reviews?.totalReviews || 0}
          onOrder={handleOrder}
          orderLabel="Lihat Kamar"
          showPrice={false}
        />
      </div>

      <Footer />
    </>
  );
};

export default DetailHotel;