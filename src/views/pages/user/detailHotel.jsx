import React, { useState } from "react";
import NavbarAfter from "../../../components/user/navbarAfter";
import NavbarBefore from "../../../components/user/NavbarBefore";
import { IoIosPin, IoMdPricetags } from "react-icons/io";
import DetailImageSlider from "../../../components/user/detailImageSlider";
import TabContent from "../../../components/user/TabContent";
import OrderTicket from "../../../components/user/orderTicket";
import Footer from "../../../components/user/footer";
import { contentData } from "../../templates/contentDataHotel";
import { imagesDetailHotel } from "../../templates/imagesDetailHotel";

const DetailHotel = () => {
  const [isLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Deskripsi");

  const handleOrder = () => {
    alert("Fitur pemesanan akan segera hadir!");
  };

  // Ambil ticket dari contentData
  const ticket = contentData.Ticket[0];

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      <div className="bg-base max-w-5xl mx-auto p-4 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{contentData.Nama}</h2>
            <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
              <span className="flex items-center gap-2">
                <IoIosPin className="text-xl text-warm-orange" />
                {contentData.Lokasi}
              </span>
              <span className="flex items-center gap-2">
                <IoMdPricetags className="text-xl text-warm-orange" />
                {contentData.Kategori}
              </span>
            </div>
          </div>

          <DetailImageSlider images={imagesDetailHotel} />

          <div className="flex gap-4 border-b text-lg font-medium">
            {["Deskripsi", "Fasilitas", "Lokasi", "Review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? "text-warm-orange border-b-2 border-hover-orange"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <TabContent activeTab={activeTab} contentData={contentData} />
        </div>

        {/* Pakai ticket yang sudah diambil */}
        <OrderTicket
          name={ticket.name}
          price={ticket.price}
          badge={ticket.badge}
          rating={ticket.rating}
          reviewCount={ticket.reviewCount}
          onOrder={handleOrder}
          orderLabel="Lihat Kamar"
        />
      </div>

      <Footer />
    </>
  );
};

export default DetailHotel;
