import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
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

const EditWisata = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    hariOperasional: [],
    alamat: "",
    kodePos: "",
    deskripsi: "",
    fasilitas: [],
    gambar: [],
    gambarUrl: [],
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

  // Fetch wisata data
  useEffect(() => {
    const fetchWisata = async () => {
      try {
        setLoading(true);
        console.log('Fetching wisata with ID:', id);
        
        const response = await axios.get(`${API_BASE_URL}/api/wisata/${id}`);
        console.log('Response:', response.data);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch wisata details');
        }
        
        const wisataData = response.data.data;
        if (!wisataData) {
          throw new Error('Data wisata tidak ditemukan');
        }
        
        setFormData({
          nama: wisataData.nama || "",
          kategori: wisataData.kategori || "",
          harga: wisataData.harga?.toString() || "",
          hariOperasional: Array.isArray(wisataData.hariOperasional) ? wisataData.hariOperasional : [],
          alamat: wisataData.alamat || "",
          kodePos: wisataData.kodePos || "",
          deskripsi: wisataData.deskripsi || "",
          fasilitas: Array.isArray(wisataData.fasilitas) ? wisataData.fasilitas : [],
          gambar: [],
          gambarUrl: Array.isArray(wisataData.gambar) ? wisataData.gambar : [],
          jamBuka: wisataData.jamBuka || "",
          jamTutup: wisataData.jamTutup || "",
          status: wisataData.status || "active",
          latitude: wisataData.location?.coordinates[1]?.toString() || "",
          longitude: wisataData.location?.coordinates[0]?.toString() || ""
        });
        
        setError(null);
      } catch (err) {
        console.error("Error fetching wisata:", err);
        setError(err.response?.data?.message || err.message || "Gagal mengambil data wisata");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWisata();
    }
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
    
    // Validasi jumlah file
    if (files.length > 5) {
      setError("Maksimal 5 gambar yang dapat diupload");
      return;
    }

    // Validasi tipe dan ukuran file
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
        gambar: validFiles
    }));
    }
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (formData.previewUrls) {
        formData.previewUrls.forEach(url => URL.revokeObjectURL(url));
      }
    };
  }, [formData.previewUrls]);

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

      const response = await axios.put(`${API_BASE_URL}/api/wisata/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      
      if (response.data.success) {
        navigate('/wisata');
      }
    } catch (error) {
      console.error('Error updating wisata:', error);
      console.log('Response data:', error.response?.data);
      console.log('Response status:', error.response?.status);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat mengupdate wisata');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (index) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      return;
    }

    try {
      setDeleteLoading(index);
      const response = await axios.delete(`${API_BASE_URL}/api/wisata/${id}/foto/${index}`);
      
      if (response.data.success) {
        // Update state dengan data terbaru
        setFormData(prev => ({
          ...prev,
          gambarUrl: response.data.data.gambar
        }));
        alert('Foto berhasil dihapus');
      } else {
        throw new Error(response.data.message || 'Gagal menghapus foto');
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
      setError(err.response?.data?.message || err.message || 'Gagal menghapus foto');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Wisata</h1>
              <p className="text-sm text-gray-600 mt-1">Ubah informasi wisata yang sudah ada</p>
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

            {loading && !formData.nama ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFBF69]"></div>
              </div>
            ) : (
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
                  
                  {/* Preview gambar yang sudah ada */}
                  {formData.gambarUrl && formData.gambarUrl.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Gambar Saat Ini:</p>
                      <div className="grid grid-cols-4 gap-4">
                        {formData.gambarUrl.map((url, index) => (
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
                              onClick={() => handleDeletePhoto(index)}
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
                    ) : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWisata;
