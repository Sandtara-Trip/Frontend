import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import ImageUpload from "../../components/ImageUpload";
import MultiSelect from "../../components/MultiSelect";
import Dropdown from "../../components/Dropdown";
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";

const Room = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    hotel: "",
    type: "",
    price: "",
    adults: 1,
    children: 0,
    bedType: "",
    size: "",
    amenities: [],
    images: [],
    imageUrls: [],
    description: "",
    status: "available",
    totalQuantity: 1
  });

  const amenitiesOptions = [
    { label: "AC", value: "ac" },
    { label: "TV", value: "tv" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "Mini Bar", value: "minibar" },
    { label: "Safe", value: "safe" },
    { label: "Desk", value: "desk" },
    { label: "Shower", value: "shower" },
    { label: "Hairdryer", value: "hairdryer" },
    { label: "Toiletries", value: "toiletries" },
    { label: "Coffee Maker", value: "coffee_maker" },
    { label: "Refrigerator", value: "refrigerator" }
  ];

  const roomTypes = [
    { label: "Standard", value: "standard" },
    { label: "Superior", value: "superior" },
    { label: "Deluxe", value: "deluxe" },
    { label: "Suite", value: "suite" },
    { label: "Family", value: "family" },
    { label: "Executive", value: "executive" }
  ];

  const bedTypes = [
    { label: "Single", value: "single" },
    { label: "Twin", value: "twin" },
    { label: "Double", value: "double" },
    { label: "Queen", value: "queen" },
    { label: "King", value: "king" }
  ];

  const roomStatus = [
    { label: "Available", value: "available" },
    { label: "Occupied", value: "occupied" },
    { label: "Maintenance", value: "maintenance" }
  ];

  // Fetch rooms data
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/rooms`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch rooms');
      }
      
      setRooms(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError(err.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotels data
  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/hotels`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch hotels');
      }
      
      const hotelOptions = response.data.data.map(hotel => ({
        label: hotel.name,
        value: hotel._id
      }));
      
      setHotels(hotelOptions);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError(err.message || 'Failed to fetch hotels');
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.hotel || !formData.type || !formData.price || !formData.bedType || !formData.size) {
      setError("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Tambahkan field satu per satu
      formDataToSend.append('name', formData.name);
      formDataToSend.append('roomNumber', formData.roomNumber);
      formDataToSend.append('hotel', formData.hotel);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('adults', formData.adults.toString());
      formDataToSend.append('children', formData.children.toString());
      formDataToSend.append('bedType', formData.bedType);
      formDataToSend.append('size', formData.size.toString());
      formDataToSend.append('description', formData.description);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('totalQuantity', formData.totalQuantity.toString());

      // Handle array fields
      formDataToSend.append('amenities', JSON.stringify(formData.amenities));

      // Handle multiple file uploads
      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      let response;
      if (editingId) {
        response = await axios.put(`${API_BASE_URL}/api/rooms/${editingId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/api/rooms`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
          name: "",
          roomNumber: "",
          hotel: "",
          type: "",
          price: "",
          adults: 1,
          children: 0,
          bedType: "",
          size: "",
          amenities: [],
          images: [],
          imageUrls: [],
          description: "",
          status: "available",
          totalQuantity: 1
        });
        fetchRooms();
      }
    } catch (error) {
      console.error('Error saving room:', error);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data kamar');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (roomId, index) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      return;
    }

    try {
      setDeleteLoading(index);
      const response = await axios.delete(`${API_BASE_URL}/api/rooms/${roomId}/images/${index}`);
      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          imageUrls: response.data.data.images
        }));
        alert('Foto berhasil dihapus');
      } else {
        throw new Error(response.data.message || 'Gagal menghapus foto');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      setError(err.response?.data?.message || err.message || 'Gagal menghapus foto');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kamar ini?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.error('Error deleting room:', err);
      setError(err.response?.data?.message || 'Gagal menghapus kamar');
    }
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/rooms/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch room details');
      }
      
      const roomData = response.data.data;
      setFormData({
        name: roomData.name || "",
        roomNumber: roomData.roomNumber || "",
        hotel: roomData.hotel._id || "",
        type: roomData.type || "",
        price: roomData.price?.toString() || "",
        adults: roomData.capacity?.adults || 1,
        children: roomData.capacity?.children || 0,
        bedType: roomData.bedType || "",
        size: roomData.size?.toString() || "",
        amenities: roomData.amenities || [],
        images: [],
        imageUrls: roomData.images || [],
        description: roomData.description || "",
        status: roomData.status || "available",
        totalQuantity: roomData.quantity?.total || 1
      });
      
      setEditingId(id);
      setIsModalOpen(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching room details:', err);
      setError(err.message || 'Failed to fetch room details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <Breadcrumb
          items={[
            { label: "Room", href: "/room" },
            { label: isModalOpen ? (editingId ? "Edit Room" : "Add Room") : "Room List" }
          ]}
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isModalOpen ? (editingId ? "Edit Room" : "Add Room") : "Room List"}
          </h2>
          {!isModalOpen && (
            <Button onClick={() => setIsModalOpen(true)}>
              Add New Room
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isModalOpen ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Room Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter room name"
                required
              />
              <InputField
                label="Room Number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Enter room number"
                required
              />
              <Dropdown
                label="Hotel"
                name="hotel"
                options={hotels}
                selected={formData.hotel}
                onChange={(value) => setFormData(prev => ({ ...prev, hotel: value }))}
                required
              />
              <Dropdown
                label="Room Type"
                name="type"
                options={roomTypes}
                selected={formData.type}
                onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                required
              />
              <InputField
                label="Price per Night"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price per night"
                required
              />
              <InputField
                label="Adult Capacity"
                name="adults"
                type="number"
                min="1"
                value={formData.adults}
                onChange={handleChange}
                placeholder="Number of adults"
                required
              />
              <InputField
                label="Children Capacity"
                name="children"
                type="number"
                min="0"
                value={formData.children}
                onChange={handleChange}
                placeholder="Number of children"
              />
              <Dropdown
                label="Bed Type"
                name="bedType"
                options={bedTypes}
                selected={formData.bedType}
                onChange={(value) => setFormData(prev => ({ ...prev, bedType: value }))}
                required
              />
              <InputField
                label="Room Size (sqm)"
                name="size"
                type="number"
                value={formData.size}
                onChange={handleChange}
                placeholder="Room size in square meters"
                required
              />
              <InputField
                label="Total Quantity"
                name="totalQuantity"
                type="number"
                min="1"
                value={formData.totalQuantity}
                onChange={handleChange}
                placeholder="Number of rooms available"
                required
              />
              <Dropdown
                label="Status"
                name="status"
                options={roomStatus}
                selected={formData.status}
                onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                required
              />
            </div>

            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Room description"
              required
            />

            <MultiSelect
              label="Amenities"
              options={amenitiesOptions}
              selected={formData.amenities}
              onChange={(value) => setFormData(prev => ({ ...prev, amenities: value }))}
            />

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Photos
              </label>
              
              {/* Preview existing images */}
              {formData.imageUrls && formData.imageUrls.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Images:</p>
                  <div className="grid grid-cols-4 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img 
                          src={url.startsWith('http') ? url : `${API_BASE_URL}${url}`}
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            console.error('Error loading image:', url);
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(editingId, index)}
                          disabled={deleteLoading === index}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 disabled:opacity-50"
                        >
                          {deleteLoading === index ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Choose one or more images (maximum 5 images)
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                  setFormData({
                    name: "",
                    roomNumber: "",
                    hotel: "",
                    type: "",
                    price: "",
                    adults: 1,
                    children: 0,
                    bedType: "",
                    size: "",
                    amenities: [],
                    images: [],
                    imageUrls: [],
                    description: "",
                    status: "available",
                    totalQuantity: 1
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.hotel?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {room.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rp {room.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room.capacity?.adults} Adults, {room.capacity?.children} Children
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.status === 'available' ? 'bg-green-100 text-green-800' :
                        room.status === 'occupied' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(room._id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;

