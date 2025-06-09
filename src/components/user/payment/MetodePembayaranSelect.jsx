import { FaCreditCard } from "react-icons/fa";

const MetodePembayaranSelect = ({ value, onChange, error }) => (
  <div className="form-control w-full mt-4">
    <label htmlFor="metodeBayar" className="label">
      <span className="label-text font-semibold text-gray-700 mb-2">
        Metode Pembayaran <span className="text-red-800">*</span>
      </span>
    </label>
    <div className="relative">
      <select
        id="metodeBayar"
        className={`w-full h-12 pr-10 rounded-md border appearance-none ${error ? "border-red-500" : "border-gray-300"} px-3 text-base text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
        value={value}
        onChange={onChange}
      >
        <option value="">Pilih Metode Pembayaran</option>
        <option value="transfer">Transfer Bank</option>
      </select>
      <FaCreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default MetodePembayaranSelect;
