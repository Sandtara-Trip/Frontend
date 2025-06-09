import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import ImageUpload from "../../components/ImageUpload";
import MultiSelect from "../../components/MultiSelect";
import Dropdown from "../../components/Dropdown";
import TimePicker from "../../components/TimePicker";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";

const TambahWisata = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    hariOperasional: [],
    alamat: "",
    kodePos: "",
    deskripsi: "",
    fasilitas: [],
    gambar: null,
    jamBuka: "",
    jamTutup: "",
    status: "active",
    latitude: "",
    longitude: ""
  });

  const fasilitasWisata = [
    { label: "Parkir", value: "parkir" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "Toilet", value: "toilet" },
    { label: "Musholla", value: "musholla" },
  ];

  const hariOperasional = [
    { label: "Senin", value: "senin" },
    { label: "Selasa", value: "selasa" },
    { label: "Rabu", value: "rabu" },
    { label: "Kamis", value: "kamis" },
    { label: "Jumat", value: "jumat" },
    { label: "Sabtu", value: "sabtu" },
    { label: "Minggu", value: "minggu" },
  ];

  const kategoriWisata = [
    { label: "Alam", value: "alam" },
    { label: "Budaya", value: "budaya" },
    { label: "Religi", value: "religi" },
    { label: "Kuliner", value: "kuliner" },
    { label: "Hiburan", value: "hiburan" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      gambar: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.nama || !formData.kategori || !formData.harga || !formData.alamat || !formData.deskripsi || !formData.latitude || !formData.longitude) {
      setError("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Tambahkan field satu per satu
      formDataToSend.append('nama', formData.nama);
      formDataToSend.append('kategori', formData.kategori);
      formDataToSend.append('harga', formData.harga.toString());
      formDataToSend.append('alamat', formData.alamat);
      formDataToSend.append('kodePos', formData.kodePos || '');
      formDataToSend.append('deskripsi', formData.deskripsi);
      formDataToSend.append('jamBuka', formData.jamBuka || '');
      formDataToSend.append('jamTutup', formData.jamTutup || '');
      formDataToSend.append('status', formData.status || 'active');
      formDataToSend.append('hariOperasional', JSON.stringify(formData.hariOperasional));
      formDataToSend.append('fasilitas', JSON.stringify(formData.fasilitas));

      // Kirim koordinat dalam format yang sesuai
      const coordinates = [parseFloat(formData.longitude), parseFloat(formData.latitude)];
      formDataToSend.append('location[type]', 'Point');
      formDataToSend.append('location[coordinates]', JSON.stringify(coordinates));

      // Handle multiple file uploads
      if (formData.gambar && formData.gambar.length > 0) {
        Array.from(formData.gambar).forEach((file) => {
          formDataToSend.append('gambar', file);
        });
      }

      console.log('Sending form data:', Object.fromEntries(formDataToSend));

      const response = await axios.post(`${API_BASE_URL}/api/wisata`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      
      if (response.data.success) {
        navigate('/wisata');
      }
    } catch (error) {
      console.error('Error adding wisata:', error);
      console.log('Response data:', error.response?.data);
      console.log('Response status:', error.response?.status);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat menambahkan wisata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Wisata</h1>
          <p className="text-sm text-gray-600 mt-1">Tambahkan wisata baru ke dalam sistem</p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Nama Wisata"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama wisata"
                required
                className="w-full"
              />
              <Dropdown
                label="Kategori Wisata"
                name="kategori"
                options={kategoriWisata}
                selected={formData.kategori}
                onChange={(value) => setFormData(prev => ({ ...prev, kategori: value }))}
                required
              />
              <InputField
                label="Harga Tiket"
                name="harga"
                type="number"
                value={formData.harga}
                onChange={handleChange}
                placeholder="Masukkan harga tiket"
                required
                className="w-full"
              />
              <MultiSelect
                label="Hari Operasional"
                options={hariOperasional}
                selected={formData.hariOperasional}
                onChange={(value) => setFormData(prev => ({ ...prev, hariOperasional: value }))}
                required
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Deskripsi Wisata</h2>
            <TextareaField
              label="Deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Deskripsikan wisata secara detail"
              required
              className="w-full h-32"
            />
          </div>

          {/* Location Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Lokasi Wisata</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Alamat Lengkap"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                required
                className="w-full"
              />
              <InputField 
                label="Kode Pos" 
                name="kodePos"
                value={formData.kodePos}
                onChange={handleChange}
                placeholder="Masukkan kode pos"
                className="w-full"
              />
              <InputField
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Masukkan latitude (-90 sampai 90)"
                required
                min="-90"
                max="90"
                step="any"
                className="w-full"
              />
              <InputField
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Masukkan longitude (-180 sampai 180)"
                required
                min="-180"
                max="180"
                step="any"
                className="w-full"
              />
            </div>
          </div>

          {/* Facilities Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Fasilitas Wisata</h2>
            <MultiSelect
              label="Pilih Fasilitas"
              options={fasilitasWisata}
              selected={formData.fasilitas}
              onChange={(value) => setFormData(prev => ({ ...prev, fasilitas: value }))}
            />
          </div>

          {/* Images Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Foto Wisata</h2>
            <ImageUpload 
              label="Upload Foto" 
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Operating Hours Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Waktu Operasional</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <TimePicker
                label="Jam Buka"
                value={formData.jamBuka}
                onChange={(value) => setFormData(prev => ({ ...prev, jamBuka: value }))}
                name="jamBuka"
                required
              />
              <TimePicker
                label="Jam Tutup"
                value={formData.jamTutup}
                onChange={(value) => setFormData(prev => ({ ...prev, jamTutup: value }))}
                name="jamTutup"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/wisata")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFBF69]"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#FFBF69] text-white rounded-lg hover:bg-[#FFB042] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFBF69]"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>Menyimpan...</span>
                </div>
              ) : "Tambah Wisata"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahWisata;
