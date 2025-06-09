import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavbarAfter from '../../../components/user/NavbarAfter';
import Footer from '../../../components/user/footer';
import axios from 'axios';
import { showSuccess, showError } from '../../../utils/sweetalert';

const Payment = () => {
  const { invoiceNumber } = useParams();
  const location = useLocation();
  const { paymentToken, orderDetails } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.group('Payment Page Initialization');
    console.log('Invoice Number:', invoiceNumber);
    console.log('Payment Token:', paymentToken);
    console.log('Order Details:', orderDetails);
    console.groupEnd();
  }, [invoiceNumber, paymentToken, orderDetails]);

  const handlePayment = async () => {
    console.group('Payment Process');
    console.log('Starting payment process...');
    
    try {
      setIsProcessing(true);
      console.log('Preparing payment data...');
      
      const paymentData = {
        transaction_status: 'settlement',
        order_id: orderDetails._id,
        gross_amount: `${orderDetails.totalPrice}.00`
      };
      
      console.log('Payment Data:', paymentData);
      console.log('Sending payment request to backend...');
      
      // Send payment request
      const response = await axios.post(
        'http://localhost:3000/payment/midtrans-notify',
        paymentData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.group('Payment Response');
      console.log('Status:', response.status);
      console.log('Headers:', response.headers);
      console.log('Data:', response.data);
      console.groupEnd();

      if (response.data.success) {
        console.log('Payment notification sent successfully!');
        console.log('Opening Midtrans simulator...');
        
        // Open Midtrans simulator
        window.open('https://simulator.sandbox.midtrans.com/', '_blank');
        
        await showSuccess('Pembayaran berhasil! Silahkan cek status pembayaran di simulator Midtrans.');
      } else {
        console.error('Payment notification failed:', response.data.message);
        showError('Gagal memproses pembayaran. Silakan coba lagi.');
      }
    } catch (error) {
      console.group('Payment Error');
      console.error('Error processing payment:', error.message);
      
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
        console.error('Response Data:', error.response.data);
      }
      
      if (error.request) {
        console.error('Request Details:', error.request);
      }
      
      console.error('Error Config:', error.config);
      console.groupEnd();
      
      showError('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
      console.log('Payment process completed.');
      console.groupEnd();
    }
  };

  if (!orderDetails) {
    console.error('No payment details found');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error!</p>
          <p>No payment details found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavbarAfter />
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-warm-orange">
            Detail Pembayaran
          </h1>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-4">Informasi Pesanan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Nomor Invoice:</p>
                  <p className="font-medium">{invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status Pembayaran:</p>
                  <p className="font-medium capitalize">{orderDetails.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Pembayaran:</p>
                  <p className="font-medium text-warm-orange">
                    Rp {orderDetails.totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Metode Pembayaran:</p>
                  <p className="font-medium capitalize">{orderDetails.paymentMethod.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-4">Detail Reservasi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Check-in:</p>
                  <p className="font-medium">
                    {new Date(orderDetails.startDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Check-out:</p>
                  <p className="font-medium">
                    {new Date(orderDetails.endDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Jumlah:</p>
                  <p className="font-medium">{orderDetails.items[0]?.quantity || 1}</p>
                </div>
                {orderDetails.notes && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Catatan:</p>
                    <p className="font-medium">{orderDetails.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {orderDetails.paymentStatus === 'pending' && (
              <div className="text-center">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`btn btn-primary bg-warm-orange hover:bg-hover-orange text-white border-none px-8 py-3 rounded-lg ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'Memproses...' : 'Proses Pembayaran'}
                </button>
                {isProcessing && (
                  <p className="mt-2 text-sm text-gray-600">
                    Silahkan tunggu, Anda akan diarahkan ke simulator pembayaran...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment; 