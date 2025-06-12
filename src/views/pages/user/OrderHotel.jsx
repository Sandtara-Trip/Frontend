import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import PaymentCard from "../../../components/user/payment/paymentCard";
import InputTanggal from "../../../components/user/payment/InputTanggal";
import MetodePembayaranSelect from "../../../components/user/payment/MetodePembayaranSelect";
import CatatanTextarea from "../../../components/user/payment/CatatanTextarea";
import PembayaranDetail from "../../../components/user/payment/PembayaranDetail";
import NavbarAfter from "../../../components/user/NavbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import ScrollToTop from "../../../components/user/ScrollToTop";

const OrderHotel = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jumlahOrder, setJumlahOrder] = useState(1);
  const [tanggalCheckIn, setTanggalCheckIn] = useState("");
  const [tanggalCheckOut, setTanggalCheckOut] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("");
  const [catatan, setCatatan] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const hotelResponse = await axios.get(`${API_BASE_URL}/hotels`);
        if (!hotelResponse.data.success) {
          throw new Error("Failed to fetch hotel data");
        }

        let foundHotel = null;
        let foundRoom = null;

        for (const hotel of hotelResponse.data.data) {
          const roomsResponse = await axios.get(
            `${API_BASE_URL}/admin/hotel/${hotel._id}/rooms`
          );
          if (roomsResponse.data.success) {
            const room = roomsResponse.data.data.find((r) => r._id === roomId);
            if (room) {
              foundHotel = hotel;
              foundRoom = room;
              break;
            }
          }
        }

        if (!foundHotel || !foundRoom) {
          throw new Error("Room not found");
        }

        setHotelData({
          name: foundRoom.type,
          price: foundRoom.price,
          image: foundRoom.images[0]
            ? foundRoom.images[0].startsWith("http")
              ? foundRoom.images[0]
              : `${API_BASE_URL}${foundRoom.images[0]}`
            : "https://placehold.co/600x400?text=No+Image",
          description: foundRoom.description || "No description available",
          roomType: foundRoom.type,
          hotelId: foundHotel._id,
          hotelName: foundHotel.name,
        });
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError(err.message || "Error loading room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleIncrement = () => {
    setJumlahOrder(jumlahOrder + 1);
  };

  const handleDecrement = () => {
    if (jumlahOrder > 1) setJumlahOrder(jumlahOrder - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.group("Order Hotel Process");
    console.log("Starting order process...");

    const newErrors = {};

    if (!tanggalCheckIn)
      newErrors.tanggalCheckIn = "Tanggal check-in wajib diisi";
    if (!tanggalCheckOut)
      newErrors.tanggalCheckOut = "Tanggal check-out wajib diisi";

    if (tanggalCheckIn && tanggalCheckOut) {
      const checkInDate = new Date(tanggalCheckIn);
      const checkOutDate = new Date(tanggalCheckOut);
      if (checkInDate >= checkOutDate) {
        newErrors.tanggalCheckOut = "Tanggal check-out harus setelah check-in";
      }
    }

    if (!metodeBayar) newErrors.metodeBayar = "Metode pembayaran wajib dipilih";

    setErrors(newErrors);
    console.log("Form validation errors:", newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Form validation passed, preparing order data...");

        const formattedStartDate = new Date(tanggalCheckIn)
          .toISOString()
          .split("T")[0];
        const formattedEndDate = new Date(tanggalCheckOut)
          .toISOString()
          .split("T")[0];

        const orderData = {
          hotelId: hotelData.hotelId,
          roomId: roomId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          quantity: parseInt(jumlahOrder),
          paymentMethod: metodeBayar,
          notes: catatan || undefined,
        };

        console.log("Sending order data:", orderData);

        const response = await axios.post(
          `${API_BASE_URL}/order/hotel`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.group("API Response");
        console.log("Status:", response.status);
        console.log("Data:", response.data);
        console.groupEnd();

        if (response.data.success) {
          console.log("Order created successfully!");
          console.group("Order Details");
          console.log("Order ID:", response.data.data._id);
          console.log("Invoice Number:", response.data.invoiceNumber);
          console.log("Payment Token:", response.data.paymentToken);
          console.groupEnd();

          setFormSubmitted(true);

          const midtransRedirectUrl = `https://app.sandbox.midtrans.com/snap/v4/redirection/${response.data.paymentToken}`;
          console.log("Redirecting to:", midtransRedirectUrl);

          window.location.href = midtransRedirectUrl;
        } else {
          setError(response.data.message || "Failed to create order");
        }
      } catch (err) {
        console.group("Error Details");
        console.error("Error creating order:", err.message);

        if (err.response) {
          console.error("Response Status:", err.response.status);
          console.error("Response Data:", err.response.data);
        }

        console.groupEnd();

        const errorMessage =
          err.response?.data?.message || err.message || "Error creating order";
        setError(errorMessage);
      }
    } else {
      console.log("Form validation failed. Please check the errors.");
      setFormSubmitted(false);
    }

    console.groupEnd();
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

      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Form kiri */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 space-y-4 pt-16"
          >
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Pemesanan Ticket Hotel
              </h1>
              {hotelData && (
                <h2 className="text-lg sm:text-xl text-gray-800">
                  {hotelData.hotelName}
                </h2>
              )}
            </div>

            <PaymentCard
              item={hotelData}
              quantity={jumlahOrder}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              labelQuantity="Jumlah Kamar"
            />

            <InputTanggal
              label="Check-in"
              value={tanggalCheckIn}
              onChange={(e) => {
                setTanggalCheckIn(e.target.value);
                if (errors.tanggalCheckIn)
                  setErrors((prev) => ({ ...prev, tanggalCheckIn: "" }));
              }}
              error={errors.tanggalCheckIn}
            />

            <InputTanggal
              label="Check-out"
              value={tanggalCheckOut}
              onChange={(e) => {
                setTanggalCheckOut(e.target.value);
                if (errors.tanggalCheckOut)
                  setErrors((prev) => ({ ...prev, tanggalCheckOut: "" }));
              }}
              error={errors.tanggalCheckOut}
            />

            <MetodePembayaranSelect
              value={metodeBayar}
              onChange={(e) => {
                setMetodeBayar(e.target.value);
                if (errors.metodeBayar)
                  setErrors((prev) => ({ ...prev, metodeBayar: "" }));
              }}
              error={errors.metodeBayar}
            />

            <CatatanTextarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            <button
              type="submit"
              className={`w-full px-6 py-3 bg-warm-orange hover:bg-hover-orange text-white rounded-lg transition-colors ${
                !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isLoggedIn}
            >
              {isLoggedIn
                ? "Lanjutkan Pembayaran"
                : "Silahkan Login Terlebih Dahulu"}
            </button>

            {!isLoggedIn && (
              <div className="text-center mt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="text-warm-orange hover:underline"
                >
                  Klik di sini untuk login
                </button>
              </div>
            )}
          </form>

          {/* Kolom kanan */}
          {formSubmitted && hotelData && (
            <div className="w-full lg:w-1/3">
              <PembayaranDetail
                metodeBayar={metodeBayar}
                totalHarga={hotelData.price * jumlahOrder}
                tanggalKunjungan={`Check-in: ${tanggalCheckIn} - Check-out: ${tanggalCheckOut}`}
                jumlahTiket={jumlahOrder}
                catatan={catatan}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHotel;
