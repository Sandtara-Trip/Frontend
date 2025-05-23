import React from "react";
import { TbBeach } from "react-icons/tb";
import Pagination from "./Pagination";
import { CardGrid } from "./card";

const Section = ({
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
    Wisata:
      "",
    Hotel:
      "",
    Kuliner:
      "",
  };

 const emptyMessages = {
  Wisata: "Maaf, saat ini belum ada data wisata yang tersedia.",
  Hotel: "Maaf, data hotel yang Anda cari belum tersedia.",
  Kuliner: "Maaf, belum ada informasi kuliner yang sesuai saat ini.",
};

  return (
    <section className={`py-16 px-4 ${background}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <h2 className="flex text-2xl text-teal font-bold items-center whitespace-nowrap">
            <TbBeach className="mr-2" /> {title}
          </h2>

          {data.length > 0 && (
            <button
              className="btn btn-outline btn-warning hover:bg-warm-orange hover:text-white whitespace-nowrap"
              onClick={onToggleShowAll}
            >
              {showAll ? "Sembunyikan" : "Lihat Semua"}
            </button>
          )}
        </div>

        {data.length > 0 ? (
          <>
            <CardGrid cards={data} layout="vertical" />

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
              className="w-60 h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Section;
