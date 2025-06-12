import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "../../../components/user/NavbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import { IoIosPin, IoMdPricetags } from "react-icons/io";
import DetailImageSlider from "../../../components/user/detailImageSlider";
import TabContent from "../../../components/user/TabContent";
import { API_BASE_URL } from '../../../config/api';
import ScrollToTop from "../../../components/user/ScrollToTop";

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
       <ScrollToTop />
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
    description: event.description,
    status: event.status
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
              <span className={`px-2 py-1 rounded-full text-xs ${
                event.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {event.status}
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
            {["Deskripsi"].map((tab) => (
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

          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>
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
