import React from "react";
import { useState } from "react";
import Sidebar from "../../../components/user/Sidebar";
import Navbar from "../../../components/user/Navbar";
import InputField from "../../../components/user/InputField";
import TextareaField from "../../../components/user/TextareaField";
import Button from "../../../components/user/button";
import ImageUpload from "../../../components/user/ImageUpload";
import MultiSelect from "../../../components/user/MultiSelect";
import Dropdown from "../../../components/user/Dropdown";
import TimePicker from "../../../components/user/TimePicker";
import Breadcrumb from "../../../components/user/Breadcrumb";

const TambahHotel = () => {
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
                { label: "Hotel", href: "/hotel" },
                { label: "Tambah Hotel" },
              ]}
            />
            {/* Judul Form */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Tambah Data Hotel
            </h2>

            <form className="space-y-6">
              {/* Informasi Umum */}
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Nama Hotel"
                  placeholder="Masukkan nama hotel"
                />
                <InputField
                  label="Jumlah Kamar"
                  placeholder="Masukkan jumlah kamar hotel"
                />
                <Dropdown
                  label="Kategori/Rating Hotel"
                  options={kategoriHotel}
                  selected={kategori}
                  onChange={setKategori}
                />
                <InputField label="Harga Per Malam" placeholder="Harga hotel" />
              </div>

              <TextareaField
                label="Deskripsi Hotel"
                placeholder="Masukkan deskripsi hotel"
              />

              {/* Lokasi */}
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Lokasi Hotel
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Alamat Lengkap"
                  placeholder="Masukkan alamat lengkap hotel"
                />
                <InputField label="Kode Pos" placeholder="Kode pos hotel" />
              </div>

              {/* Fasilitas */}
              <MultiSelect
                label="Fasilitas Hotel"
                options={fasilitasOptions}
                selected={selectedFasilitas}
                onChange={setSelectedFasilitas}
              />

              {/* Gambar Hotel */}
              <ImageUpload label="Foto Hotel" />

              {/* Waktu Check-in/Check-out */}
              <div className="grid md:grid-cols-2 gap-4">
                <TimePicker
                  label="Waktu Mulai"
                  value={waktuMulai}
                  onChange={setWaktuMulai}
                  name="waktuMulai"
                />
                <TimePicker
                  label="Waktu Selesai"
                  value={waktuSelesai}
                  onChange={setWaktuSelesai}
                  name="waktuSelesai"
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

export default TambahHotel;
