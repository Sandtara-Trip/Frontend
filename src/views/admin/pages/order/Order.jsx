import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Button from "../../components/button";
import Table from "../../components/tabel";
import Search from "../../components/search";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      
      console.log('Fetching orders from:', `${API_BASE_URL}/admin/orders`);
      console.log('Auth token:', localStorage.getItem('token'));
      
      const response = await axios.get(`${API_BASE_URL}/admin/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response:', response);
      
      if (response.data.success) {
        console.log('Orders fetched successfully:', response.data);
        // Ensure we have an array of orders
        const ordersData = Array.isArray(response.data.data) ? response.data.data : [];
        setOrders(ordersData);
        setError(null);
      } else {
        console.error('Failed to fetch orders:', response.data);
        setError(response.data.message || "Gagal mengambil data order");
        setOrders([]); // Reset orders on error
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      
      let errorMessage = "Gagal mengambil data order";
      
      if (err.response) {
        // Error from server with response
        if (err.response.status === 401) {
          errorMessage = "Sesi login telah berakhir. Silakan login kembali.";
          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else if (err.response.status === 403) {
          errorMessage = "Anda tidak memiliki akses ke halaman ini.";
        } else if (err.response.status === 500) {
          errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
        } else {
          errorMessage = err.response.data.message || err.response.data || errorMessage;
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      }
      
      setError(errorMessage);
      setOrders([]); // Reset orders on error
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus order ini?")) {
      try {
        console.log('Deleting order:', id);
        const response = await axios.delete(`${API_BASE_URL}/admin/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          console.log('Order deleted successfully');
          setOrders(orders.filter(order => order._id !== id));
          alert("Order berhasil dihapus");
        } else {
          throw new Error(response.data.message || "Gagal menghapus order");
        }
      } catch (err) {
        console.error('Error deleting order:', err);
        const errorMessage = err.response?.data?.message || err.message || "Gagal menghapus order";
        alert(errorMessage);
      }
    }
  };

  // Download orders
  const handleDownload = async () => {
    try {
      console.log('Downloading orders...');
      const response = await axios.get(`${API_BASE_URL}/admin/orders/excel`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'orders.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log('Download completed');
    } catch (err) {
      console.error('Error downloading orders:', err);
      const errorMessage = err.response?.data?.message || err.message || "Gagal mengunduh data order";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { key: "id", label: "No" },
    { key: "user", label: "User" },
    { key: "orderType", label: "Tipe Order" },
    { key: "totalPrice", label: "Total Harga" },
    { key: "paymentStatus", label: "Status Pembayaran" },
    { key: "status", label: "Status Order" },
    { key: "aksi", label: "Aksi" },
  ];

  const filteredOrders = orders.filter(order =>
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderRow = (order, index) => (
    <tr
      key={order._id}
      className={`border-b hover:bg-gray-50 ${
        index % 2 === 1 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <td className="p-3">{index + 1}</td>
      <td className="p-3">
        <div className="flex flex-col">
          <span className="font-medium">{order.user?.name || 'N/A'}</span>
          <span className="text-sm text-gray-500">{order.user?.email || 'N/A'}</span>
        </div>
      </td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded-full text-sm ${
          order.orderType === 'hotel' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {order.orderType === 'hotel' ? 'Hotel' : 'Wisata'}
        </span>
      </td>
      <td className="p-3">
        Rp {order.totalPrice?.toLocaleString('id-ID')}
      </td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded-full text-sm ${
          order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
          order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {order.paymentStatus === 'paid' ? 'Lunas' :
           order.paymentStatus === 'pending' ? 'Menunggu' :
           'Dibatalkan'}
        </span>
      </td>
      <td className="p-3">
        <span className={`px-2 py-1 rounded-full text-sm ${
          order.status === 'completed' ? 'bg-green-100 text-green-800' :
          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
          order.status === 'booked' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {order.status === 'completed' ? 'Selesai' :
           order.status === 'confirmed' ? 'Dikonfirmasi' :
           order.status === 'booked' ? 'Dipesan' :
           'Dibatalkan'}
        </span>
      </td>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Lihat Detail"
            onClick={() => navigate(`/admin/orders/${order._id}`)}
          >
            <FaEye />
          </button>
          <button 
            className="text-red-500 hover:text-red-700" 
            title="Hapus"
            onClick={() => handleDelete(order._id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Judul tabel */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">Data Order</h2>

              {/* Search & Download */}
              <div className="flex items-center gap-2">
                <Search 
                  placeholder="Cari Order..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleDownload}>
                  Download Data Order
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mb-4">
                <p className="font-bold">Error!</p>
                <p>{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              /* Tabel */
              <Table
                columns={columns}
                data={filteredOrders}
                renderRow={renderRow}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

