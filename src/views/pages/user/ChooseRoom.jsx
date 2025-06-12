import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "../../../components/user/NavbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import { API_BASE_URL } from "../../../config/api";
import ScrollToTop from "../../../components/user/ScrollToTop";

const ChooseRoom = () => {
  const navigate = useNavigate();
  const { id: hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/admin/hotel/${hotelId}/rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Room response:", response.data);
        if (response.data.success) {
          const transformedRooms = response.data.data.map((room) => ({
            _id: room._id,
            type: room.type,
            name: room.name,
            price: room.price,
            images: room.images.map((img) =>
              img.startsWith("http") ? img : `${API_BASE_URL}${img}`
            ),
            facilities: room.amenities || [],
            available:
              room.status === "available" && room.quantity.available > 0,
            capacity: room.capacity.adults + (room.capacity.children || 0),
            restrictions: [],
            description: room.description,
          }));
          setRooms(transformedRooms);
        } else {
          setError(response.data.message || "Failed to load rooms");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rooms:", err.response?.data || err.message);
        setError(
          err.response?.data?.message ||
            "Failed to load rooms. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleLihatDetail = (room) => {
    setSelectedRoom(room);
  };

  const handlePesanSekarang = (id) => {
    navigate(`/order-hotel/${id}`);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error!</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
     <ScrollToTop />
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
      <div className="pt-16">
        <div className="min-h-screen px-4 py-6 lg:p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-warm-orange">
            Pilih Kamar Hotel
          </h1>

          <div className="space-y-6">
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <div
                  key={room._id}
                  className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="md:w-1/3 relative">
                    <div className="w-full aspect-[4/3] md:aspect-auto md:h-64 overflow-hidden rounded-lg">
                      <img
                        src={room.images[0]}
                        alt={`${room.name || room.type}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/600x400?text=No+Image";
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {room.name} - {room.type}
                        </h2>
                        <p className="text-warm-orange font-bold mt-2">
                          Rp {room.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-4 text-gray-600 mb-3 flex flex-wrap gap-2 text-sm">
                      {room.facilities.slice(0, 3).map((facility, idx) => (
                        <li
                          key={idx}
                          className="bg-gray-100 px-3 py-1 rounded-full border text-sm"
                        >
                          {facility}
                        </li>
                      ))}
                      {room.facilities.length > 3 && (
                        <li className="text-xs text-gray-500 italic inline-flex items-center">
                          + {room.facilities.length - 3} lainnya
                        </li>
                      )}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                      <p>Status: {room.available ? "Tersedia" : "Penuh"}</p>
                      <p>Kapasitas: {room.capacity} orang</p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <button
                        onClick={() => handleLihatDetail(room)}
                        className="text-semibold px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        Lihat Detail
                      </button>
                      {room.available && (
                        <button
                          onClick={() => handlePesanSekarang(room._id)}
                          className="text-semibold px-6 py-2 bg-warm-orange hover:bg-hover-orange text-white rounded-lg transition-colors"
                        >
                          Pesan Sekarang
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada kamar tersedia saat ini</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedRoom && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-black hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <img
              src={selectedRoom.images[0]}
              alt={`${selectedRoom.name || selectedRoom.type}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400?text=No+Image";
              }}
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {selectedRoom.name} - {selectedRoom.type}
            </h2>
            <p className="text-sm mb-3 text-gray-700">{selectedRoom.description}</p>
            <p className="text-warm-orange font-semibold mb-4">
              Rp {selectedRoom.price.toLocaleString("id-ID")}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Fasilitas:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.facilities.map((facility, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRoom.restrictions && selectedRoom.restrictions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Peraturan:</h3>
                  <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                    {selectedRoom.restrictions.map((restriction, idx) => (
                      <li key={idx}>{restriction}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-x-4 text-sm text-gray-500">
                <p>Kapasitas: {selectedRoom.capacity} orang</p>
                <p>Status: {selectedRoom.available ? "Tersedia" : "Penuh"}</p>
              </div>
            </div>

            {selectedRoom.available && (
              <button
                onClick={() => {
                  closeModal();
                  handlePesanSekarang(selectedRoom._id);
                }}
                className="w-full mt-6 px-6 py-3 bg-warm-orange hover:bg-hover-orange text-white rounded-lg transition-colors"
              >
                Pesan Sekarang
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseRoom;
