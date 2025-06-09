import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentCard from "../../../components/user/payment/paymentCard";
import InputTanggal from "../../../components/user/payment/InputTanggal";
import MetodePembayaranSelect from "../../../components/user/payment/MetodePembayaranSelect";
import CatatanTextarea from "../../../components/user/payment/CatatanTextarea";
import PembayaranDetail from "../../../components/user/payment/PembayaranDetail";
import NavbarAfter from "../../../components/user/NavbarAfter";

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

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        // First get the hotel ID from the URL
        const hotelResponse = await axios.get('http://localhost:3000/hotels');
        if (!hotelResponse.data.success) {
          throw new Error("Failed to fetch hotel data");
        }

        // Find the hotel that has this room
        let foundHotel = null;
        let foundRoom = null;

        for (const hotel of hotelResponse.data.data) {
          // Get rooms for this hotel
          const roomsResponse = await axios.get(`http://localhost:3000/admin/hotel/${hotel._id}/rooms`);
          if (roomsResponse.data.success) {
            const room = roomsResponse.data.data.find(r => r._id === roomId);
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
          image: foundRoom.images[0] ? 
            (foundRoom.images[0].startsWith('http') 
              ? foundRoom.images[0] 
              : `http://localhost:3000${foundRoom.images[0]}`) : 
            'https://placehold.co/600x400?text=No+Image',
          description: foundRoom.description || "No description available",
          roomType: foundRoom.type,
          hotelId: foundHotel._id,
          hotelName: foundHotel.name
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
    console.group('Order Hotel Process');
    console.log('Starting order process...');
    
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
    console.log('Form validation errors:', newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log('Form validation passed, preparing order data...');
        
        // Format dates to YYYY-MM-DD
        const formattedStartDate = new Date(tanggalCheckIn).toISOString().split('T')[0];
        const formattedEndDate = new Date(tanggalCheckOut).toISOString().split('T')[0];

        const orderData = {
          hotelId: hotelData.hotelId,
          roomId: roomId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          quantity: parseInt(jumlahOrder),
          paymentMethod: metodeBayar,
          notes: catatan || undefined
        };

        console.log('Sending order data:', orderData);

        const response = await axios.post(
          "http://localhost:3000/order/hotel",
          orderData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.group('API Response');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        console.groupEnd();

        if (response.data.success) {
          console.log('Order created successfully!');
          console.group('Order Details');
          console.log('Order ID:', response.data.data._id);
          console.log('Invoice Number:', response.data.invoiceNumber);
          console.log('Payment Token:', response.data.paymentToken);
          console.groupEnd();
          
          setFormSubmitted(true);

          // Construct Midtrans redirect URL
          const midtransRedirectUrl = `https://app.sandbox.midtrans.com/snap/v4/redirection/${response.data.paymentToken}`;
          console.log('Redirecting to:', midtransRedirectUrl);
          
          // Redirect to Midtrans payment page
          window.location.href = midtransRedirectUrl;
        } else {
          setError(response.data.message || "Failed to create order");
        }
      } catch (err) {
        console.group('Error Details');
        console.error('Error creating order:', err.message);
        
        if (err.response) {
          console.error('Response Status:', err.response.status);
          console.error('Response Data:', err.response.data);
        }
        
        console.groupEnd();
        
        const errorMessage = err.response?.data?.message || err.message || "Error creating order";
        setError(errorMessage);
      }
    } else {
      console.log('Form validation failed. Please check the errors.');
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
      <NavbarAfter />

      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Form kiri */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 space-y-4 pt-16"
          >
            <h1 className="text-2xl font-bold mb-4">Pemesanan Ticket Hotel</h1>
            
            {hotelData && (
              <div className="mb-4">
                <h2 className="text-lg text-gray-600">{hotelData.hotelName}</h2>
                <p className="text-sm text-gray-500">Tipe Kamar: {hotelData.roomType}</p>
              </div>
            )}

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
              className="btn btn-primary w-full bg-orange-500 hover:bg-orange-600 border-none text-white"
            >
              Lanjutkan Pembayaran
            </button>
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
