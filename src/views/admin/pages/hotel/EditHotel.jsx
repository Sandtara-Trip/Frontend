import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import Button from "../../components/button";
import ImageUpload from "../../components/ImageUpload";
import MultiSelect from "../../components/MultiSelect";
import Dropdown from "../../components/Dropdown";
import TimePicker from "../../components/TimePicker";
import { API_BASE_URL } from "../../../../config/api";
import axios from "axios";

const EditHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    jumlahKamar: "",
    kategori: "",
    harga: "",
    deskripsi: "",
    alamat: "",
    kodePos: "",
    coordinates: [0, 0],
    fasilitas: [],
    gambar: null,
    waktuCheckIn: "",
    waktuCheckOut: ""
  });

  const [selectedFasilitas, setSelectedFasilitas] = useState([]);
  const [kategori, setKategori] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");

  const fasilitasOptions = [
    { label: "AC", value: "ac" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "Kolam Renang", value: "pool" },
    { label: "Restoran", value: "resto" },
  ];

  const kategoriHotel = [
    { label: "Bintang 2", value: "2" },
    { label: "Bintang 3", value: "3" },
    { label: "Bintang 4", value: "4" },
    { label: "Bintang 5", value: "5" },
  ];

  // Fetch hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/hotels/${id}`);
        const hotelData = response.data.data;
        
        setFormData({
          nama: hotelData.nama,
          jumlahKamar: hotelData.jumlahKamar,
          kategori: hotelData.kategori,
          harga: hotelData.harga,
          deskripsi: hotelData.deskripsi,
          alamat: hotelData.alamat,
          kodePos: hotelData.kodePos,
          coordinates: hotelData.coordinates,
          fasilitas: hotelData.fasilitas,
          waktuCheckIn: hotelData.waktuCheckIn,
          waktuCheckOut: hotelData.waktuCheckOut
        });
        
        setSelectedFasilitas(hotelData.fasilitas);
        setKategori(hotelData.kategori);
        setWaktuMulai(hotelData.waktuCheckIn);
        setWaktuSelesai(hotelData.waktuCheckOut);
      } catch (err) {
        setError("Gagal mengambil data hotel");
        console.error("Error fetching hotel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file) => {
    setFormData(prev => ({
      ...prev,
      gambar: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validasi form
      if (!formData.nama || !formData.alamat || !formData.kategori) {
        throw new Error("Mohon lengkapi semua field yang wajib diisi");
      }

      // Buat FormData untuk mengirim file
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'fasilitas') {
          submitData.append(key, JSON.stringify(selectedFasilitas));
        } else if (formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      // Kirim data ke API
      const response = await axios.put(`${API_BASE_URL}/api/hotels/${id}`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert("Hotel berhasil diperbarui");
        navigate("/hotel");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat memperbarui hotel");
      console.error("Error updating hotel:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Hotel</h1>
          <p className="text-sm text-gray-600 mt-1">Ubah informasi hotel yang sudah ada</p>
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
                  label="Nama Hotel"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama hotel"
                  required
                  className="w-full"
                />
                <InputField
                  label="Jumlah Kamar"
                  name="jumlahKamar"
                  type="number"
                  value={formData.jumlahKamar}
                  onChange={handleChange}
                  placeholder="Masukkan jumlah kamar"
                  required
                  className="w-full"
                />
                <Dropdown
                  label="Kategori/Rating Hotel"
                  name="kategori"
                  options={kategoriHotel}
                  selected={formData.kategori}
                  onChange={(value) => setFormData(prev => ({ ...prev, kategori: value }))}
                  required
                />
                <InputField 
                  label="Harga Per Malam" 
                  name="harga"
                  type="number"
                  value={formData.harga}
                  onChange={handleChange}
                  placeholder="Masukkan harga per malam"
                  required
                  className="w-full"
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Deskripsi Hotel</h2>
              <TextareaField
                label="Deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsikan hotel Anda secara detail"
                required
                className="w-full h-32"
              />
            </div>

            {/* Location Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Lokasi Hotel</h2>
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
                  required
                  className="w-full"
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
                    className="w-full"
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
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Facilities Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Fasilitas Hotel</h2>
              <MultiSelect
                label="Pilih Fasilitas"
                options={fasilitasOptions}
                selected={selectedFasilitas}
                onChange={setSelectedFasilitas}
              />
            </div>

            {/* Images Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Foto Hotel</h2>
              <ImageUpload 
                label="Upload Foto" 
                onChange={handleImageChange}
              />
            </div>

            {/* Check-in/Check-out Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Waktu Check-in & Check-out</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <TimePicker
                  label="Waktu Check-in"
                  value={formData.waktuCheckIn}
                  onChange={(value) => setFormData(prev => ({ ...prev, waktuCheckIn: value }))}
                  name="waktuCheckIn"
                  required
                />
                <TimePicker
                  label="Waktu Check-out"
                  value={formData.waktuCheckOut}
                  onChange={(value) => setFormData(prev => ({ ...prev, waktuCheckOut: value }))}
                  name="waktuCheckOut"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/hotel")}
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
  );
};

export default EditHotel;
