import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, axiosInstance } from "../../../../config/api";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Search from "../../components/search";
import Button from "../../components/button";

const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/event');
      if (response.data.success) {
        const eventsWithFullUrls = response.data.data.map(event => ({
          ...event,
          images: event.images?.map(img => img.startsWith('http') ? img : `${API_BASE_URL}${img}`)
        }));
        setEvents(eventsWithFullUrls);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      if (err.response?.status === 401) {
        setError('Sesi telah berakhir. Silakan login kembali.');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || "Failed to fetch events");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/admin/event/${id}`);
      if (response.data.success) {
        fetchEvents();
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      if (err.response?.status === 401) {
        setError('Sesi telah berakhir. Silakan login kembali.');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || "Failed to delete event");
      }
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                Data Event
              </h2>
              <div className="flex items-center gap-2">
                <Search 
                  placeholder="Cari Event..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link
                  to="/admin/event/add"
                  className="bg-[#FFBF69] hover:bg-[#FFB042] text-black px-4 py-2 rounded-lg"
                >
                  Tambah Event
                </Link>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mb-4">
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
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">End Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Capacity</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEvents.map((event) => (
                      <tr key={event._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{event.name}</td>
                        <td className="px-6 py-4">Rp {event.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          {new Date(event.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(event.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{event.capacity}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              event.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {event.status}
                          </span>
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
  );
};

export default Event; 