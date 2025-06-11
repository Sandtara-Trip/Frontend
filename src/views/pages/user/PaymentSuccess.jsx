import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavbarAfter from '../../../components/user/NavbarAfter';
import { API_BASE_URL } from '../../../config/api';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add userId state
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const verifyTokenAndFetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('order_id');
        const transactionStatus = searchParams.get('transaction_status');
        
        // Check if we have the necessary parameters
        if (!orderId) {
          setError('No order ID provided');
          setLoading(false);
          return;
        }

        // Check if token exists
        if (!token) {
          console.error('No token found');
          setError('Please log in to view order details');
          setLoading(false);
          return;
        }

        // Attempt to fetch order details with transaction status
        const response = await axios.get(
          `${API_BASE_URL}/order/${orderId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params: {
              transaction_status: transactionStatus || 'pending'
            }
          }
        );

        if (response.data.success) {
          setOrderDetails(response.data.data);
          
          // If payment is successful, show success message
          if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
            console.group('Payment Success - Sending Email Ticket');
            console.log('Order ID:', orderId);
            console.log('Transaction Status:', transactionStatus);
            console.log('Order Details:', response.data.data);
            
            // Send request to backend to send email ticket
            try {
              console.log('Sending request to send email ticket...');
              const emailResponse = await axios.post(
                `${API_BASE_URL}/order/${orderId}/send-ticket`,
                {},
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
              console.log('Email ticket response:', emailResponse.data);
              if (emailResponse.data.success) {
                console.log('Email ticket sent successfully');
              } else {
                console.error('Failed to send email ticket:', emailResponse.data.message);
              }
            } catch (emailErr) {
              console.error('Error sending email ticket:', emailErr);
              if (emailErr.response) {
                console.error('Response status:', emailErr.response.status);
                console.error('Response data:', emailErr.response.data);
              }
            }
            console.groupEnd();

            // Optionally refresh the order status after a delay
            setTimeout(async () => {
              try {
                const refreshResponse = await axios.get(
                  `${API_BASE_URL}/payment/status/${orderId}`,
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }
                );
                if (refreshResponse.data.success) {
                  setOrderDetails(prev => ({
                    ...prev,
                    ...refreshResponse.data.data
                  }));
                }
              } catch (err) {
                console.error('Error refreshing order status:', err);
              }
            }, 2000);
          }
        } else {
          throw new Error(response.data.message || 'Failed to fetch order details');
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        
        // Handle different types of errors
        if (err.response) {
          switch (err.response.status) {
            case 401:
              setError('Session expired. Please log in again.');
              localStorage.removeItem('token'); // Clear invalid token
              break;
            case 403:
              // Don't immediately redirect on 403, show error message first
              setError('You are not authorized to view this order. Please check if you are logged in with the correct account.');
              break;
            case 404:
              setError('Order not found. Please check your order details.');
              break;
            default:
              setError(err.response.data.message || 'Error fetching order details');
          }
        } else if (err.request) {
          setError('Network error. Please check your connection.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    verifyTokenAndFetchOrder();
  }, [location.search]);

  useEffect(() => {
    // Get user ID from localStorage when component mounts
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  const handleLogin = () => {
    // Store the current URL to redirect back after login
    const currentUrl = window.location.href;
    localStorage.setItem('redirectAfterLogin', currentUrl);
    navigate('/login');
  };

  const handleViewOrders = () => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      // Navigate to user profile with riwayat tab and include user ID in URL
      navigate(`/user-profile/${storedUserId}`, { state: { tab: 'riwayat' } });
    } else {
      // If no user ID, show error or redirect to login
      setError('Please log in to view your orders');
      navigate('/login');
    }
  };

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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error</h2>
            <p className="text-center text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleRetry}
                className="bg-warm-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
              {(error.includes('log in') || error.includes('authorized')) && (
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Log In
                </button>
              )}
              {userId && (
                <button
                  onClick={handleViewOrders}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Go to Profile
                </button>
              )}
            </div>
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
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {orderDetails?.paymentStatus === 'paid' ? 'Pembayaran Berhasil!' : 'Menunggu Pembayaran'}
          </h2>
          <p className="text-gray-600 mb-6">
            {orderDetails?.paymentStatus === 'paid' 
              ? 'Terima kasih telah melakukan pembayaran. Pesanan Anda telah dikonfirmasi dan tiket telah dikirim ke email Anda.'
              : 'Pesanan Anda sedang menunggu pembayaran atau konfirmasi pembayaran.'}
          </p>
          {orderDetails && (
            <div className="bg-gray-50 rounded p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Detail Pesanan:</h3>
              <p>Order ID: {orderDetails._id}</p>
              <p>Total: Rp {orderDetails.totalPrice?.toLocaleString('id-ID')}</p>
              <p>Status: {orderDetails.paymentStatus === 'paid' ? 'Lunas' : 'Menunggu Pembayaran'}</p>
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
          <button
            onClick={handleViewOrders}
            className="bg-warm-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Lihat Riwayat Pesanan
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess; 