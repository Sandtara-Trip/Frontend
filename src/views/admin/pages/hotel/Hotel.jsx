import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import ImageUpload from "../../components/ImageUpload";
import MultiSelect from "../../components/MultiSelect";
import Dropdown from "../../components/Dropdown";
import TimePicker from "../../components/TimePicker";
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";

const Hotel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    coordinates: [0, 0],
    facilities: [],
    images: [],
    imageUrls: [],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    policies: [],
    status: "active",
    contactInfo: {
      phone: "",
      email: "",
      website: ""
    }
  });

  const facilityOptions = [
    { label: "Parkir", value: "parking" },
    { label: "Restoran", value: "restaurant" },
    { label: "Kolam Renang", value: "swimming_pool" },
    { label: "Gym", value: "gym" },
    { label: "Spa", value: "spa" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "Ruang Rapat", value: "meeting_room" },
    { label: "Laundry", value: "laundry" }
  ];

  const statusOptions = [
    { label: "Aktif", value: "active" },
    { label: "Tidak Aktif", value: "inactive" },
    { label: "Pemeliharaan", value: "maintenance" }
  ];

  // Fetch hotels data
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/hotels`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch hotels');
      }
      
      setHotels(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError(err.message || 'Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setError("Maksimal 5 gambar yang dapat diupload");
      return;
    }

    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        setError(`File ${file.name} bukan gambar yang valid`);
      }
      if (!isValidSize) {
        setError(`File ${file.name} melebihi batas ukuran 5MB`);
      }
      
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: validFiles
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.description || !formData.address || 
        !formData.city || !formData.province || !formData.contactInfo.phone || 
        !formData.contactInfo.email) {
      setError("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Basic info
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('province', formData.province);
      formDataToSend.append('coordinates', JSON.stringify(formData.coordinates));
      formDataToSend.append('facilities', JSON.stringify(formData.facilities));
      formDataToSend.append('checkInTime', formData.checkInTime);
      formDataToSend.append('checkOutTime', formData.checkOutTime);
      formDataToSend.append('policies', JSON.stringify(formData.policies));
      formDataToSend.append('status', formData.status);
      
      // Contact info
      formDataToSend.append('phone', formData.contactInfo.phone);
      formDataToSend.append('email', formData.contactInfo.email);
      if (formData.contactInfo.website) {
        formDataToSend.append('website', formData.contactInfo.website);
      }

      // Handle multiple file uploads
      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      let response;
      if (editingId) {
        response = await axios.put(`${API_BASE_URL}/api/hotels/${editingId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/api/hotels`, formDataToSend, {
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
          description: "",
          address: "",
          city: "",
          province: "",
          coordinates: [0, 0],
          facilities: [],
          images: [],
          imageUrls: [],
          checkInTime: "14:00",
          checkOutTime: "12:00",
          policies: [],
          status: "active",
          contactInfo: {
            phone: "",
            email: "",
            website: ""
          }
        });
        fetchHotels();
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data hotel');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (hotelId, index) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      return;
    }

    try {
      setDeleteLoading(index);
      const response = await axios.delete(`${API_BASE_URL}/api/hotels/${hotelId}/images/${index}`);
      
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
    if (!window.confirm('Apakah Anda yakin ingin menghapus hotel ini?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/hotels/${id}`);
      fetchHotels();
    } catch (err) {
      console.error('Error deleting hotel:', err);
      setError(err.response?.data?.message || 'Gagal menghapus hotel');
    }
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/hotels/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch hotel details');
      }
      
      const hotelData = response.data.data;
      setFormData({
        name: hotelData.name || "",
        description: hotelData.description || "",
        address: hotelData.location?.address || "",
        city: hotelData.location?.city || "",
        province: hotelData.location?.province || "",
        coordinates: hotelData.location?.coordinates || [0, 0],
        facilities: hotelData.facilities || [],
        images: [],
        imageUrls: hotelData.images || [],
        checkInTime: hotelData.checkInTime || "14:00",
        checkOutTime: hotelData.checkOutTime || "12:00",
        policies: hotelData.policies || [],
        status: hotelData.status || "active",
        contactInfo: {
          phone: hotelData.contactInfo?.phone || "",
          email: hotelData.contactInfo?.email || "",
          website: hotelData.contactInfo?.website || ""
        }
      });
      
      setEditingId(id);
      setIsModalOpen(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching hotel details:', err);
      setError(err.message || 'Failed to fetch hotel details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isModalOpen ? (editingId ? "Edit Hotel" : "Tambah Hotel") : "Data Hotel"}
        </h1>
        {!isModalOpen && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FFBF69] hover:bg-[#FFB042] text-black px-4 py-2 rounded-lg"
          >
            Tambah Hotel
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isModalOpen ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Nama Hotel"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama hotel"
                required
              />
              <Dropdown
                label="Status"
                name="status"
                options={statusOptions}
                selected={formData.status}
                onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                required
              />
            </div>

            <TextareaField
              label="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi hotel"
              required
            />

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Alamat"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Alamat lengkap"
                required
              />
              <InputField
                label="Kota"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Kota"
                required
              />
              <InputField
                label="Provinsi"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Provinsi"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  label="Longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.coordinates[0]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    coordinates: [parseFloat(e.target.value), prev.coordinates[1]]
                  }))}
                  placeholder="Longitude"
                  required
                />
                <InputField
                  label="Latitude" 
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.coordinates[1]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    coordinates: [prev.coordinates[0], parseFloat(e.target.value)]
                  }))}
                  placeholder="Latitude"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Nomor Telepon"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                placeholder="Nomor telepon"
                required
              />
              <InputField
                label="Email"
                name="contactInfo.email"
                type="email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <InputField
                label="Website"
                name="contactInfo.website"
                type="url"
                value={formData.contactInfo.website}
                onChange={handleChange}
                placeholder="Website (opsional)"
              />
            </div>

            {/* Check-in/Check-out Times */}
            <div className="grid md:grid-cols-2 gap-4">
              <TimePicker
                label="Waktu Check-in"
                value={formData.checkInTime}
                onChange={(value) => setFormData(prev => ({ ...prev, checkInTime: value }))}
                required
              />
              <TimePicker
                label="Waktu Check-out"
                value={formData.checkOutTime}
                onChange={(value) => setFormData(prev => ({ ...prev, checkOutTime: value }))}
                required
              />
            </div>

            {/* Facilities */}
            <MultiSelect
              label="Fasilitas"
              options={facilityOptions}
              selected={formData.facilities}
              onChange={(value) => setFormData(prev => ({ ...prev, facilities: value }))}
            />

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Hotel
              </label>
              
              {formData.imageUrls && formData.imageUrls.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Gambar Saat Ini:</p>
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
                  Pilih satu atau lebih gambar (maksimal 5 gambar)
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
                    description: "",
                    address: "",
                    city: "",
                    province: "",
                    coordinates: [0, 0],
                    facilities: [],
                    images: [],
                    imageUrls: [],
                    checkInTime: "14:00",
                    checkOutTime: "12:00",
                    policies: [],
                    status: "active",
                    contactInfo: {
                      phone: "",
                      email: "",
                      website: ""
                    }
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.map((hotel) => (
                <tr key={hotel._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.location?.city}, {hotel.location?.province}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      hotel.status === 'active' ? 'bg-green-100 text-green-800' :
                      hotel.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {hotel.status === 'active' ? 'Aktif' :
                       hotel.status === 'inactive' ? 'Tidak Aktif' :
                       'Pemeliharaan'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.contactInfo?.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(hotel._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Hotel;

