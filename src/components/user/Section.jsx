import React from "react";
import { motion } from "framer-motion";
import Pagination from "./Pagination";

// Import masing-masing card
import CardWisata from "./CardWisata";
import CardHotel from "./CardHotel";
import CardKuliner from "./CardKuliner";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Section = ({
  id,
  title,
  data,
  background = "bg-white",
  showAll = false,
  onToggleShowAll,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const imagesByCategory = {
    Wisata: "",
    Hotel: "",
    Kuliner: "",
  };

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

  // Render card grid sesuai kategori dengan motion div (tanpa shadow tambahan)
  const renderCardGrid = () => {
    const GridWrapper = ({ children }) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {children}
      </div>
    );

    switch (title) {
      case "Wisata":
        return (
          <GridWrapper>
            {data.map((item, index) => (
              <motion.div
                key={`${item.id || index}-${title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CardWisata item={item} />
              </motion.div>
            ))}
          </GridWrapper>
        );
      case "Hotel":
        return (
          <GridWrapper>
            {data.map((item, index) => (
              <motion.div
                key={`${item.id || index}-${title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CardHotel item={item} />
              </motion.div>
            ))}
          </GridWrapper>
        );
      case "Kuliner":
        return (
          <GridWrapper>
            {data.map((item, index) => (
              <motion.div
                key={`${item.id || index}-${title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CardKuliner item={item} />
              </motion.div>
            ))}
          </GridWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      id={id}
      className={`py-12 ${background}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <motion.div
              key={`${item.id || index}-${title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
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

        {data.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            {totalPages > 1 && (
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={`${title}-page-${page}`}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-teal text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

            {onToggleShowAll && (
              <button
                onClick={onToggleShowAll}
                className="text-teal hover:text-hover-teal font-medium"
              >
                {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Section;
