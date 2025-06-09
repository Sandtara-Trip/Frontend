import React, { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const ImageUpload = ({ label, onChange, required = false }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setError('');

    // Validasi jumlah file
    if (files.length > 5) {
      setError('Maksimal 5 gambar yang dapat diupload');
      return;
    }

    // Validasi tipe dan ukuran file
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        setError(`File ${file.name} bukan gambar yang valid`);
      }
      if (!isValidSize) {
        setError(`File ${file.name} melebihi batas ukuran 5MB`);
      }
      
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      // Buat preview URLs
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      
      // Cleanup old preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      
      setPreviewUrls(newPreviewUrls);
      onChange(e); // Pass event to parent
    }
  };

  const removeImage = (index) => {
    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);

    // Create new FileList without removed image
    const dt = new DataTransfer();
    const input = document.querySelector('input[type="file"]');
    const { files } = input;
    
    for (let i = 0; i < files.length; i++) {
      if (i !== index) {
        dt.items.add(files[i]);
    }
    }
    
    input.files = dt.files;
    onChange({ target: input }); // Trigger onChange with updated files
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload gambar</span>
              <input
                id="file-upload"
                name="gambar"
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                required={required}
              />
            </label>
            <p className="pl-1">atau drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, JPEG up to 5MB
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg"
          />
        <button
          type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
        >
                <FiX className="h-4 w-4" />
        </button>
      </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
