import { useState } from "react";
import PaymentCard from "../../../components/user/payment/paymentCard";
import InputTanggal from "../../../components/user/payment/InputTanggal";
import MetodePembayaranSelect from "../../../components/user/payment/MetodePembayaranSelect";
import CatatanTextarea from "../../../components/user/payment/CatatanTextarea";
import PembayaranDetail from "../../../components/user/payment/PembayaranDetail";
import Footer from "../../../components/user/footer";
import NavbarAfter from "../../../components/user/navbarAfter";

const hotelSample = {
  name: "Hotel Puri Santrian",
  price: 150000,
  image:
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", // contoh url
  description: "Hotel nyaman dekat pantai dengan fasilitas lengkap.",
  roomType: "Deluxe Room",
};

const OrderHotel = () => {
  const [jumlahOrder, setJumlahOrder] = useState(1);
  const [tanggalCheckIn, setTanggalCheckIn] = useState("");
  const [tanggalCheckOut, setTanggalCheckOut] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("");
  const [catatan, setCatatan] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

const handleIncrement = () => {
  setJumlahOrder(jumlahOrder + 1);
};

const handleDecrement = () => {
  if (jumlahOrder > 1) setJumlahOrder(jumlahOrder - 1);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!tanggalCheckIn)
      newErrors.tanggalCheckIn = "Tanggal check-in wajib diisi";
    if (!tanggalCheckOut)
      newErrors.tanggalCheckOut = "Tanggal check-out wajib diisi";

    if (tanggalCheckIn && tanggalCheckOut) {
      const checkInDate = new Date(tanggalCheckIn);
      const checkOutDate = new Date(tanggalCheckOut);
      if (checkInDate >= checkOutDate) {
        newErrors.tanggalCheckOut = "Tanggal check-out harus setelah check-in";
      }
    }

    if (!metodeBayar) newErrors.metodeBayar = "Metode pembayaran wajib dipilih";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <NavbarAfter />

      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Form kiri */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 space-y-4 pt-16"
          >
            <h1 className="text-2xl font-bold mb-4">Pemesanan Ticket Hotel</h1>

            <PaymentCard
              item={hotelSample}
              quantity={jumlahOrder}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              labelQuantity="Jumlah Kamar"
            />

            <InputTanggal
              label="Check-in"
              value={tanggalCheckIn}
              onChange={(e) => {
                setTanggalCheckIn(e.target.value);
                if (errors.tanggalCheckIn)
                  setErrors((prev) => ({ ...prev, tanggalCheckIn: "" }));
              }}
              error={errors.tanggalCheckIn}
            />

            <InputTanggal
              label="Check-out"
              value={tanggalCheckOut}
              onChange={(e) => {
                setTanggalCheckOut(e.target.value);
                if (errors.tanggalCheckOut)
                  setErrors((prev) => ({ ...prev, tanggalCheckOut: "" }));
              }}
              error={errors.tanggalCheckOut}
            />

            <MetodePembayaranSelect
              value={metodeBayar}
              onChange={(e) => {
                setMetodeBayar(e.target.value);
                if (errors.metodeBayar)
                  setErrors((prev) => ({ ...prev, metodeBayar: "" }));
              }}
              error={errors.metodeBayar}
            />

            <CatatanTextarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary w-full bg-orange-500 hover:bg-orange-600 border-none text-white"
            >
              Lanjutkan Pembayaran
            </button>
          </form>

          {/* Kolom kanan */}
          {formSubmitted && (
            <div className="w-full lg:w-1/3">
              <PembayaranDetail
                metodeBayar={metodeBayar}
                totalHarga={hotelSample.price * jumlahOrder}
                tanggalKunjungan={`Check-in: ${tanggalCheckIn} - Check-out: ${tanggalCheckOut}`}
                jumlahTiket={jumlahOrder}
                catatan={catatan}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderHotel;
