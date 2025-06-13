import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import ImageUpload from "../../components/ImageUpload";
import Breadcrumb from "../../components/Breadcrumb";
import { API_BASE_URL, axiosInstance } from "../../../../config/api";

const TambahEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    images: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 5) {
      setError("Maksimal 5 gambar yang dapat diunggah");
      e.target.value = null;
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description) {
      setError("Nama dan deskripsi wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Basic fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.category) {
        formDataToSend.append('category', formData.category); // Only append if category is provided
      }

      // Images
      if (formData.images) {
        Array.from(formData.images).forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      const response = await axiosInstance.post('/admin/event', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        navigate('/admin/event');
      } else {
        throw new Error(response.data.message || 'Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response?.status === 401) {
        setError('Sesi telah berakhir. Silakan login kembali.');
        navigate('/login');
      } else {
        setError(error.message || 'Terjadi kesalahan saat menambahkan event');
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
                  { label: "Tambah Event" },
                ]}
              />
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Tambah Data Event
              </h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

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
                  <label className="block text-sm font-medium text-gray-700">Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Pilih Kategori (opsional)</option>
                    <option value="kuliner khas denpasar">Kuliner Khas Denpasar</option>
                    <option value="toko oleh-oleh">Toko Oleh-oleh</option>
                  </select>
                </div>

                <ImageUpload 
                  label="Foto Event" 
                  onChange={handleImageChange}
                />

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahEvent;