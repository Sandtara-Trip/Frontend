import React from "react";
import Sidebar from "../../../components/user/Sidebar";
import Navbar from "../../../components/user/Navbar";
import Button from "../../../components/user/button";
import Search from "../../../components/user/search";
import Table from "../../../components/user/tabel";
import { FaEdit, FaTrash } from "react-icons/fa";

const User = () => {
  const dataUser = [
    { id: 1, nama: "User A", email: "contoh@gmail.com" },
    { id: 2, nama: "User B", email: "contoh@gmail.com" },
    { id: 3, nama: "User C", email: "contoh@gmail.com" },
  ];

  const columns = [
    { key: "id", label: "No" },
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "aksi", label: "Aksi" },
  ];

  const renderRow = (user, index) => (
    <tr
      key={user.id}
      className={`border-b hover:bg-gray-50 ${
        index % 2 === 1 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{user.nama}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <button className="text-green-500 hover:text-green-700" title="Edit">
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700" title="Hapus">
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        {/* Tabel */}
        <div className="p-6 mt-16">
          <div className="bg-white shadow-md rounded-xl p-6">
            {/* Judul tabel */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
              <h2 className="text-xl font-semibold mb-4">Data User</h2>

              {/* Tambah Data & Search */}
              <div className="flex items-center gap-2">
                <Button>Tambah User</Button>
                <Search placeholder="Cari User..." />
              </div>
            </div>

            <Table
              columns={columns}
              data={dataUser}
              renderRow={renderRow}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
