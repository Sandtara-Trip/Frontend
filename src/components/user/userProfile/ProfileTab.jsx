import { useState, useRef } from "react";
import { FaEdit, FaTrashAlt, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import { API_BASE_URL, axiosInstance } from "../../../config/api";
import { Link } from "react-router-dom";
import { showSuccess, showError } from '../../../utils/sweetalert';

const ProfileTab = ({ name, email, photo, onUserUpdate }) => {
  // State utama
  const [profileName, setProfileName] = useState(name);
  const [profileEmail, setProfileEmail] = useState(email);
  const [profilePhoto, setProfilePhoto] = useState(photo);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferences, setPreferences] = useState({
    favoriteDestinations: [],
    travelStyle: ""
  });

  // State untuk edit
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedPhoto, setEditedPhoto] = useState(photo);
  const [editedPreferences, setEditedPreferences] = useState({
    favoriteDestinations: [],
    travelStyle: ""
  });
  const fileInputRef = useRef();

  const handleSave = async () => {
    if (!editedName.trim()) {
      alert("Nama tidak boleh kosong.");
      return;
    }

    try {
      console.log('Starting profile update...');
      
      // Prepare data for API
      const updateData = {
        name: editedName.trim(),
        phoneNumber: editedPhoneNumber.trim() || undefined,
        preferences: editedPreferences
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );

      console.log('Sending update data:', updateData);

      // Send update request
      const response = await axiosInstance.put('/users/profile', updateData);

      console.log('Response received:', response.data);

      if (response.data.success) {
        // Update local state with response data
        const userData = response.data.data;
        setProfileName(userData.name);
        setPhoneNumber(userData.phoneNumber || "");
        setPreferences(userData.preferences || {
          favoriteDestinations: [],
          travelStyle: ""
        });
        setProfilePhoto(userData.photo || "");

        // Update localStorage
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("userEmail", userData.email);
        if (userData.photo) {
          localStorage.setItem("userPhoto", userData.photo);
        }

        // Trigger event untuk memberitahu komponen lain bahwa data telah berubah
        window.dispatchEvent(new Event("storage"));
        
        setIsEditing(false);

        // Update user data in parent component if needed
        if (onUserUpdate) {
          onUserUpdate(userData);
        }
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        // Log detailed error information
        console.error('Error response:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });
        showError(error.response.data.message || 'Failed to update profile');
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        showError('No response received from server');
      } else {
        // Error in request setup
        console.error('Request setup error:', error.message);
        showError('Error updating profile: ' + error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditedName(profileName);
    setEditedPhoneNumber(phoneNumber);
    setEditedPhoto(profilePhoto);
    setEditedPreferences(preferences);
    setIsEditing(false);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploadLoading(true);
        console.log('Selected file:', file);

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          alert('Format file tidak didukung. Gunakan jpg, jpeg, atau png');
          return;
        }

        // Create FormData
        const formData = new FormData();
        formData.append('file', file); // Changed from 'photo' to 'file' to match API spec
        
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        // Upload photo using axiosInstance
        console.log('Sending request to:', '/users/upload-photo');
        const response = await axiosInstance.post(
          '/users/upload-photo',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        console.log('Upload response:', response.data);

        if (response.data.success) {
          // Update photo preview with the Cloudinary URL
          const userData = response.data.data;
          console.log('New photo URL:', userData.photo);
          
          // Update local state
          setEditedPhoto(userData.photo);
          setProfilePhoto(userData.photo);
          
          // Update localStorage with complete user data
          localStorage.setItem("userPhoto", userData.photo);
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userEmail", userData.email);
          
          // Update other components
          window.dispatchEvent(new Event("storage"));
          
          // Update user data in parent component if needed
          if (onUserUpdate) {
            onUserUpdate(userData);
          }
        } else {
          throw new Error(response.data.error || 'Failed to upload photo');
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
        if (error.response) {
          // Log detailed error information
          console.error('Error response:', {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers
          });
          alert(error.response.data.error || 'Failed to upload photo');
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received:', error.request);
          alert('No response received from server');
        } else {
          // Error in request setup
          console.error('Request setup error:', error.message);
          alert('Error uploading photo: ' + error.message);
        }
      } finally {
        setUploadLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex flex-col items-center text-center transition-all">
        {/* Profile Image */}
        <div className="relative inline-block group">
          <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border-4 border-orange-300 shadow-md overflow-hidden">
            {(isEditing ? editedPhoto : profilePhoto) ? (
              <img
                src={isEditing ? editedPhoto : profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-light-orange">
                <span className="text-white font-bold text-4xl">
                  {(isEditing ? editedName : profileName)?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>
          {isEditing && (
            <>
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={uploadLoading}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-orange-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadLoading ? (
                  <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaCamera className="text-orange-500 w-5 h-5" />
                )}
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoChange}
                disabled={uploadLoading}
              />
            </>
          )}
        </div>

        {!isEditing ? (
          <>
            <h2 className="mt-6 text-3xl font-bold text-gray-800">{profileName}</h2>
            <p className="text-gray-500 text-lg">{profileEmail}</p>
            {phoneNumber && <p className="text-gray-500 text-lg">{phoneNumber}</p>}

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setEditedName(profileName);
                  setEditedPhoneNumber(phoneNumber);
                  setEditedPhoto(profilePhoto);
                  setEditedPreferences(preferences);
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
                maxLength={50}
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
                id="phoneNumber"
                type="tel"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                placeholder="081234567890"
                className="peer w-full px-4 pt-6 pb-2 text-gray-800 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label
                htmlFor="phoneNumber"
                className="absolute text-gray-500 text-sm left-4 top-2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-orange-600 transition-all"
              >
                Nomor Telepon (Opsional)
              </label>
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                value={profileEmail}
                disabled
                className="peer w-full px-4 pt-6 pb-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg"
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 text-sm left-4 top-2"
              >
                Email
              </label>
              <Link
                to="/forgot-password"
                className="text-orange-500 text-sm mt-2 block text-right hover:underline"
              >
                Lupa Password?
              </Link>
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
