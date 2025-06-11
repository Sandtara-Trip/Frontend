import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentCard from "../../../components/user/payment/paymentCard";
import InputTanggal from "../../../components/user/payment/InputTanggal";
import MetodePembayaranSelect from "../../../components/user/payment/MetodePembayaranSelect";
import CatatanTextarea from "../../../components/user/payment/CatatanTextarea";
import PembayaranDetail from "../../../components/user/payment/PembayaranDetail";
import NavbarAfter from "../../../components/user/NavbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import { API_BASE_URL } from '../../../config/api';

const OrderWisata = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [jumlahOrder, setJumlahOrder] = useState(1);
  const [tanggal, setTanggal] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("");
  const [catatan, setCatatan] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");

  // Fetch destination data when component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    const fetchDestinationDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wisata/${id}`);
        console.log('Destination API Response:', response.data); // Debug log
        
        if (response.data.success) {
          const destinationData = response.data.data;
          
          // Transform data to match expected format
          const transformedData = {
            name: destinationData.nama || destinationData.name,
            price: destinationData.harga || destinationData.price || 0,
            detail: destinationData.deskripsi || destinationData.detail,
            images: destinationData.gambar || destinationData.images || []
          };
          
          console.log('Transformed destination data:', transformedData); // Debug log
          setDestination(transformedData);
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

    checkLoginStatus();
    fetchDestinationDetails();
  }, [id]);

  const handleIncrement = () => setJumlahOrder(jumlahOrder + 1);
  const handleDecrement = () => {
    if (jumlahOrder > 1) setJumlahOrder(jumlahOrder - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!tanggal) newErrors.tanggal = "Tanggal wajib diisi";
    if (!metodeBayar) newErrors.metodeBayar = "Metode pembayaran wajib dipilih";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Format the date properly - ensure it's in UTC
        const visitDate = new Date(tanggal);
        visitDate.setHours(0, 0, 0, 0);
        const formattedDate = visitDate.toISOString();
        
        // Create order payload according to API requirements
        const orderPayload = {
          destinationId: id,
          visitDate: formattedDate,
          quantity: parseInt(jumlahOrder),
          paymentMethod: "transfer", // Always set to "transfer" as per API requirements
          notes: catatan || undefined // Only include if not empty
        };

        console.log('Sending order payload:', orderPayload); // Debug log
        
        // Send order to API
        const response = await axios.post(`${API_BASE_URL}/order/wisata`, orderPayload, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('API Response:', response.data); // Debug log
        
        if (response.data.success) {
          setOrderSuccess(true);
          setOrderId(response.data.data._id);
          setFormSubmitted(true);
          
          // If payment URL is provided in the response
          if (response.data.data.paymentUrl) {
            setPaymentUrl(response.data.data.paymentUrl);
            // Open payment URL in new tab
            window.open(response.data.data.paymentUrl, '_blank');
          }
        } else {
          setError(response.data.message || "Failed to create order");
        }
      } catch (err) {
        console.error("Error creating order:", err);
        const errorMessage = err.response?.data?.message || err.message || "Error connecting to the server";
        setError(errorMessage);
        
        // Log detailed error information
        console.error('Detailed error:', {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        });
      }
    } else {
      setFormSubmitted(false);
    }
  };

  // If loading, show loading spinner
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

  // If error or no destination found
  if (error || !destination) {
    return (
      <>
        {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}
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
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Kolom Kiri */}
        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-4 pt-16">
          <h1 className="text-2xl font-bold mb-4">Pemesanan Tiket Wisata</h1>

          {orderSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <h2 className="font-bold text-lg">Pesanan Berhasil Dibuat!</h2>
              <p className="my-2">Silahkan lanjutkan ke halaman pembayaran untuk menyelesaikan transaksi.</p>
              <div className="mt-4 flex flex-col space-y-2">
                {paymentUrl && (
                  <a 
                    href={paymentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn bg-green-500 hover:bg-green-600 text-white border-none"
                  >
                    Lanjutkan ke Pembayaran
                  </a>
                )}
                <button
                  onClick={() => navigate('/profile')}
                  className="btn bg-gray-500 hover:bg-gray-600 text-white border-none"
                >
                  Lihat Riwayat Pesanan
                </button>
              </div>
            </div>
          ) : (
            <>
              <PaymentCard
                item={{
                  name: destination.name,
                  price: destination.price || 0,
                  image: destination.images && destination.images.length > 0 
                    ? (destination.images[0].startsWith('http')
                        ? destination.images[0]
                        : destination.images[0].startsWith('/')
                          ? `${API_BASE_URL}${destination.images[0]}`
                          : `${API_BASE_URL}/uploads/${destination.images[0]}`)
                    : "/img/placeholder.jpg",
                  description: destination.detail || "Tidak ada deskripsi"
                }}
                quantity={jumlahOrder}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                labelQuantity="Jumlah Tiket"
              />

              <InputTanggal
                label="Tanggal Kunjungan"
                value={tanggal}
                onChange={(e) => {
                  setTanggal(e.target.value);
                  if (errors.tanggal) setErrors((prev) => ({ ...prev, tanggal: "" }));
                }}
                error={errors.tanggal}
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
                  !isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isLoggedIn}
              >
                {isLoggedIn ? "Lanjutkan Pembayaran" : "Silahkan Login Terlebih Dahulu"}
              </button>

              {!isLoggedIn && (
                <div className="text-center mt-2">
                  <button 
                    onClick={() => navigate('/login')} 
                    className="text-warm-orange hover:underline"
                  >
                    Klik di sini untuk login
                  </button>
                </div>
              )}
            </>
          )}
        </form>

        {/* Kolom Kanan */}
        {formSubmitted && !orderSuccess && (
          <div className="w-full lg:w-1/3">
            <PembayaranDetail
              metodeBayar={metodeBayar}
              totalHarga={destination.price * jumlahOrder}
              jumlahTiket={jumlahOrder}
              tanggalKunjungan={tanggal}
              catatan={catatan}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderWisata;
