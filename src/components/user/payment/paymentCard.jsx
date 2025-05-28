import { FaPlus, FaMinus } from "react-icons/fa6";

const PaymentCard = ({
  item,          
  quantity,        
  onIncrement,
  onDecrement,
  extraInfo,     
  labelQuantity,    
}) => {
  if (!item) return null;

  const totalHarga = item.price * quantity;

  return (
    <div className="card bg-base-100 shadow-md mt-4">
      <div className="card-body flex flex-col sm:flex-row items-center gap-4">
        {/* Gambar atau fallback */}
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded mx-auto sm:mx-0"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded mx-auto sm:mx-0">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Info utama */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-lg font-semibold">{item.name}</h2>

          {extraInfo && (
            <div className="my-1 text-sm text-gray-600">{extraInfo}</div>
          )}

          {/* Opsional: Tipe kamar jika ada */}
          {item.roomType && (
            <p className="text-sm text-gray-600">Tipe Kamar : {item.roomType}</p>
          )}

          <p className="text-sm text-gray-600">
            {labelQuantity || "Jumlah"} : {quantity}
          </p>
          <p className="font-medium">
            Harga: Rp {totalHarga.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Tombol jumlah */}
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <button
            type="button"
            className="btn btn-sm border-warm-orange text-warm-orange hover:bg-hover-orange hover:text-white transition"
            onClick={onDecrement}
            aria-label={`Kurangi ${labelQuantity || "jumlah"}`}
          >
            <FaMinus />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            type="button"
            className="btn btn-sm border-warm-orange text-warm-orange hover:bg-hover-orange hover:text-white transition"
            onClick={onIncrement}
            aria-label={`Tambah ${labelQuantity || "jumlah"}`}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
