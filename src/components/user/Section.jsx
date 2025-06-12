import React from "react";
import { motion } from "framer-motion";
import CardWisata from "./CardWisata";
import CardHotel from "./CardHotel";
import CardKuliner from "./CardKuliner";

const Section = ({
  id,
  title,
  data,
  background = "bg-white",
  showAll = false,
  onToggleShowAll,
}) => {
  const emptyMessages = {
    Wisata: "Maaf, saat ini belum ada data wisata yang tersedia.",
    Hotel: "Maaf, data hotel yang Anda cari belum tersedia.",
    Kuliner: "Maaf, belum ada informasi kuliner yang sesuai saat ini.",
  };

  const descriptions = {
    Wisata:
      "Rekomendasi tempat wisata terbaik di Denpasar sesuai cuaca dan minat Anda.",
    Hotel: "Temukan pilihan hotel nyaman dan terjangkau untuk perjalanan Anda.",
    Kuliner: "Nikmati beragam kuliner khas Denpasar yang menggugah selera.",
  };

  return (
    <motion.section
      id={id}
      className={`py-12 ${background}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }} // biar animasinya bisa berulang
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Judul dan Deskripsi */}
        <motion.h2
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false }}
        >
          {descriptions[title]}
        </motion.p>

        {/* Isi Konten */}
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="img/nodata.png"
              alt="Empty"
              className="w-32 h-auto mb-4 opacity-70"
            />
            <p className="text-center text-gray-500 italic">
              {emptyMessages[title]}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((item, index) => (
              <motion.div
                key={`${item.id || index}-${title}`}
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: false }} 
                >
                {title === "Wisata" ? (
                  <CardWisata item={item} />
                ) : title === "Hotel" ? (
                  <CardHotel item={item} />
                ) : (
                  <CardKuliner item={item} />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Tombol toggle */}
        {data.length > 0 && onToggleShowAll && (
          <div className="mt-8 flex justify-center items-center">
            <button
              onClick={onToggleShowAll}
              className="text-teal hover:text-hover-teal font-medium"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Section;
