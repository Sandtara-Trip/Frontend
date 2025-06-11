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
    description: "",
    status: "active",
    images: [],
    imagesUrl: [],
    deletedImages: []
  });

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/admin/event/${id}`);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Gagal mengambil data event');
        }
        
        const eventData = response.data.data;
        if (!eventData) {
          throw new Error('Data event tidak ditemukan');
        }

        // Transform image URLs to include the full backend URL
        const fullImageUrls = eventData.images?.map(img => 
          img.startsWith('http') ? img : `${API_BASE_URL}${img}`
        ) || [];
        
        setFormData({
          name: eventData.name || "",
          description: eventData.description || "",
          status: eventData.status || "active",
          images: [],
          imagesUrl: fullImageUrls,
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    if (!formData.name || !formData.description) {
      setError("Nama dan deskripsi wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Basic fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('status', formData.status);

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
                  <InputField
                    label="Nama Event"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama event"
                    required
                  />

                  <TextareaField
                    label="Deskripsi Event"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi event"
                    required
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

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

                  {/* Input untuk gambar baru */}
                  <ImageUpload 
                    label="Foto Event" 
                    onChange={handleImageChange}
                  />

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