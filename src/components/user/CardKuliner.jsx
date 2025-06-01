import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const CardKuliner = ({ item }) => {
  const validRating = Math.max(0, Math.min(5, Number(item.rating) || 0));

  return (
    <div className="card bg-white  shadow-md rounded-lg overflow-hidden max-w-sm mx-auto">
      <div className="relative group">
        <div className=" rounded-t-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
          {/* Gambar dengan efek zoom */}
          <img
            src={item.image}
            alt={item.title}
            className="h-56 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />

          {/* Overlay gelap transparan saat hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          {/* Teks di atas overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
            <p className="text-sm font-semibold">Kuliner Khas Denpasar</p>
          </div>
        </div>

        {/* Rating*/}
        {item.rating && (
          <div className="absolute top-2 right-2 bg-white text-sm font-semibold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
            <span className="text-warm-orange">
              <FaStar />
            </span>
            <span>{validRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {item.description}
        </p>

        {/* Tombol di kiri bawah */}
        <div className="mt-auto flex justify-start pt-4">
          <Link
            to={`/detail-kuliner/${item.id}`}
            className="text-teal text-sm font-medium flex items-center gap-1 group"
          >
            Lihat Detail
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardKuliner;
