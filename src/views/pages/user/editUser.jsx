import React from "react";
import { useState } from "react";
import Sidebar from "../../../components/user/Sidebar";
import Navbar from "../../../components/user/Navbar";
import InputField from "../../../components/user/InputField";
import Button from "../../../components/user/button";
import Dropdown from "../../../components/user/Dropdown";
import Breadcrumb from "../../../components/user/Breadcrumb";

const EditUser = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const role = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const status = [
    { label: "Aktif", value: "aktif" },
    { label: "Nonaktif", value: "non" },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        {/* Inputan */}
        <div className="p-6 mt-16">
          <div className="bg-white shadow-md rounded-xl p-6">
            <Breadcrumb
              items={[
                { label: "User", href: "/user" },
                { label: "Tambah User" },
              ]}
            />
            {/* Judul Form */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Tambah Data USer
            </h2>

            <form className="space-y-6">
              {/* Informasi Umum */}
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Nama Wisata"
                  placeholder="Masukkan nama wisata"
                />
                <InputField label="Email" placeholder="contoh@gmail.com" />
                <InputField label="Nomor Telepon" placeholder="Nomor telepon" />
                <InputField label="Password" placeholder="password" />
                <Dropdown
                  label="Role"
                  options={role}
                  selected={selectedRole}
                  onChange={setSelectedRole}
                />
                <Dropdown
                  label="Status"
                  options={status}
                  selected={selectedStatus}
                  onChange={setSelectedStatus}
                />
              </div>

              {/* Tombol Submit */}
              <div className="pt-4">
                <Button className="w-full">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
