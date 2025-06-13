import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Button from "../../components/button";
import { API_BASE_URL, axiosInstance } from "../../../../config/api";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get('/admin/event');
      if (response.data.success) {
        setEvents(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message || 'Terjadi kesalahan saat mengambil data event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/admin/event/${id}`);
      if (response.data.success) {
        setEvents(events.filter(event => event._id !== id));
      } else {
        throw new Error(response.data.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(error.message || 'Terjadi kesalahan saat menghapus event');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Data Kuliner
                </h2>
                <Link to="/admin/event/add">
                  <Button type="button">
                    Tambah Event
                  </Button>
                </Link>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Kategori</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {events.map((event) => (
                        <tr key={event._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{event.name}</td>
                          <td className="px-6 py-4">
                            <div className="max-w-xs overflow-hidden text-ellipsis">
                              {event.description}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                event.category === "kuliner khas denpasar"
                                  ? "bg-green-100 text-green-800"
                                  : event.category === "toko oleh-oleh"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {event.category || "Tidak ada kategori"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {event.images && event.images.length > 0 && (
                              <img
                                src={event.images[0].startsWith('http')
                                  ? event.images[0]
                                  : `${API_BASE_URL}${event.images[0]}`}
                                alt={event.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Link
                                to={`/admin/event/edit/${event._id}`}
                                className="text-[#FFBF69] hover:text-[#FFB042]"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(event._id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;