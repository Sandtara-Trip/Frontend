import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaStar,
  FaTimes,
  FaSync,
  FaMoneyBillWave
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { showSuccess, showError, showConfirmation } from '../../../utils/sweetalert';
import { API_BASE_URL } from "../../../config/api";

const RiwayatTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [UPLOADED_IMAGE, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshingOrders, setRefreshingOrders] = useState({});
  const [loadingPayment, setLoadingPayment] = useState({});

  const fileInputRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/order/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefreshStatus = async (orderId) => {
    try {
      setRefreshingOrders(prev => ({ ...prev, [orderId]: true }));
      
      // Call the check status endpoint
      const response = await axios.get(`http://localhost:3000/payment/status/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        // Refresh the orders list to get updated status
        await fetchOrders();
      }
    } catch (error) {
      console.error('Error refreshing payment status:', error);
    } finally {
      setRefreshingOrders(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setComment("");
    setShowModal(true);
  };

  const resetForm = () => {
    setRating(0);
    setComment("");
    setSelectedOrder(null);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      showError('Mohon berikan rating terlebih dahulu');
      return;
    }

    if (!comment.trim()) {
      showError('Mohon isi ulasan terlebih dahulu');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('orderId', selectedOrder._id);
      formData.append('itemId', selectedOrder.items[0]?.itemId);
      formData.append('itemType', selectedOrder.orderType);
      formData.append('rating', rating);
      formData.append('comment', comment.trim());

      const response = await axios.post(
        'http://localhost:3000/order/review',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        await showSuccess('Ulasan berhasil dikirim!');
        setShowModal(false);
        resetForm();
        fetchOrders(); // Refresh the orders list to show updated review status
      } else {
        throw new Error(response.data.message || 'Gagal mengirim ulasan');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      showError(err.response?.data?.message || 'Terjadi kesalahan saat mengirim ulasan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async (orderId) => {
    try {
      setLoadingPayment(prev => ({ ...prev, [orderId]: true }));

      console.log('Initiating payment for order:', orderId);
      console.log('Auth token:', localStorage.getItem('token'));

      // Get payment token
      const response = await axios.get(`http://localhost:3000/payment/token/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Payment token response:', response.data);

      if (response.data.success) {
        const { redirectUrl, token } = response.data.data;
        
        if (redirectUrl) {
          console.log('Redirecting to payment URL:', redirectUrl);
          window.location.href = redirectUrl;
          return;
        } 
        
        if (token) {
          console.log('Using Snap token for payment');
          const snap = window.snap;
          snap.pay(token, {
            onSuccess: async function(result) {
              console.log('Payment success:', result);
              await handleRefreshStatus(orderId);
            },
            onPending: async function(result) {
              console.log('Payment pending:', result);
              await handleRefreshStatus(orderId);
            },
            onError: async function(result) {
              console.log('Payment error:', result);
              await handleRefreshStatus(orderId);
            },
            onClose: async function() {
              console.log('Customer closed the popup without finishing the payment');
              await handleRefreshStatus(orderId);
            }
          });
        } else {
          throw new Error('No payment URL or token received');
        }
      } else {
        throw new Error(response.data.message || 'Failed to get payment information');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        showError(`Gagal memulai pembayaran: ${error.response.data.message}`);
      } else {
        showError('Gagal memulai pembayaran. Silakan coba lagi.');
      }
    } finally {
      setLoadingPayment(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const getStatusBadge = (status, orderId) => {
    const badge = (icon, text, color, showPayButton = false) => (
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 text-${color}-600 font-semibold text-sm`}>
          {icon}
          <span>{text}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRefreshStatus(orderId);
            }}
            disabled={refreshingOrders[orderId]}
            className={`ml-2 text-gray-500 hover:text-gray-700 transition-colors ${
              refreshingOrders[orderId] ? 'animate-spin' : ''
            }`}
            title="Refresh status pembayaran"
          >
            <FaSync size={14} />
          </button>
          {showPayButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePayment(orderId);
              }}
              disabled={loadingPayment[orderId]}
              className={`ml-2 text-green-500 hover:text-green-700 transition-colors ${
                loadingPayment[orderId] ? 'animate-pulse' : ''
              }`}
              title="Lanjutkan pembayaran"
            >
              <FaMoneyBillWave size={14} />
            </button>
          )}
        </div>
      </div>
    );

    switch (status) {
      case "paid":
      case "confirmed":
        return badge(<FaCheckCircle className="text-green-500" />, "Success", "green");
      case "cancelled":
        return badge(<FaTimesCircle className="text-red-500" />, "Failed", "red");
      case "booked":
      case "pending":
        return badge(<FaClock className="text-yellow-500" />, "Pending", "yellow", true);
      default:
        return (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">{status}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRefreshStatus(orderId);
              }}
              disabled={refreshingOrders[orderId]}
              className={`ml-2 text-gray-500 hover:text-gray-700 transition-colors ${
                refreshingOrders[orderId] ? 'animate-spin' : ''
              }`}
              title="Refresh status pembayaran"
            >
              <FaSync size={14} />
            </button>
          </div>
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderTanggalInfo = (item) => {
    if (item.orderType === "hotel") {
      return (
        <div className="mt-2 bg-blue-50 text-xs text-blue-800 rounded-md p-2 flex flex-col gap-1 w-fit">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span><strong>Check-in:</strong> {formatDate(item.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span><strong>Check-out:</strong> {formatDate(item.endDate)}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-2 bg-yellow-50 text-xs text-yellow-800 rounded-md p-2 flex flex-col gap-1 w-fit">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            <span><strong>Dipesan:</strong> {formatDate(item.createdAt)}</span>
          </div>
          {item.visitDate && (
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
              <span><strong>Kunjungan:</strong> {formatDate(item.visitDate)}</span>
          </div>
          )}
        </div>
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-warm-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Pembelian</h1>
      <div className="space-y-6">
        {orders.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between flex-col sm:flex-row gap-4 sm:items-start">
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold text-warm-orange">
                  {item.orderType === "hotel" ? "Tiket Hotel" : "Tiket Wisata"}
                </h2>
                <p className="text-sm text-gray-600">
                  ID: <span className="font-mono">{item._id}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Jumlah: <strong>{item.items[0]?.quantity || 1}</strong>
                </p>
                {item.items[0]?.itemType === "room" && (
                  <p className="text-sm text-gray-700">
                    Jenis: <strong>{item.items[0]?.itemType}</strong>
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  Total Pembayaran: <strong>Rp {item.totalPrice.toLocaleString("id-ID")}</strong>
                </p>
                {item.notes && (
                  <p className="text-sm text-gray-500 italic">Catatan: {item.notes}</p>
                )}
                {renderTanggalInfo(item)}
              </div>
              <div className="text-right min-w-[120px]">{getStatusBadge(item.paymentStatus, item._id)}</div>
            </div>
            {(item.paymentStatus === "paid" || item.status === "confirmed") && !item.hasReview && (
              <div className="flex justify-end mt-4">
                <button
                  className="bg-warm-orange hover:bg-hover-orange text-white text-sm px-4 py-2 rounded-md transition"
                  onClick={() => handleOpenModal(item)}
                >
                  Beri Ulasan
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Beri Ulasan</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    className={`text-3xl ${num <= rating ? "text-light-orange" : "text-gray-300"} cursor-pointer`}
                    onClick={() => setRating(num)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ulasan:</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis ulasan Anda di sini..."
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                className={`px-4 py-2 text-sm bg-warm-orange text-white rounded hover:bg-hover-orange disabled:opacity-50 ${
                  isSubmitting ? 'cursor-not-allowed' : ''
                }`}
                onClick={handleSubmitReview}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatTab;