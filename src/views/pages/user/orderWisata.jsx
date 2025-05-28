import { useState } from "react";
import PaymentCard from "../../../components/user/payment/paymentCard";
import InputTanggal from "../../../components/user/payment/InputTanggal";
import MetodePembayaranSelect from "../../../components/user/payment/MetodePembayaranSelect";
import CatatanTextarea from "../../../components/user/payment/CatatanTextarea";
import PembayaranDetail from "../../../components/user/payment/PembayaranDetail";
import Footer from "../../../components/user/footer";
import NavbarAfter from "../../../components/user/navbarAfter";

const wisataSample = {
  name: "Pantai Indah",
  price: 150000,
  image:
    "https://tse1.mm.bing.net/th?id=OIP.kmeXyvLksySyUcSq9MjJ-QHaEK&pid=Api&P=0&h=220",
  description: "Pantai indah dengan pasir putih dan air laut yang jernih.",
};

const OrderWisata = () => {
  const [jumlahOrder, setJumlahOrder] = useState(1);
  const [tanggal, setTanggal] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("");
  const [catatan, setCatatan] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleIncrement = () => setJumlahOrder(jumlahOrder + 1);
  const handleDecrement = () => {
    if (jumlahOrder > 1) setJumlahOrder(jumlahOrder - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!tanggal) newErrors.tanggal = "Tanggal wajib diisi";
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
      {/* Navbar */}
      <NavbarAfter />

      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Kolom Kiri */}
          <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-4 pt-16">
            <h1 className="text-2xl font-bold mb-4">Pemesanan Tiket Wisata</h1>

            <PaymentCard
              item={wisataSample}
              quantity={jumlahOrder}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              labelQuantity="Jumlah Tiket"
            />

            <InputTanggal
              label="Tanggal Kunjungan"
              value={tanggal}
              onChange={(e) => {
                setTanggal(e.target.value);
                if (errors.tanggal) setErrors((prev) => ({ ...prev, tanggal: "" }));
              }}
              error={errors.tanggal}
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

          {/* Kolom Kanan */}
          {formSubmitted && (
            <div className="w-full lg:w-1/3">
              <PembayaranDetail
                metodeBayar={metodeBayar}
                totalHarga={wisataSample.price * jumlahOrder}
                jumlahTiket={jumlahOrder}
                tanggalKunjungan={tanggal}
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

export default OrderWisata;
