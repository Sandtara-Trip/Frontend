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

const EditWisata = () => {
  const [selectedFasilitasWisata, setSelectedFasilitasWisata] = useState([]);
  const [selectedHariOperasional, setSelectedHariOperasional] = useState([]);
  const [wisata, setwisata] = useState("");
  const [jamBuka, setJamBuka] = useState("");
  const [jamTutup, setJamTutup] = useState("");

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
                { label: "Wisata", href: "/wisata" },
                { label: "Tambah Wisata" },
              ]}
            />
            {/* Judul Form */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Tambah Data Wisata
            </h2>

            <form className="space-y-6">
              {/* Informasi Umum */}
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Nama Wisata"
                  placeholder="Masukkan nama wisata"
                />
                <Dropdown
                  label="Kategori Wisata"
                  options={kategoriWisata}
                  selected={wisata}
                  onChange={setwisata}
                />
                <InputField
                  label="Harga Tiket Masuk"
                  placeholder="Harga tiket masuk"
                />
                <MultiSelect
                  label="Hari Operasional"
                  options={hariOperasional}
                  selected={selectedHariOperasional}
                  onChange={setSelectedHariOperasional}
                />
                <InputField label="Alamat Lengkap" placeholder="Alamat" />
                <InputField label="Kode Pos" placeholder="Kode pos hotel" />
              </div>

              <TextareaField
                label="Deskripsi Wisata"
                placeholder="Masukkan deskripsi wisata"
              />

              {/* Fasilitas */}
              <MultiSelect
                label="Fasilitas Wisata"
                options={fasilitasWisata}
                selected={selectedFasilitasWisata}
                onChange={setSelectedFasilitasWisata}
              />

              {/* Gambar Hotel */}
              <ImageUpload label="Foto Hotel" />

              {/* Waktu Check-in/Check-out */}
              <div className="grid md:grid-cols-2 gap-4">
                <TimePicker
                  label="Jam Buka"
                  value={jamBuka}
                  onChange={setJamBuka}
                  name="jambuka"
                />
                <TimePicker
                  label="Jam Tutup"
                  value={jamTutup}
                  onChange={setJamTutup}
                  name="jamtutup"
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

export default EditWisata;
