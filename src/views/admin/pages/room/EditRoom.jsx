import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import MultiSelect from "../../components/MultiSelect";
import Dropdown from "../../components/Dropdown";
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";

const EditRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
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

  // Fetch hotels for dropdown
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels`);
        const hotelOptions = response.data.data.map(hotel => ({
          label: hotel.name,
          value: hotel._id
        }));
        setHotels(hotelOptions);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError(err.response?.data?.message || "Failed to fetch hotels");
      }
    };

    fetchHotels();
  }, []);

  // Fetch room data
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/rooms/${id}`);
        const roomData = response.data.data;
        
        setFormData({
          name: roomData.name || "",
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
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch room details");
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

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
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.hotel || !formData.type || !formData.price || !formData.bedType || !formData.size) {
        throw new Error("Please fill in all required fields");
      }

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add all fields
      submitData.append('name', formData.name);
      submitData.append('hotel', formData.hotel);
      submitData.append('type', formData.type);
      submitData.append('price', formData.price.toString());
      submitData.append('adults', formData.adults.toString());
      submitData.append('children', formData.children.toString());
      submitData.append('bedType', formData.bedType);
      submitData.append('size', formData.size.toString());
      submitData.append('description', formData.description);
      submitData.append('status', formData.status);
      submitData.append('totalQuantity', formData.totalQuantity.toString());

      // Handle array fields
      submitData.append('amenities', JSON.stringify(formData.amenities));

      // Handle multiple file uploads
      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((file) => {
          submitData.append('images', file);
      });
      }

      // Send data to API
      const response = await axios.put(`${API_BASE_URL}/api/rooms/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert("Room updated successfully");
        navigate("/room");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error updating room");
      console.error("Error updating room:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (index) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/api/rooms/${id}/images/${index}`);
      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          imageUrls: response.data.data.images
        }));
        alert('Image deleted successfully');
      } else {
        throw new Error(response.data.message || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      setError(err.response?.data?.message || err.message || 'Failed to delete image');
    }
  };

  if (loading && !formData.type) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Room</h1>
          <p className="text-sm text-gray-600 mt-1">Edit informasi kamar yang sudah ada</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Room Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter room name"
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
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
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

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Room"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
