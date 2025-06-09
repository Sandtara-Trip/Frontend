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

const DetailHotel = () => {
  const [isLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/hotels/${id}`);
        if (response.data.success) {
          setHotel(response.data.data);
          
          // Fetch reviews after getting hotel details
          try {
            const reviewsResponse = await axios.get(`http://localhost:3000/reviews/hotel/${id}`);
            if (reviewsResponse.data.success) {
              setReviews(reviewsResponse.data.data);
            }
          } catch (reviewErr) {
            console.error("Error fetching hotel reviews:", reviewErr);
          }
        } else {
          setError("Failed to load hotel details");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError("Failed to load hotel details");
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
    description: hotel.description || hotel.detail || hotel.deskripsi,
    Fasilitas: hotel.facilities || [],
    Lokasi: `${hotel.location.address}, ${hotel.location.city}, ${hotel.location.province}`,
    LokasiCoords: {
      lat: hotel.location.coordinates[1],
      lng: hotel.location.coordinates[0]
    },
    Reviews: reviews.reviews || [],
    averageRating: reviews.averageRating || 0,
    totalReviews: reviews.totalReviews || 0
  };

  const images = hotel.images.map(img => 
    img.startsWith('http') ? img : `http://localhost:3000${img}`
  );

  return (
    <>
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

          <TabContent activeTab={activeTab} contentData={contentData} />
        </div>

        <OrderTicket
          name={hotel.name}
          price={hotel.price}
          badge="TERSEDIA"
          rating={reviews.averageRating || 0}
          reviewCount={reviews.totalReviews || 0}
          onOrder={handleOrder}
          orderLabel="Lihat Kamar"
        />
      </div>
    </>
  );
};

export default DetailHotel;
