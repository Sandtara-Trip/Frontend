import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "../../../components/user/NavbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import { IoIosPin, IoMdPricetags } from "react-icons/io";
import DetailImageSlider from "../../../components/user/detailImageSlider";
import TabContent from "../../../components/user/TabContent";

// API base URL
const API_BASE_URL = "http://localhost:3000";

const DetailKuliner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token') || localStorage.getItem('Token');
      setIsLoggedIn(!!token);
    };

    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/event/${id}`);
        
        if (response.data.success) {
          setEvent(response.data.data);
        } else {
          setError('Failed to fetch event details');
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(err.response?.data?.message || 'Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
        </div>
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 mx-auto max-w-2xl mt-20">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error || "Event not found"}</span>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 bg-warm-orange text-white px-4 py-2 rounded hover:bg-hover-orange"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  // Transform API data to match the expected format for TabContent
  const contentData = {
    name: event.name,
    description: event.detail,
    Kategori: event.category || "Kuliner",
    Lokasi: event.location ? `${event.location.address}, ${event.location.city}, ${event.location.province}` : '',
    LokasiCoords: { 
      lat: event.location?.coordinates?.[1] || -8.707149, 
      lng: event.location?.coordinates?.[0] || 115.258508 
    },
    Fasilitas: event.facilities || [],
    Reviews: event.reviews || [],
    averageRating: event.averageRating || 0,
    totalReviews: event.totalReviews || 0,
    Informasi: [
      `Periode Event: ${new Date(event.startDate).toLocaleDateString('id-ID')} - ${new Date(event.endDate).toLocaleDateString('id-ID')}`,
      `Kapasitas: ${event.capacity} orang`,
      `Status: ${event.status === 'active' ? 'Tersedia' : 'Tidak Tersedia'}`
    ],
    nearby: event.nearby || {},
    restrictions: event.restrictions || [],
    eventTicket: {
      id: event._id,
      name: event.name,
      price: event.price,
      status: event.status,
      startDate: event.startDate,
      endDate: event.endDate,
      capacity: event.capacity,
      location: event.location
    }
  };

  // Transform images for the slider
  const imagesForSlider = event.images ? 
    event.images.map(img => 
      img.startsWith('http') ? img : `${API_BASE_URL}${img}`
    ) : 
    [];

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      <div className="bg-base max-w-5xl mx-auto p-4 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
              <span className="flex items-center gap-2">
                <IoIosPin className="text-xl text-warm-orange" />
                {contentData.Lokasi}
              </span>
              <span className="flex items-center gap-2">
                <IoMdPricetags className="text-xl text-warm-orange" />
                {contentData.Kategori}
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
            {["Deskripsi", "Fasilitas", "Lokasi", "Review", "Tiket"].map((tab) => (
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
          
        {/* Sidebar content can be added here */}
        <div className="lg:col-span-1">
          {/* Add sidebar content if needed */}
        </div>
      </div>
    </>
  );
};

export default DetailKuliner;
