const CatatanTextarea = ({ value, onChange }) => (
  <div className="form-control w-full mt-4">
    <label htmlFor="catatan" className="label">
      <span className="label-text font-semibold text-gray-700 mb-2">
        Catatan (Opsional)
      </span>
    </label>
    <textarea
      id="catatan"
      placeholder="Tulis catatan jika ada"
      className="textarea w-full h-32 resize-y rounded-md border border-gray-300 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition shadow-sm hover:shadow-md"
      value={value}
      onChange={onChange}
    />
    <p className="text-xs mt-1 text-gray-400">
      Kamu bisa menambahkan catatan khusus, misalnya permintaan khusus atau info tambahan.
    </p>
  </div>
);

export default CatatanTextarea;
