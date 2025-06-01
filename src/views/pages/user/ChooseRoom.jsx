import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfter from "../../../components/user/navbarAfter";
import Footer from "../../../components/user/footer";

const kamarList = [
  {
    id: 1,
    name: "Standard Room",
    price: 350000,
    facilities: ["1 Kasur Queen", "AC", "Wifi", "TV"],
    stock: 5,
    guest: 2,
    image:
      "https://tse2.mm.bing.net/th?id=OIP.sQUDfNrXSpibGDgH82E6hgHaE8&pid=Api&P=0&h=220",
    description:
      "Kamar standar nyaman untuk 2 orang, cocok untuk perjalanan bisnis atau liburan singkat.",
  },
  {
    id: 2,
    name: "Deluxe Room",
    price: 550000,
    facilities: ["2 Kasur Queen", "AC", "Wifi", "TV", "Breakfast"],
    stock: 3,
    guest: 4,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.PncJUX1FujH1T_hxibwDdAHaEy&pid=Api&P=0&h=220",
    description:
      "Kamar luas dengan fasilitas lengkap dan sarapan gratis, cocok untuk keluarga kecil.",
  },
  {
    id: 3,
    name: "Suite Room",
    price: 900000,
    facilities: ["2 Kasur King", "AC", "Wifi", "TV", "Breakfast", "Lounge"],
    stock: 1,
    guest: 5,
    image:
      "https://d2ile4x3f22snf.cloudfront.net/wp-content/uploads/sites/6/2016/05/17044325/Pearl-Studio-aka-Family-Room_3-Single-Bed_Blue-Logo.jpg",
    description:
      "Kamar eksklusif dengan lounge pribadi, cocok untuk tamu VIP atau honeymoon.",
  },
];

const ChooseRoom = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleLihatDetail = (room) => {
    setSelectedRoom(room);
  };

  const handlePesanSekarang = (id) => {
      navigate(`/order-hotel/${id}`);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <>
      <NavbarAfter />
      <div className="pt-16">
        <div className="min-h-screen px-4 py-6 lg:p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-warm-orange">
            Pilih Kamar Hotel
          </h1>

          <div className="space-y-6">
            {kamarList.map((kamar) => (
              <div
                key={kamar.id}
                className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                <div className="md:w-1/3 w-full aspect-video md:aspect-auto">
                  <img
                    src={kamar.image}
                    alt={kamar.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{kamar.name}</h2>
                    <p className="text-warm-orange font-bold mb-2">
                      Rp {kamar.price.toLocaleString("id-ID")}
                    </p>
                    <ul className="text-gray-600 mb-3 flex flex-wrap gap-2 text-sm">
                      {kamar.facilities.slice(0, 3).map((fasilitas, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 px-3 py-1 rounded-full border text-xs"
                        >
                          {fasilitas}
                        </li>
                      ))}
                      {kamar.facilities.length > 3 && (
                        <li className="text-xs text-gray-500 italic inline-flex items-center">
                          + {kamar.facilities.length - 3} lainnya
                        </li>
                      )}
                    </ul>
                    <div className="flex items-center gap-x-8 text-sm text-gray-500 mt-2">
                      <p>Stok Kamar Tersedia: {kamar.stock}</p>
                      <p>Kapasitas Tamu: {kamar.guest} orang</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col md:flex-row gap-3">
                    <button
                      onClick={() => handleLihatDetail(kamar)}
                      className="w-full md:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
                    >
                      Lihat Detail
                    </button>
                    <button
                      onClick={() => handlePesanSekarang(kamar.id)}
                      className="w-full md:w-1/2 bg-warm-orange hover:bg-hover-orange text-white font-semibold py-2 rounded-lg"
                    >
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Detail */}
        {selectedRoom && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-black hover:text-red-500 text-xl font-bold"
              >
                &times;
              </button>

              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedRoom.name}
              </h2>
              <p className="text-warm-orange font-semibold mb-2">
                Rp {selectedRoom.price.toLocaleString("id-ID")}
              </p>
              <p className="mb-3 text-gray-700">{selectedRoom.description}</p>
              <ul className="flex flex-wrap gap-2 text-sm mb-3">
                {selectedRoom.facilities.map((fasilitas, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full border text-xs"
                  >
                    {fasilitas}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-x-4 text-sm text-gray-500 mb-4">
                <p>Stok Kamar Tersedia: {selectedRoom.stock}</p>
                <p>Kapasitas Tamu: {selectedRoom.guest} orang</p>
              </div>

              <button
                onClick={() => handlePesanSekarang(selectedRoom.id)}
                className="w-full bg-warm-orange hover:bg-hover-orange text-white font-semibold py-2 rounded-lg"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ChooseRoom;
