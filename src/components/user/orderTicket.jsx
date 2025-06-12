import React from "react";
import { FaStar } from "react-icons/fa";

const OrderTicket = ({
  name,
  price,
  badge,
  rating,
  reviewCount,
  onOrder,
  orderLabel,
  showPrice = "Pesan Sekarang",
}) => {
  // Fungsi render bintang
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-2xl inline-block w-6 h-6 mr-1 ${
          i < Math.round(rating) ? "text-light-orange" : "text-gray-300"
        }`}
        aria-label={`${i + 1} star`}
      >
        <FaStar />
      </span>
    ));

  return (
    <div className="relative w-full lg:max-w-xs bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-5 space-y-5 mt-6 lg:mt-16 self-start">
      {badge && (
        <span className="absolute top-0 right-0 bg-teal text-white text-md font-bold px-3 py-1 rounded-tr-2xl rounded-bl-xl shadow-md">
          TERSEDIA
        </span>
      )}

      <div className="space-y-1">
        <p className="text-sm text-gray-500">Pesan Tiket</p>
        <p className="font-semibold text-xl">{name}</p>
      </div>

      {showPrice && (
        <div>
          <p className="text-gray-500 text-sm">Harga</p>
          <p className="text-2xl font-bold text-warm-orange">
            {typeof price === "number"
              ? `Rp ${price.toLocaleString("id-ID")}`
              : price}
          </p>
        </div>
      )}

      <button
        onClick={onOrder}
        className="bg-warm-orange text-white font-semibold w-full py-2 rounded-lg hover:bg-hover-orange shadow"
      >
        {orderLabel}
      </button>

      <div className="text-center space-y-1 pt-2 border-t">
        <div className="text-2xl font-bold">{Number(rating).toFixed(1)}</div>
        <div className="flex justify-center">{renderStars(rating)}</div>
        <p className="italic text-sm text-gray-500">{reviewCount} Ulasan</p>
      </div>
    </div>
  );
};

export default OrderTicket;
