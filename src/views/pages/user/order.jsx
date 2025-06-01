import React from "react";
import Sidebar from "../../../components/user/Sidebar";
import Navbar from "../../../components/user/Navbar";
import Button from "../../../components/user/button";
import Table from "../../../components/user/tabel";
import { FaEye, FaTrash } from "react-icons/fa";

const Order = () => {
  const dataOrder = [
    { id: 1, list: "Order A", status: "Panding" },
    { id: 2, list: "Order B", status: "Berhasil" },
    { id: 3, list: "Order C", status: "Batal" },
  ];

  const columns = [
    { key: "id", label: "No" },
    { key: "list", label: "List Order" },
    { key: "status", label: "Status" },
    { key: "aksi", label: "Aksi" },
  ];

  const renderRow = (order, index) => (
    <tr
      key={order.id}
      className={`border-b hover:bg-gray-50 ${
        index % 2 === 1 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{order.list}</td>
      <td className="p-3">{order.status}</td>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <button
            className="text-orange-400 hover:text-orange-500"
            title="View"
          >
            <FaEye />
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
              <h2 className="text-xl font-semibold mb-4">Data Order</h2>

              {/* Tambah Data & Search */}
              <div className="flex items-center gap-2">
                <Button>Download Data Order</Button>
              </div>
            </div>

            <Table
              columns={columns}
              data={dataOrder}
              renderRow={renderRow}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
