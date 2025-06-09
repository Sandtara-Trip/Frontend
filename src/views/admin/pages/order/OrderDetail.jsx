import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../../../config/api";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch order details');
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.response?.data?.message || err.message || 'Error loading order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Tidak ada tanggal';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Format tanggal tidak valid';
      
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Format tanggal tidak valid';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Kembali
          </button>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error!</p>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (!order) {
      return (
        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Kembali
          </button>
          <div className="text-center text-gray-500">
            Order tidak ditemukan
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Detail Order</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Informasi Order</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-medium">Order ID:</span> {order._id}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Tanggal Order:</span>{" "}
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Tipe Order:</span>{" "}
                    <span className="capitalize">{order.orderType}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Status Pembayaran:</span>{" "}
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Total Harga:</span>{" "}
                    Rp {order.totalPrice?.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-medium">Nama:</span> {order.user?.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {order.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Detail Booking</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {order.bookingDate && (
                    <p className="mb-2">
                      <span className="font-medium">Tanggal Booking:</span>{" "}
                      {formatDate(order.bookingDate)}
                    </p>
                  )}
                  <p className="mb-2">
                    <span className="font-medium">
                      {order.orderType === 'hotel' ? 'Check-in' : 'Tanggal Kunjungan'}:
                    </span>{" "}
                    {formatDate(order.startDate)}
                  </p>
                  {order.orderType === 'hotel' && order.endDate && (
                    <p className="mb-2">
                      <span className="font-medium">Check-out:</span>{" "}
                      {formatDate(order.endDate)}
                    </p>
                  )}
                  <p className="mb-2">
                    <span className="font-medium">Jumlah:</span>{" "}
                    {order.items?.[0]?.quantity || 1}
                  </p>
                  {order.notes && (
                    <p>
                      <span className="font-medium">Catatan:</span> {order.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Informasi Pembayaran</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-medium">Metode Pembayaran:</span>{" "}
                    <span className="capitalize">{order.paymentMethod?.replace('_', ' ')}</span>
                  </p>
                  {order.paymentUrl && (
                    <p>
                      <span className="font-medium">Payment URL:</span>{" "}
                      <a
                        href={order.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Lihat Link Pembayaran
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {renderContent()}
      </div>
    </div>
  );
} 