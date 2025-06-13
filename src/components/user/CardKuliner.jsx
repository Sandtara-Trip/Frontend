import { Link } from "react-router-dom";

const CardKuliner = ({ item }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto">
      <div className="relative group">
        <div className="rounded-t-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
          <img
            src={item.image}
            alt={item.title}
            className="h-56 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          {item.category && (
            <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
              <p className="text-sm font-semibold">{item.category}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>

        <p className="text-sm text-gray-500 line-clamp-2 mt-2">
          {item.description}
        </p>

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
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardKuliner;