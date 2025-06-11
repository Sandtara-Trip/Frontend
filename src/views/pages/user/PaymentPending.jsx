import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarAfter from '../../../components/user/NavbarAfter';
import { API_BASE_URL } from '../../../config/api';

const PaymentPending = ({ queryParams }) => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/order/${queryParams.orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setOrderDetails(response.data.data);
        } else {
          setError('Gagal mengambil detail order');
        }
      } catch (err) {
        setError('Gagal mengambil detail order');
      } finally {
        setLoading(false);
      }
    };
    if (queryParams.orderId) {
      fetchOrderDetails();
    }
  }, [queryParams.orderId]);

  if (loading) {
    return (
      <>
        <NavbarAfter />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-warm-orange"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarAfter />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-warm-orange hover:bg-hover-orange text-white py-2 px-4 rounded transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAfter />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pembayaran Menunggu</h2>
          <p className="text-gray-600 mb-6">
            Pembayaran Anda sedang diproses. Silakan selesaikan pembayaran sesuai instruksi pada Midtrans.
          </p>
          {orderDetails && (
            <div className="bg-gray-50 rounded p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Detail Pesanan:</h3>
              <p>Order ID: {orderDetails._id}</p>
              <p>Total: Rp {orderDetails.totalPrice?.toLocaleString('id-ID')}</p>
              <p>Status Transaksi: {queryParams.transactionStatus}</p>
              <p>Status Pembayaran: {orderDetails.paymentStatus}</p>
              {orderDetails.orderType === 'hotel' ? (
                <>
                  <p>Check-in: {new Date(orderDetails.startDate).toLocaleDateString('id-ID')}</p>
                  <p>Check-out: {new Date(orderDetails.endDate).toLocaleDateString('id-ID')}</p>
                </>
              ) : (
                <p>Tanggal Kunjungan: {new Date(orderDetails.startDate).toLocaleDateString('id-ID')}</p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-warm-orange hover:bg-hover-orange text-white py-2 px-4 rounded transition-colors"
            >
              Lihat Riwayat Pesanan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPending; 