import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import Search from "../../components/search";
import Table from "../../components/tabel";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import MultiSelect from "../../components/MultiSelect";
import Dropdown from "../../components/Dropdown";
import TimePicker from "../../components/TimePicker";

const Wisata = () => {
  const navigate = useNavigate();
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
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

  // Fetch wisata
  const fetchWisata = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/wisata`);
      if (response.data.success) {
        setWisata(response.data.data || []);
      } else {
        setError("Gagal mengambil data wisata");
      }
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data wisata");
      console.error("Error fetching wisata:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete wisata
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus wisata ini?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/wisata/${id}`);
        setWisata(wisata.filter(item => item._id !== id));
        alert("Wisata berhasil dihapus");
      } catch (err) {
        setError("Gagal menghapus wisata");
        console.error("Error deleting wisata:", err);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/wisata/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch wisata details');
      }
      
      const wisataData = response.data.data;
      setFormData({
        nama: wisataData.nama || "",
        kategori: wisataData.kategori || "",
        harga: wisataData.harga?.toString() || "",
        hariOperasional: wisataData.hariOperasional || [],
        alamat: wisataData.alamat || "",
        kodePos: wisataData.kodePos || "",
        deskripsi: wisataData.deskripsi || "",
        fasilitas: wisataData.fasilitas || [],
        gambar: [],
        gambarUrl: wisataData.gambar || [],
        jamBuka: wisataData.jamBuka || "",
        jamTutup: wisataData.jamTutup || "",
        status: wisataData.status || "active",
        latitude: wisataData.latitude || "",
        longitude: wisataData.longitude || ""
      });
      
      setEditingId(id);
      setIsModalOpen(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching wisata details:', err);
      setError(err.message || 'Failed to fetch wisata details');
    } finally {
      setLoading(false);
    }
  };

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
      formDataToSend.append('latitude', formData.latitude || '');
      formDataToSend.append('longitude', formData.longitude || '');

      // Handle array fields
      formDataToSend.append('hariOperasional', JSON.stringify(formData.hariOperasional));
      formDataToSend.append('fasilitas', JSON.stringify(formData.fasilitas));

      // Handle multiple file uploads
      if (formData.gambar && formData.gambar.length > 0) {
        Array.from(formData.gambar).forEach((file) => {
          formDataToSend.append('gambar', file);
        });
      }

      let response;
      if (editingId) {
        response = await axios.put(`${API_BASE_URL}/api/wisata/${editingId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/api/wisata`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.success) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
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
        fetchWisata();
      }
    } catch (error) {
      console.error('Error saving wisata:', error);
      setError(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data wisata');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (index) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      return;
    }

    try {
      setDeleteLoading(index);
      const response = await axios.delete(`${API_BASE_URL}/api/wisata/${editingId}/foto/${index}`);
      
      if (response.data.success) {
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

  useEffect(() => {
    fetchWisata();
  }, []);

  const columns = [
    { key: "id", label: "No" },
    { key: "nama", label: "Nama Wisata" },
    { key: "alamat", label: "Alamat" },
    { key: "deskripsi", label: "Deskripsi" },
    { key: "harga", label: "Harga" },
    { key: "koordinat", label: "Koordinat" },
    { key: "status", label: "Status" },
    { key: "aksi", label: "Aksi" },
  ];

  const filteredWisata = Array.isArray(wisata) ? wisata.filter(item =>
    item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.alamat?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Judul tabel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold mb-4">
            {isModalOpen ? (editingId ? "Edit Wisata" : "Tambah Wisata") : "Data Wisata"}
          </h2>

          {/* Tambah Data & Search */}
          {!isModalOpen && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsModalOpen(true)}>
                Tambah Wisata
              </Button>
              <Search 
                placeholder="Cari Wisata..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isModalOpen ? (
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
              
              {/* Preview existing images */}
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
                          onClick={() => handleDeleteImage(index)}
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
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                  setFormData({
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
                }}
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
                ) : editingId ? "Simpan Perubahan" : "Tambah Wisata"}
              </Button>
            </div>
          </form>
        ) : (
          /* Loading State */
          loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            /* Tabel */
            <Table
              columns={columns}
              data={filteredWisata}
              renderRow={(item, index) => (
                <tr
                  key={item._id}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{item.alamat}</td>
                  <td className="p-3">{item.deskripsi?.substring(0, 50)}...</td>
                  <td className="p-3">Rp {item.harga?.toLocaleString() || '0'}</td>
                  <td className="p-3">
                    {item.latitude}, {item.longitude}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-[#FFBF69] hover:text-[#FFB042]"
                        title="Edit"
                        onClick={() => handleEdit(item._id)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700" 
                        title="Hapus"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Wisata;
