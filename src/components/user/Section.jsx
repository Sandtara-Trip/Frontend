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
  background,
  showAll,
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
            {data.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className="max-w-sm mx-auto rounded-lg overflow-hidden bg-white shadow-md"
              >
                <CardWisata item={item} />
              </motion.div>
            ))}
          </GridWrapper>
        );
      case "Hotel":
        return (
          <GridWrapper>
            {data.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className="max-w-sm mx-auto rounded-lg overflow-hidden bg-white shadow-md"
              >
                <CardHotel item={item} />
              </motion.div>
            ))}
          </GridWrapper>
        );
      case "Kuliner":
        return (
          <GridWrapper>
            {data.map((item) => (
              <motion.div
                 key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                className="max-w-sm mx-auto rounded-lg overflow-hidden bg-white shadow-md"
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
    <section id={id} className={`py-16 px-4 ${background}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
          <div>
            <motion.h2
              className="px-4 text-3xl text-black/80 font-bold whitespace-nowrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-sm text-gray-600 mt-2 max-w-xl px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              {descriptions[title]}
            </motion.p>
          </div>

          {data.length > 0 && (
            <button
              className="btn btn-outline btn-warning hover:bg-warm-orange hover:text-white whitespace-nowrap mr-4 ml-4"
              onClick={onToggleShowAll}
            >
              {showAll ? "Sembunyikan" : "Selengkapnya"}
            </button>
          )}
        </div>

        {/* Card Grid / Empty State */}
        {data.length > 0 ? (
          <>
            {renderCardGrid()}
            {showAll && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center text-gray-500">
            <p className="text-lg font-semibold">{emptyMessages[title]}</p>
            <img
              src={imagesByCategory[title]}
              alt={`No ${title} found`}
              className="w-60 h-40 object-cover rounded-lg "
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Section;
