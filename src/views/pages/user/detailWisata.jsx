
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";
import ScrollToTop from "../../../components/user/ScrollToTop";

// Components
import DetailImageSlider from "../../../components/user/detailImageSlider";
import TabContent from "../../../components/user/TabContent";
import OrderTicket from "../../../components/user/orderTicket";
import Footer from "../../../components/user/footer";
import { IoIosPin, IoMdPricetags } from "react-icons/io";

// Function to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
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

const DetailWisata = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [destination, setDestination] = useState(null);
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
    // Check login status from localStorage
    const token = localStorage.getItem("token") || localStorage.getItem("Token");
    setIsLoggedIn(!!token);

    const fetchDestinationDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wisata/${id}`);
        if (response.data.success) {
          const destinationData = response.data.data;
          setDestination(destinationData);

          // Fetch reviews
          try {
            const reviewsResponse = await axios.get(
              `${API_BASE_URL}/reviews/destination/${id}`
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

          // Fetch nearby hotels
          try {
            const allHotelsResponse = await axios.get(`${API_BASE_URL}/api/hotels`);
            if (allHotelsResponse.data.success) {
              const hotels = allHotelsResponse.data.data;

              if (destinationData.location?.coordinates?.length === 2) {
                const [currentLon, currentLat] = destinationData.location.coordinates;

                const hotelsWithDistance = hotels
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
                        address: hotel.location?.address || "Alamat tidak tersedia",
                        id: hotel._id,
                        image: imageUrl,
                        rating: reviewData?.averageRating || 0,
                        reviewCount: reviewData?.totalReviews || 0,
                        distance: hotel.distance,
                      };
                    } catch (err) {
                      console.error(`Error fetching reviews for hotel ${hotel._id}:`, err);
                      return {
                        name: hotel.name,
                        address: hotel.location?.address || "Alamat tidak tersedia",
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

              if (destinationData.location?.coordinates?.length === 2) {
                const [currentLon, currentLat] = destinationData.location.coordinates;

                const wisataWithDistance = wisata
                  .filter((w) => w._id !== id) // Exclude current destination
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
          setError("Failed to fetch destination details");
        }
      } catch (err) {
        console.error("Error fetching destination details:", err);
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  const handleOrder = () => {
    navigate(`/order-wisata/${id}`);
  };

  // Create a formatted ticket object from destination data
  const ticket = destination
    ? {
        name: destination.nama || destination.name,
        price: destination.harga || destination.price || 0,
        badge: true,
        rating: reviews?.averageRating || 0,
        reviewCount: reviews?.totalReviews || 0,
      }
    : null;

  // Transform API data to match the expected format for TabContent
  const contentDataFromApi = destination
    ? {
        tipe: "wisata",
        name: destination.nama || destination.name,
        description: destination.deskripsi || destination.detail,
        jamOperasional: `${destination.jamBuka || "00:00"} - ${
          destination.jamTutup || "24:00"
        }`,
        hariOperasional: destination.hariOperasional?.join(", ") || "Setiap Hari",
        Kategori: destination.kategori || "Alam, Populer",
        Lokasi:
          destination.alamat ||
          (destination.location
            ? `${destination.location.address || ""}, ${
                destination.location.city || ""
              }, ${destination.location.province || ""}`
            : ""),
        LokasiCoords: {
          lat: destination.location?.coordinates?.[1] || -8.707149,
          lng: destination.location?.coordinates?.[0] || 115.258508,
        },
        Fasilitas: destination.fasilitas || destination.benefits || [],
        Reviews: reviews?.reviews || [],
        averageRating: reviews?.averageRating || 0,
        totalReviews: reviews?.totalReviews || 0,
        nearby: {
          hotels: nearbyHotels,
          food: destination.nearby?.food || [],
          wisata: nearbyWisata, // Updated to include nearby wisata
        },
        restrictions: destination.restrictions || [],
        mapUrl: destination.mapUrl,
        weatherInfo: destination.weatherInfo,
      }
    : null;

  // Transform images for the slider
  const imagesForSlider = destination?.gambar
    ? destination.gambar.map((img) =>
        img.startsWith("http") ? img : `${API_BASE_URL}${img}`
      )
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 mx-auto max-w-2xl mt-20">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">
          {" "}
          {error || "Destination not found"}
        </span>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-warm-orange text-white px-4 py-2 rounded hover:bg-hover-orange"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="bg-base max-w-5xl mx-auto p-4 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{destination.nama}</h2>
            <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
              <span className="flex items-center gap-2">
                <IoIosPin className="text-xl text-warm-orange" />
                {contentDataFromApi.Lokasi}
              </span>
              <span className="flex items-center gap-2">
                <IoMdPricetags className="text-xl text-warm-orange" />
                {contentDataFromApi.Kategori}
              </span>
            </div>
          </div>

          {imagesForSlider.length > 0 ? (
            <DetailImageSlider images={imagesForSlider} />
          ) : (
            <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
              <p className="text-gray-500">No images available</p>
            </div>
          )}

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

          <TabContent activeTab={activeTab} contentData={contentDataFromApi} />
        </div>

        {/* Ticket */}
        {ticket && (
          <OrderTicket
            name={ticket.name}
            price={ticket.price}
            badge={ticket.badge}
            rating={ticket.rating}
            reviewCount={ticket.reviewCount}
            onOrder={handleOrder}
            orderLabel="Pesan Sekarang"
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default DetailWisata;
