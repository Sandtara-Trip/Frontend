import { useState, useRef } from "react";
import { FaEdit, FaTrashAlt, FaSave, FaTimes, FaCamera } from "react-icons/fa";

const ProfileTab = ({ name, email, photo }) => {
  // State utama
  const [profileName, setProfileName] = useState(name);
  const [profileEmail, setProfileEmail] = useState(email);
  const [profilePhoto, setProfilePhoto] = useState(photo);

  // State untuk edit
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhoto, setEditedPhoto] = useState(photo);
  const fileInputRef = useRef();

  const handleSave = () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      alert("Nama dan Email tidak boleh kosong.");
      return;
    }

    // Simpan ke state utama
    setProfileName(editedName);
    setProfileEmail(editedEmail);
    setProfilePhoto(editedPhoto);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(profileName);
    setEditedEmail(profileEmail);
    setEditedPhoto(profilePhoto);
    setIsEditing(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex flex-col items-center text-center transition-all">
        {/* Profile Image */}
        <div className="relative inline-block group">
          <img
            src={isEditing ? editedPhoto : profilePhoto}
            alt="Profile"
            className="w-40 h-40 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-orange-300 shadow-md transition-all duration-300 group-hover:scale-105"
          />
          {isEditing && (
            <>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-orange-100 transition"
              >
                <FaCamera className="text-orange-500" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoChange}
              />
            </>
          )}
        </div>

        {!isEditing ? (
          <>
            <h2 className="mt-6 text-3xl font-bold text-gray-800">{profileName}</h2>
            <p className="text-gray-500 text-lg">{profileEmail}</p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setEditedName(profileName);
                  setEditedEmail(profileEmail);
                  setEditedPhoto(profilePhoto);
                  setIsEditing(true);
                }}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-xl shadow-md transition"
              >
                <FaEdit /> Edit Profil
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white text-lg rounded-xl shadow-md transition">
                <FaTrashAlt /> Hapus Akun
              </button>
            </div>
          </>
        ) : (
          <form
            className="mt-8 text-left space-y-6 w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="relative">
              <input
                id="name"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
                className="peer w-full px-4 pt-6 pb-2 text-gray-800 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label
                htmlFor="name"
                className="absolute text-gray-500 text-sm left-4 top-2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-orange-600 transition-all"
              >
                Nama Lengkap
              </label>
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                required
                className="peer w-full px-4 pt-6 pb-2 text-gray-800 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 text-sm left-4 top-2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-orange-600 transition-all"
              >
                Email
              </label>

              {/* Lupa Password */}
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/forgot-password")}
                  className="text-sm text-warm-orange hover:underline focus:outline-none"
                >
                  Lupa kata sandi?
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
              >
                <FaTimes /> Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                <FaSave /> Simpan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
