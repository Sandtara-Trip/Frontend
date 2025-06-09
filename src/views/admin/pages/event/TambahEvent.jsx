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
    images: null,
    status: "active"
  });

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
    
    // Validasi form
    if (!formData.name || !formData.detail || !formData.price || !formData.startDate || !formData.endDate || !formData.capacity) {
      setError("Semua field wajib diisi");
      return;
    }

    // Validasi price dan capacity
    const price = Number(formData.price);
    const capacity = Number(formData.capacity);
    
    if (isNaN(price) || price <= 0) {
      setError("Harga harus berupa angka positif");
      return;
    }

    if (isNaN(capacity) || capacity <= 0 || !Number.isInteger(capacity)) {
      setError("Kapasitas harus berupa angka bulat positif");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Basic fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('detail', formData.detail);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('endDate', formData.endDate);
      formDataToSend.append('capacity', formData.capacity);
      formDataToSend.append('status', formData.status);

      // Location fields as separate fields
      formDataToSend.append('location.address', formData.location.address);
      formDataToSend.append('location.city', formData.location.city);
      formDataToSend.append('location.province', formData.location.province);

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
              {/* Judul Form */}
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Tambah Data Event
              </h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

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
                <ImageUpload 
                  label="Foto Event" 
                  onChange={handleImageChange}
                  required
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahEvent; 