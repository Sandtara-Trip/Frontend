import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import ImageUpload from "../../components/ImageUpload";
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL, axiosInstance } from "../../../../config/api";

function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    price: "",
    startDate: "",
    endDate: "",
    capacity: "",
    location: {
      address: "",
      city: "",
      province: ""
    },
    images: [],
    imagesUrl: [],
    status: "active",
    deletedImages: []
  });

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        console.log('Fetching event with ID:', id);
        
        const response = await axiosInstance.get(`/admin/event/${id}`);
        console.log('Response:', response.data);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Gagal mengambil data event');
        }
        
        const eventData = response.data.data;
        if (!eventData) {
          throw new Error('Data event tidak ditemukan');
        }

        // Format dates for datetime-local input
        const formatDateForInput = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
        };

        // Transform image URLs to include the full backend URL
        const fullImageUrls = eventData.images?.map(img => 
          img.startsWith('http') ? img : `${API_BASE_URL}${img}`
        ) || [];
        
        setFormData({
          name: eventData.name || "",
          detail: eventData.detail || "",
          price: eventData.price?.toString() || "",
          startDate: formatDateForInput(eventData.startDate),
          endDate: formatDateForInput(eventData.endDate),
          capacity: eventData.capacity?.toString() || "",
          location: {
            address: eventData.location?.address || "",
            city: eventData.location?.city || "",
            province: eventData.location?.province || ""
          },
          images: [],
          imagesUrl: fullImageUrls,
          status: eventData.status || "active",
          deletedImages: []
        });
        
        setError(null);
      } catch (err) {
        console.error("Error fetching event:", err);
        if (err.response?.status === 401) {
          setError('Sesi telah berakhir. Silakan login kembali.');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || err.message || "Gagal mengambil data event");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
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
    const files = e.target.files;
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleImageDelete = (indexToDelete) => {
    setFormData(prev => ({
      ...prev,
      imagesUrl: prev.imagesUrl.filter((_, index) => index !== indexToDelete),
      deletedImages: [...prev.deletedImages, prev.imagesUrl[indexToDelete]]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.detail || !formData.price || !formData.startDate || !formData.endDate || !formData.capacity) {
      setError("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert to FormData
      const formDataToSend = new FormData();
      
      // Append non-nested fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('detail', formData.detail.trim());
      formDataToSend.append('price', Number(formData.price));
      formDataToSend.append('startDate', new Date(formData.startDate).toISOString());
      formDataToSend.append('endDate', new Date(formData.endDate).toISOString());
      formDataToSend.append('capacity', Number(formData.capacity));
      formDataToSend.append('status', formData.status);

      // Append location fields using dot notation
      formDataToSend.append('location.address', formData.location.address.trim());
      formDataToSend.append('location.city', formData.location.city.trim());
      formDataToSend.append('location.province', formData.location.province.trim());

      // Handle images
      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      // Add remaining images (not deleted)
      formDataToSend.append('remainingImages', JSON.stringify(formData.imagesUrl));

      const response = await axiosInstance.put(`/admin/event/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        navigate('/admin/event');
      } else {
        throw new Error(response.data.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      if (error.response?.status === 401) {
        setError('Sesi telah berakhir. Silakan login kembali.');
        navigate('/login');
      } else {
        setError(
          error.response?.data?.message || 
          error.message || 
          'Terjadi kesalahan saat mengupdate event. Pastikan semua data valid.'
        );
      }
    } finally {
      setLoading(false);
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
              <Breadcrumb
                items={[
                  { label: "Event", href: "/admin/event" },
                  { label: "Edit Event" },
                ]}
              />
              {/* Judul Form */}
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Edit Data Event
              </h2>

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Informasi Umum */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="Nama Event"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama event"
                      required
                    />
                    <InputField
                      label="Harga Tiket"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Harga tiket"
                      required
                    />
                    <InputField
                      label="Tanggal Mulai"
                      name="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Tanggal Selesai"
                      name="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Kapasitas"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="Jumlah kapasitas"
                      required
                    />
                  </div>

                  <TextareaField
                    label="Deskripsi Event"
                    name="detail"
                    value={formData.detail}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi event"
                    required
                  />

                  {/* Lokasi */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField 
                      label="Alamat Lengkap" 
                      name="location.address"
                      value={formData.location.address}
                      onChange={handleChange}
                      placeholder="Alamat lengkap event" 
                      required
                    />
                    <InputField 
                      label="Kota" 
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleChange}
                      placeholder="Kota" 
                      required
                    />
                    <InputField 
                      label="Provinsi" 
                      name="location.province"
                      value={formData.location.province}
                      onChange={handleChange}
                      placeholder="Provinsi" 
                      required
                    />
                  </div>

                  {/* Gambar Event */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto Event
                    </label>
                    
                    {/* Preview gambar yang sudah ada */}
                    {formData.imagesUrl.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {formData.imagesUrl.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              src={url}
                              alt={`Event preview ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleImageDelete(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Input file untuk gambar baru */}
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

                  {/* Tombol Submit */}
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => navigate('/admin/event')}
                    >
                      Batal
                    </Button>
                    <Button 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Memproses..." : "Submit"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEvent; 