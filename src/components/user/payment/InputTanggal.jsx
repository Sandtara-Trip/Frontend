const InputTanggal = ({ label = "Tanggal Kunjungan", value, onChange, error }) => (
  <div className="form-control w-full mt-4">
    <label htmlFor="tanggal" className="label">
      <span className="label-text font-semibold text-gray-700 mb-2">
        {label} <span className="text-red-800">*</span>
      </span>
    </label>
    <input
      id="tanggal"
      type="date"
      className={`input w-full rounded-md border ${error ? "border-red-500" : "border-gray-300"} p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition`}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default InputTanggal;
