import React, { useState } from "react";

const PhotoProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <label htmlFor="profile-picture" className="cursor-pointer">
          <div className="w-32 h-32 rounded-full border-3 border-warm-orange overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">Upload Foto</span>
              </div>
            )}
          </div>
        </label>
        <input
          type="file"
          id="profile-picture"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">Pilih gambar untuk foto profil</p>
    </div>
  );
};

export default PhotoProfile;
