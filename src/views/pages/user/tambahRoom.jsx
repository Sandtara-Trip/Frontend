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
import Breadcrumb from "../../../components/user/Breadcrumb";

const TambahRoom = () => {
  const [selectedFasilitasKamar, setSelectedFasilitasKamar] = useState([]);
  const [tipe, setTipeRoom] = useState("");
  const [jenisTempatTidur, setJenisTempatTidur] = useState("");

  const fasilitasKamar = [
    { label: "AC", value: "ac" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "Kolam Renang", value: "pool" },
    { label: "Kulkas", value: "kulkas" },
    { label: "Meja kerja", value: "meja" },
    { label: "Brankas", value: "brankas" },
    { label: "Bathtub", value: "bathtub" },
    { label: "Balkon", value: "balkon" },
  ];

  const tipeRoom = [
    { label: "Standard", value: "standard" },
    { label: "Deluxe", value: "deluxe" },
    { label: "Suite", value: "suite" },
    { label: "Family Room", value: "family" },
    { label: "Superior", value: "superior" },
  ];

  const jenisBad = [
    { label: "Single", value: "single" },
    { label: "Twin", value: "twin" },
    { label: "Queen", value: "Queenq" },
    { label: "King", value: "king" },
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
                { label: "Room", href: "/room" },
                { label: "Tambah Data Room" },
              ]}
            />
            {/* Judul Form */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Tambah Data Kamar
            </h2>

            <form className="space-y-6">
              {/* Informasi Umum */}
              <div className="grid md:grid-cols-2 gap-4">
                <Dropdown
                  label="Tipe Kamar"
                  options={tipeRoom}
                  selected={tipe}
                  onChange={setTipeRoom}
                />
                <InputField
                  label="Jumlah Kamar Tersedia"
                  placeholder="Masukkan jumlah kamar tipe ini yang tersedia"
                />
                <InputField label="Luas Kamar" placeholder="Luas Kamar m²" />
                <InputField
                  label="Jumlah Tamu Maksimal"
                  placeholder="Jumlah tamu maksimal"
                />
                <InputField
                  label="Jumlah Tempat Tidur"
                  placeholder="Jumlah tempat tidur"
                />
                <Dropdown
                  label="Jenis Tempat Tidur"
                  options={jenisBad}
                  selected={jenisTempatTidur}
                  onChange={setJenisTempatTidur}
                />
              </div>

              <TextareaField
                label="Deskripsi Tipe Kamar"
                placeholder="Masukkan deskripsi singkat tipe kamar"
              />

              {/* Fasilitas */}
              <MultiSelect
                label="Fasilitas Hotel"
                options={fasilitasKamar}
                selected={selectedFasilitasKamar}
                onChange={setSelectedFasilitasKamar}
              />

              {/* Gambar Hotel */}
              <ImageUpload label="Foto Hotel" />

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

export default TambahRoom;
