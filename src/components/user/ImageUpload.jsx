import React, { useRef, useState } from "react";

const ImageUpload = ({ label = "Unggah Gambar", name, onChange, value }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange && onChange(e);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Preview lokal base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">{label}</label>

      <div className="flex items-center gap-4">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-md border"
          />
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-orange-300 text-white rounded-full hover:bg-orange-400"
        >
          Pilih Gambar
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
