import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from '../../../../utils/sweetalert';
import { axiosInstance } from "../../../../config/api";

const TambahUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomorTelepon: "",
    password: "",
    role: "",
    status: ""
  });

  const role = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const status = [
    { label: "Aktif", value: "active" },
    { label: "Nonaktif", value: "inactive" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.nama || !formData.email || !formData.password || !formData.role || !formData.status) {
      setError("Semua field harus diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const dataToSend = {
        name: formData.nama,
        email: formData.email,
        phoneNumber: formData.nomorTelepon || undefined,
        password: formData.password,
        role: formData.role,
        status: formData.status
      };

      // Remove undefined fields
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === undefined) {
          delete dataToSend[key];
        }
      });

      const response = await axiosInstance.post('/api/users', dataToSend);
      
      if (response.data.success) {
        showSuccess("User berhasil ditambahkan");
        navigate("/admin/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan user");
      console.error("Error adding user:", err);
      showError("Gagal menambahkan user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span onClick={() => navigate("/admin/user")} className="cursor-pointer hover:text-[#FFBF69]">
            User
          </span>
          <span>/</span>
          <span className="text-[#FFBF69]">Tambah User</span>
        </div>

        <h2 className="text-xl font-semibold mb-6">Tambah User</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <input
              type="text"
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
              required
            >
              <option value="">Pilih Role</option>
              {role.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
              required
            >
              <option value="">Pilih Status</option>
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFBF69] hover:bg-[#FFB042] text-black rounded-lg disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/user")}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahUser; 