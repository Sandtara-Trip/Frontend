import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../../config/api";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/users/${id}`);
        const userData = response.data.data;
        
        setFormData({
          nama: userData.name || "",
          email: userData.email || "",
          nomorTelepon: userData.phoneNumber || "",
          password: "", // Password kosong karena tidak ingin menampilkan password
          role: userData.role || "",
          status: userData.status || ""
        });
        
        setError(null);
      } catch (err) {
        setError("Gagal mengambil data user");
        console.error("Error fetching user:", err);
        toast.error("Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.email) {
      setError("Nama dan email harus diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const dataToSend = {
        name: formData.nama,
        email: formData.email,
        phoneNumber: formData.nomorTelepon || undefined,
        password: formData.password || undefined,
        role: formData.role || undefined,
        status: formData.status || undefined
      };

      // Remove undefined fields
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === undefined) {
          delete dataToSend[key];
        }
      });

      const response = await axiosInstance.put(`/api/users/${id}`, dataToSend);
      
      if (response.data.success) {
        toast.success("User berhasil diperbarui");
        navigate("/admin/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui user");
      console.error("Error updating user:", err);
      toast.error("Gagal memperbarui user");
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
          <span className="text-[#FFBF69]">Edit User</span>
        </div>

        <h2 className="text-xl font-semibold mb-6">Edit User</h2>

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
              Password (Kosongkan jika tidak ingin mengubah password)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBF69]"
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

export default EditUser; 