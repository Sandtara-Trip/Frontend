import React, { useState, useEffect } from "react";
import NavbarBefore from "../../../components/user/NavbarBefore";
import NavbarAfter from "../../../components/user/navbarAfter";
import Footer from "../../../components/user/footer";
import { MdOutlineManageAccounts, MdPayment } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { GiSuitcase } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const FaqSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const faqData = [
    {
      icon: <MdOutlineManageAccounts className="text-4xl" />,
      group: "Akun dan Keamanan",
      items: [
        {
          question:
            "Apakah saya harus membuat akun untuk menggunakan website ini?",
          answer:
            "Tidak wajib. Namun, dengan membuat akun, Anda dapat mengakses seluruh destinasi wisata, hotel, kuliner, dan acara terkini di Denpasar. Selain itu, Anda juga dapat menggunakan berbagai fitur seperti pemesanan tiket dan melihat rekomendasi. Fitur lainnya termasuk informasi cuaca terkini yang membantu Anda merencanakan perjalanan dengan lebih baik, serta akses ke kondisi cuaca harian dan per-jam.",
        },
        {
          question: "Bagaimana cara membuat akun?",
          answer:
            "Klik tombol 'Register' di pojok kanan atas, lalu isi formulir pendaftaran dengan data diri Anda.",
        },
        {
          question: "Bagaimana jika saya lupa kata sandi?",
          answer:
            "Gunakan fitur 'Lupa Kata Sandi' pada halaman login dan ikuti langkah-langkah pemulihan melalui email.",
        },
        {
          question: "Apakah data pribadi saya aman?",
          answer:
            "Ya, kami melindungi data Anda dan tidak membagikannya kepada pihak ketiga tanpa izin.",
        },
        {
          question: "Bagaimana saya bisa menghapus akun saya?",
          answer:
            "Pengguna bisa menghapus akunnya sendiri di halaman 'Profile' lalu 'Hapus Akun'.",
        },
      ],
    },
    {
      icon: <IoGlobeOutline className="text-4xl" />,
      group: "Tentang Website",
      items: [
        {
          question: "Apa itu Sandtara Trip?",
          answer:
            "Sandtara Trip adalah platform digital yang menyediakan informasi, pemesanan, dan layanan wisata secara online.",
        },
        {
          question: "Apakah website ini resmi dan terpercaya?",
          answer:
            "Ya, kami bekerja sama dengan mitra resmi dan menyediakan sistem pembayaran yang aman dan terverifikasi.",
        },
        {
          question:
            "Apakah saya bisa mengakses website ini dari perangkat mobile?",
          answer:
            "Tentu, website kami dirancang responsif dan bisa diakses melalui komputer, tablet, maupun smartphone.",
        },
        {
          question: "Apakah ada aplikasi mobile dari Sandtara Trip?",
          answer: "Saat ini kami hanya tersedia dalam versi website.",
        },
      ],
    },
    {
      icon: <MdPayment className="text-4xl" />,
      group: "Pemesanan dan Pembayaran",
      items: [
        {
          question: "Bagaimana cara memesan tiket wisata, hotel, dan acara?",
          answer:
            "Pilih destinasi wisata, hotel, maupun acara lalu isi data pemesan, lalu lakukan pembayaran sesuai instruksi.",
        },
        {
          question: "Metode pembayaran apa saja yang tersedia?",
          answer:
            "Kami menerima pembayaran melalui transfer bank, kartu kredit/debit, e-wallet, dan virtual account.",
        },
        {
          question:
            "Apakah harga yang ditampilkan sudah termasuk pajak dan biaya lainnya?",
          answer:
            "Ya, harga yang tertera sudah termasuk semua biaya dan merupakan harga tetap.",
        },
        {
          question: "Bagaimana cara membatalkan atau mengubah pemesanan?",
          answer:
            "Jika pesanan tidak dibayar dalam waktu 24 Jam, maka pesanan akan batal otomatis dan tidak akan menganggu orderan yang lain.",
        },
        {
          question: "Apakah saya akan mendapatkan bukti pembayaran atau tiket?",
          answer:
            "Ya, setelah pembayaran berhasil, e-ticket dan bukti transaksi akan dikirim ke email Anda.",
        },
      ],
    },
    {
      icon: <GiSuitcase className="text-4xl" />,
      group: " Layanan dan Fasilitas",
      items: [
        {
          question: "Apakah tersedia transportasi selama wisata?",
          answer:
            "Kami memiliki fitur rekomendasi yang membantu Anda menemukan penyewaan transportasi terdekat dari hotel atau destinasi wisata yang Anda kunjungi.",
        },
        {
          question:
            "Apakah ada fasilitas tambahan seperti tempat parkir, toilet umum, dan mushola?",
          answer:
            "Kebanyakan destinasi menyediakan fasilitas dasar tersebut. Detail bisa dilihat di halaman wisata masing-masing.",
        },
      ],
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl" />,
      group: " Perjalanan dan Lokasi",
      items: [
        {
          question: "Bagaimana cara menuju ke lokasi wisata?",
          answer:
            "Petunjuk lokasi dan alamat lengkap akan tersedia di halaman detail destinasi.",
        },
        {
          question: "Apakah lokasi wisata buka setiap hari?",
          answer:
            "Jam operasional tergantung masing-masing tempat. Informasi akan dicantumkan di deskripsi wisata.",
        },
        {
          question: "Apa yang harus saya bawa saat berkunjung?",
          answer:
            "Bawa kartu identitas, e-ticket, dan perlengkapan pribadi yang dibutuhkan sesuai jenis wisata.",
        },
      ],
    },
  ];

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      <div className="max-w-4xl mx-auto px-4 py-16 pt-24">
        <div className="text-center px-4 sm:px-6 max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Kami telah merangkum beberapa pertanyaan untuk membantu Anda
            memahami layanan Sandtara Trip.
          </p>
        </div>

        {faqData.map((section, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={index}
            className="mb-10"
          >
            <h3 className="text-2xl font-semibold text-teal mb-4 flex items-center gap-2">
              {section.icon && <span className="text-xl">{section.icon}</span>}
              {section.group}
            </h3>
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  custom={idx}
                  className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg"
                >
                  <input type="radio" name={`faq-group-${index}`} />
                  <div className="collapse-title font-semibold text-md cursor-pointer">
                    {item.question}
                  </div>
                  <div className="collapse-content text-sm">{item.answer}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FaqSection;
