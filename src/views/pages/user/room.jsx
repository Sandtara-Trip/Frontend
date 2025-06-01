import React from "react";
import Sidebar from "../../../components/user/Sidebar";
import Navbar from "../../../components/user/Navbar";
import Button from "../../../components/user/button";
import Search from "../../../components/user/search";
import Table from "../../../components/user/tabel";
import { FaEdit, FaTrash } from "react-icons/fa";

const Room = () => {
  const dataRoom = [
    { id: 1, tipe: "Room A" },
    { id: 2, tipe: "Room B" },
    { id: 3, tipe: "Room C" },
  ];

  const columns = [
    { key: "id", label: "No" },
    { key: "tipe", label: "Tipe Kamar" },
    { key: "aksi", label: "Aksi" },
  ];

  const renderRow = (kamar, index) => (
    <tr
      key={kamar.id}
      className={`border-b hover:bg-gray-50 ${
        index % 2 === 1 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{kamar.tipe}</td>
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
              <h2 className="text-xl font-semibold mb-4">Data Tipe Kamar</h2>

              {/* Tambah Data & Search */}
              <div className="flex items-center gap-2">
                <Button>Tambah Kamar</Button>
                <Search placeholder="Cari Tipe kamar...." />
              </div>
            </div>

            {/* Tabel */}
            <Table
              columns={columns}
              data={dataRoom}
              renderRow={renderRow}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
