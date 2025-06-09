import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// Components
import DetailImageSlider from "../../../components/user/detailImageSlider";
import TabContent from "../../../components/user/TabContent";
import OrderTicket from "../../../components/user/orderTicket";
import Footer from "../../../components/user/footer";
import { IoIosPin, IoMdPricetags } from "react-icons/io";

// API base URL
const API_BASE_URL = "http://localhost:3000";

const DetailWisata = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('Token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDestinationDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wisata/${id}`);
        if (response.data.success) {
          setDestination(response.data.data);
          
          // After getting destination, fetch reviews
          try {
            const reviewsResponse = await axios.get(`${API_BASE_URL}/reviews/destination/${id}`);
            if (reviewsResponse.data.success) {
              setReviews(reviewsResponse.data.data);
            }
          } catch (reviewErr) {
            console.error("Error fetching reviews:", reviewErr);
            // Don't set main error for reviews failure
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
  const ticket = destination ? {
    name: destination.nama || destination.name,
    price: destination.harga || destination.price || 0,
    badge: true,
    rating: reviews?.averageRating || 0,
    reviewCount: reviews?.totalReviews || 0
  } : null;
  
  // Transform API data to match the expected format for TabContent
  const contentDataFromApi = destination ? {
    name: destination.nama || destination.name,
    description: destination.deskripsi || destination.detail,
    Kategori: destination.kategori || "Alam, Populer",
    Lokasi: destination.alamat || (destination.location ? `${destination.location.address || ''}, ${destination.location.city || ''}, ${destination.location.province || ''}` : ''),
    LokasiCoords: { 
      lat: destination.location?.coordinates?.[1] || -8.707149, 
      lng: destination.location?.coordinates?.[0] || 115.258508 
    },
    Fasilitas: destination.fasilitas || destination.benefits || [],
    Reviews: reviews?.reviews || [],
    averageRating: reviews?.averageRating || 0,
    totalReviews: reviews?.totalReviews || 0,
    Informasi: `Buka: ${destination.jamBuka || '00:00'} - ${destination.jamTutup || '24:00'} (${destination.hariOperasional?.join(', ') || 'Setiap Hari'})`,
    nearby: destination.nearby || {},
    restrictions: destination.restrictions || [],
    mapUrl: destination.mapUrl,
    weatherInfo: destination.weatherInfo
  } : null;
  
  // Transform images for the slider
  const imagesForSlider = destination?.gambar ? 
    destination.gambar.map(img => 
      img.startsWith('http') ? img : `${API_BASE_URL}${img}`
    ) : 
    [];

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
        <span className="block sm:inline"> {error || "Destination not found"}</span>
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
    <div className="bg-base max-w-5xl mx-auto p-4 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">{destination.name}</h2>
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

        <div className="flex gap-4 border-b text-lg font-medium">
          {["Deskripsi", "Fasilitas", "Lokasi", "Review"].map((tab) => (
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
          ))}
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
  );
};

export default DetailWisata;
